const express = require('express');
const { body } = require('express-validator');
const { validateRequest } = require('../middleware/validation');
const { optionalAuth, authenticateToken } = require('../middleware/auth');
const ChainedWorkflowService = require('../services/chainedWorkflowService');

const router = express.Router();
const chainedWorkflowService = new ChainedWorkflowService();

// GET /api/chains - Get user's chains or public chains
router.get('/chains', optionalAuth, async (req, res) => {
  try {
    let chains;
    
    if (req.user) {
      // Get user's personal chains
      chains = await chainedWorkflowService.getUserChains(req.user.id);
    } else {
      // Get public chains for non-authenticated users
      chains = await chainedWorkflowService.getPublicChains();
    }

    res.json({
      chains,
      total: chains.length,
      userAuthenticated: !!req.user
    });

  } catch (error) {
    console.error('Failed to fetch chains:', error);
    res.status(500).json({
      error: 'Failed to fetch workflow chains',
      message: error.message
    });
  }
});

// POST /api/chains - Create a new workflow chain (requires authentication)
router.post('/chains', [
  authenticateToken,
  body('name')
    .isString()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be a string between 1-100 characters'),
  body('description')
    .optional()
    .isString()
    .isLength({ max: 500 })
    .withMessage('Description must be a string max 500 characters'),
  body('actions')
    .isArray({ min: 1, max: 10 })
    .withMessage('Actions must be an array with 1-10 items'),
  body('actions.*.type')
    .isIn(['weather', 'github', 'news'])
    .withMessage('Action type must be one of: weather, github, news'),
  validateRequest
], async (req, res) => {
  try {
    const { name, description, actions } = req.body;
    const userId = req.user.id;

    const chain = await chainedWorkflowService.createChain(name, description, actions, userId);

    res.status(201).json({
      message: 'Workflow chain created successfully',
      chain: {
        id: chain.id,
        name: chain.name,
        description: chain.description,
        actions: chain.actions,
        executionCount: chain.executionCount,
        createdAt: chain.createdAt
      }
    });

  } catch (error) {
    console.error('Failed to create chain:', error);
    res.status(500).json({
      error: 'Failed to create workflow chain',
      message: error.message
    });
  }
});

// POST /api/chains/:id/execute - Execute a workflow chain
router.post('/chains/:id/execute', [
  optionalAuth,
  body('prompt')
    .isString()
    .isLength({ min: 1, max: 500 })
    .withMessage('Prompt must be a string between 1-500 characters'),
  validateRequest
], async (req, res) => {
  try {
    const { id } = req.params;
    const { prompt } = req.body;
    const userId = req.user ? req.user.id : null;

    // Handle public chains
    if (typeof id === 'string' && id.startsWith('public-')) {
      const publicChains = await chainedWorkflowService.getPublicChains();
      const publicChain = publicChains.find(chain => chain.id === id);
      
      if (!publicChain) {
        return res.status(404).json({ error: 'Public workflow chain not found' });
      }

      // Execute public chain by simulating it
      const results = [];
      let combinedContext = `Initial prompt: ${prompt}\n\n`;

      for (let i = 0; i < publicChain.actions.length; i++) {
        const action = publicChain.actions[i];
        const stepStartTime = Date.now();
        
        // Check cache first for API response
        let apiResponse = await chainedWorkflowService.cacheService.getCachedAPIResponse(action.type, prompt);
        let fromCache = false;
        
        if (!apiResponse) {
          apiResponse = await chainedWorkflowService.apiService.callAPI(action.type, prompt);
          await chainedWorkflowService.cacheService.cacheAPIResponse(action.type, prompt, apiResponse);
        } else {
          fromCache = true;
          console.log(`📦 Using cached API response for ${action.type} in public chain`);
        }
        
        const aiResponse = await chainedWorkflowService.aiService.generateResponse(
          action.prompt ? `${action.prompt} Context: ${combinedContext}` : prompt
        );
        
        const stepResult = chainedWorkflowService.combineResponses(aiResponse, apiResponse, action.type);
        
        results.push({
          step: i + 1,
          action: action.type,
          prompt: action.prompt || prompt,
          ai_response: aiResponse,
          api_response: apiResponse,
          final_result: stepResult,
          cached: fromCache,
          timestamp: new Date(),
          execution_time_ms: Date.now() - stepStartTime
        });

        combinedContext += `Step ${i + 1} (${action.type}): ${stepResult}\n`;
      }

      return res.json({
        chainId: id,
        chainName: publicChain.name,
        totalSteps: publicChain.actions.length,
        completedSteps: results.length,
        results,
        summary: chainedWorkflowService.generateChainSummary(results, publicChain.name),
        executedAt: new Date(),
        isPublic: true
      });
    }

    // Execute regular chain
    const result = await chainedWorkflowService.executeChain(parseInt(id), prompt, userId);

    res.json(result);

  } catch (error) {
    console.error('Failed to execute chain:', error);
    res.status(500).json({
      error: 'Failed to execute workflow chain',
      message: error.message
    });
  }
});

// POST /api/chains/run - Execute a workflow chain directly (without saving)
router.post('/chains/run', [
  optionalAuth,
  body('prompt')
    .isString()
    .isLength({ min: 1, max: 500 })
    .withMessage('Prompt must be a string between 1-500 characters'),
  body('actions')
    .isArray({ min: 1, max: 10 })
    .withMessage('Actions must be an array with 1-10 items'),
  body('actions.*.type')
    .isIn(['weather', 'github', 'news'])
    .withMessage('Action type must be one of: weather, github, news'),
  validateRequest
], async (req, res) => {
  try {
    const { prompt, actions, name = 'Ad-hoc Chain' } = req.body;
    const userId = req.user ? req.user.id : null;

    // Execute chain directly without saving
    const results = [];
    let combinedContext = `Initial prompt: ${prompt}\n\n`;

    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      const stepStartTime = Date.now();
      
      try {
        // Generate prompt with accumulated context
        const aiPrompt = action.prompt ? 
          `${action.prompt} Context: ${combinedContext}` : 
          `${prompt} Context: ${combinedContext}`;
        
        // Check cache first for API response
        let apiResponse = await chainedWorkflowService.cacheService.getCachedAPIResponse(action.type, prompt);
        let fromCache = false;
        
        if (!apiResponse) {
          // Get API response first
          apiResponse = await chainedWorkflowService.apiService.callAPI(action.type, prompt);
          await chainedWorkflowService.cacheService.cacheAPIResponse(action.type, prompt, apiResponse);
        } else {
          fromCache = true;
          console.log(`📦 Using cached API response for ${action.type} in ad-hoc chain`);
        }
        
        // Generate context-aware AI response based on API data
        const contextAwarePrompt = chainedWorkflowService.createContextAwarePrompt(aiPrompt, apiResponse, action.type);
        const aiResponse = await chainedWorkflowService.aiService.generateResponse(contextAwarePrompt);
        
        // Combine responses
        const stepResult = chainedWorkflowService.combineResponses(aiResponse, apiResponse, action.type);
        
        results.push({
          step: i + 1,
          action: action.type,
          prompt: action.prompt || prompt,
          ai_response: aiResponse,
          api_response: apiResponse,
          final_result: stepResult,
          cached: fromCache,
          timestamp: new Date(),
          execution_time_ms: Date.now() - stepStartTime,
          executedAt: new Date()
        });

        // Update context for next step
        combinedContext += `Step ${i + 1} (${action.type}): ${stepResult}\n`;

      } catch (stepError) {
        console.error(`Step ${i + 1} failed:`, stepError);
        results.push({
          step: i + 1,
          action: action.type,
          prompt: action.prompt || prompt,
          error: stepError.message,
          executedAt: new Date()
        });
        
        // Continue with error context
        combinedContext += `Step ${i + 1} (${action.type}): Error - ${stepError.message}\n`;
      }
    }

    // Generate summary
    const summary = chainedWorkflowService.generateChainSummary(results, name);

    res.json({
      chainName: name,
      totalSteps: actions.length,
      completedSteps: results.filter(r => !r.error).length,
      failedSteps: results.filter(r => r.error).length,
      results,
      summary,
      executedAt: new Date(),
      isAdHoc: true,
      userAuthenticated: !!req.user
    });

  } catch (error) {
    console.error('Failed to run workflow chain:', error);
    res.status(500).json({
      error: 'Failed to execute workflow chain',
      message: error.message
    });
  }
});

// GET /api/chains/:id - Get specific chain details
router.get('/chains/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user ? req.user.id : null;

    // Handle public chains
    if (typeof id === 'string' && id.startsWith('public-')) {
      const publicChains = await chainedWorkflowService.getPublicChains();
      const chain = publicChains.find(chain => chain.id === id);
      
      if (!chain) {
        return res.status(404).json({ error: 'Public workflow chain not found' });
      }
      
      return res.json({ chain });
    }

    // Get regular chain
    const chain = await chainedWorkflowService.WorkflowChain.findByPk(parseInt(id));
    
    if (!chain) {
      return res.status(404).json({ error: 'Workflow chain not found' });
    }

    // Check if user owns the chain
    if (chain.userId && (!userId || chain.userId !== userId)) {
      return res.status(403).json({ error: 'Unauthorized access to workflow chain' });
    }

    res.json({ chain });

  } catch (error) {
    console.error('Failed to fetch chain:', error);
    res.status(500).json({
      error: 'Failed to fetch workflow chain',
      message: error.message
    });
  }
});

module.exports = router;