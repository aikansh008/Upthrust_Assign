const AIService = require('./aiService');
const APIService = require('./apiService');
const CacheService = require('./cacheService');
const { WorkflowRun, WorkflowChain } = require('../models/index');

class ChainedWorkflowService {
  constructor() {
    this.aiService = new AIService();
    this.apiService = new APIService();
    this.cacheService = new CacheService();
    console.log('🔗 ChainedWorkflowService initialized with caching');
  }

  async executeChain(chainId, initialPrompt, userId = null) {
    try {
      // Get the workflow chain
      const chain = await WorkflowChain.findByPk(chainId);
      if (!chain) {
        throw new Error('Workflow chain not found');
      }

      // Check if user owns the chain (if user is authenticated)
      if (userId && chain.userId && chain.userId !== userId) {
        throw new Error('Unauthorized access to workflow chain');
      }

      console.log(`🔗 Executing chained workflow: ${chain.name}`);
      console.log(`📋 Actions: ${chain.actions.length} steps`);

      const results = [];
      let currentPrompt = initialPrompt;
      let combinedContext = `Initial prompt: ${initialPrompt}\n\n`;

      // Execute each action in sequence
      for (let i = 0; i < chain.actions.length; i++) {
        const action = chain.actions[i];
        const stepStartTime = Date.now();
        console.log(`⚡ Step ${i + 1}: ${action.type}`);

        try {
          // Generate prompt with accumulated context
          const promptWithContext = action.prompt 
            ? `${action.prompt} Context: ${combinedContext}` 
            : currentPrompt;

          // Check cache first for API response
          let apiResponse = await this.cacheService.getCachedAPIResponse(action.type, promptWithContext);
          let fromCache = false;
          
          if (!apiResponse) {
            // Call the appropriate API first to get actual data
            apiResponse = await this.apiService.callAPI(action.type, promptWithContext);
            // Cache the API response
            await this.cacheService.cacheAPIResponse(action.type, promptWithContext, apiResponse);
            console.log(`📡 API call made for ${action.type}`);
          } else {
            fromCache = true;
            console.log(`📦 Using cached API response for ${action.type}`);
          }
          
          // Generate context-aware AI response based on API data
          const contextAwarePrompt = this.createContextAwarePrompt(promptWithContext, apiResponse, action.type);
          const aiResponse = await this.aiService.generateResponse(contextAwarePrompt);
          
          // Combine responses for this step
          const stepResult = this.combineResponses(aiResponse, apiResponse, action.type);
          
          // Save individual step to database
          const workflowRun = await WorkflowRun.create({
            prompt: promptWithContext,
            action: action.type,
            ai_response: aiResponse,
            api_response: apiResponse,
            final_result: stepResult,
            userId
          });

          // Store result and update context with detailed information
          results.push({
            step: i + 1,
            action: action.type,
            prompt: promptWithContext,
            ai_response: aiResponse,
            api_response: apiResponse,
            final_result: stepResult,
            id: workflowRun.id,
            cached: fromCache,
            timestamp: new Date(),
            execution_time_ms: Date.now() - stepStartTime
          });

          // Update context for next step
          combinedContext += `Step ${i + 1} (${action.type}): ${stepResult}\n`;
          currentPrompt = stepResult; // Use previous result as context for next step

          console.log(`✅ Step ${i + 1} completed: ${stepResult.substring(0, 100)}...`);

        } catch (stepError) {
          console.error(`❌ Step ${i + 1} failed:`, stepError.message);
          
          // Decide whether to continue or stop the chain
          if (action.continueOnError !== false) {
            results.push({
              step: i + 1,
              action: action.type,
              error: stepError.message,
              status: 'failed'
            });
            continue;
          } else {
            throw new Error(`Chain execution stopped at step ${i + 1}: ${stepError.message}`);
          }
        }
      }

      // Update chain execution statistics
      await WorkflowChain.update(
        { 
          executionCount: chain.executionCount + 1,
          lastExecuted: new Date()
        },
        { where: { id: chainId } }
      );

      // Generate final summary
      const summary = this.generateChainSummary(results, chain.name);

      console.log(`🎉 Chained workflow completed: ${results.length} steps executed`);

      return {
        chainId,
        chainName: chain.name,
        totalSteps: chain.actions.length,
        completedSteps: results.filter(r => !r.error).length,
        results,
        summary,
        executedAt: new Date()
      };

    } catch (error) {
      console.error('❌ Chained workflow execution failed:', error);
      throw error;
    }
  }

  async createChain(name, description, actions, userId = null) {
    try {
      // Validate actions
      if (!Array.isArray(actions) || actions.length === 0) {
        throw new Error('Actions must be a non-empty array');
      }

      for (const action of actions) {
        if (!action.type || !['weather', 'github', 'news'].includes(action.type)) {
          throw new Error(`Invalid action type: ${action.type}`);
        }
      }

      const chain = await WorkflowChain.create({
        name,
        description,
        actions,
        userId
      });

      console.log(`✅ Created workflow chain: ${name} with ${actions.length} actions`);
      return chain;

    } catch (error) {
      console.error('❌ Failed to create workflow chain:', error);
      throw error;
    }
  }

  async getUserChains(userId) {
    try {
      const chains = await WorkflowChain.findAll({
        where: { userId },
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'name', 'description', 'actions', 'executionCount', 'lastExecuted', 'createdAt']
      });

      return chains;
    } catch (error) {
      console.error('❌ Failed to fetch user chains:', error);
      throw error;
    }
  }

  async getPublicChains() {
    try {
      // Return predefined public chains for non-authenticated users
      return [
        {
          id: 'public-1',
          name: 'Weather & News Update',
          description: 'Get current weather and latest news in one go',
          actions: [
            { type: 'weather', prompt: 'Get current weather' },
            { type: 'news', prompt: 'Get latest technology news' }
          ],
          executionCount: 0,
          isPublic: true
        },
        {
          id: 'public-2', 
          name: 'Dev Daily Brief',
          description: 'Weather, trending repos, and tech news for developers',
          actions: [
            { type: 'weather', prompt: 'Get weather for my location' },
            { type: 'github', prompt: 'Show trending JavaScript repositories' },
            { type: 'news', prompt: 'Latest programming and technology news' }
          ],
          executionCount: 0,
          isPublic: true
        }
      ];
    } catch (error) {
      console.error('❌ Failed to fetch public chains:', error);
      return [];
    }
  }

  combineResponses(aiResponse, apiResponse, action) {
    const hashtag = `#${action}`;
    return `${aiResponse} ${apiResponse} ${hashtag}`;
  }

  createContextAwarePrompt(originalPrompt, apiResponse, action) {
    switch (action) {
      case 'news':
        return `User asked: "${originalPrompt}". Based on this news data: "${apiResponse}", create a relevant social media post or informative response that directly addresses what the user requested. Be engaging and informative.`;
      case 'weather':
        return `User asked: "${originalPrompt}". Based on this weather data: "${apiResponse}", create a helpful response that directly addresses the user's request. Include practical advice or relevant commentary.`;
      case 'github':
        return `User asked: "${originalPrompt}". Based on this GitHub data: "${apiResponse}", create an informative response that directly addresses what the user requested about repositories or development topics.`;
      default:
        return `User asked: "${originalPrompt}". Based on this information: "${apiResponse}", create a relevant and helpful response that directly addresses the user's request.`;
    }
  }

  generateChainSummary(results, chainName) {
    const successful = results.filter(r => !r.error).length;
    const total = results.length;
    
    let summary = `🔗 Workflow Chain "${chainName}" Execution Summary:\n`;
    summary += `✅ Completed: ${successful}/${total} steps\n\n`;
    
    results.forEach((result, index) => {
      if (result.error) {
        summary += `❌ Step ${result.step}: ${result.action} - Failed (${result.error})\n`;
      } else {
        summary += `✅ Step ${result.step}: ${result.action} - Success\n`;
      }
    });

    return summary;
  }
}

module.exports = ChainedWorkflowService;