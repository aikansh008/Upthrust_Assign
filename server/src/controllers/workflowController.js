const AIService = require('../services/aiService');
const APIService = require('../services/apiService');
const { WorkflowRun } = require('../models/index');

// Instantiate services after environment is loaded
const aiService = new AIService();
const apiService = new APIService();

const runWorkflow = async (req, res) => {
  try {
    const { prompt, action } = req.body;
    const userId = req.user ? req.user.id : null;

    console.log(`🔄 Running workflow: ${action} with prompt: "${prompt}"`);

    // Step 1: Call selected API first to get actual data
    const apiResponse = await apiService.callAPI(action, prompt);
    console.log(`📡 API Response: ${apiResponse}`);

    // Step 2: Call AI Agent with context-aware prompt
    const contextAwarePrompt = createContextAwarePrompt(prompt, apiResponse, action);
    const aiResponse = await aiService.generateResponse(contextAwarePrompt);
    console.log(`🤖 AI Response: ${aiResponse}`);

    // Step 3: Combine responses
    const finalResult = combineResponses(aiResponse, apiResponse, action);
    console.log(`✅ Final Result: ${finalResult}`);

    // Step 4: Save to database (if available)
    try {
      await WorkflowRun.create({
        prompt,
        action,
        ai_response: aiResponse,
        api_response: apiResponse,
        final_result: finalResult,
        userId
      });
      console.log('✅ Workflow saved to database');
    } catch (dbError) {
      console.warn('⚠️  Database save failed (using mock mode):', dbError.message);
      // Continue without database save
    }

    res.json({
      ai_response: aiResponse,
      api_response: apiResponse,
      final_result: finalResult
    });

  } catch (error) {
    console.error('Workflow error:', error);
    res.status(500).json({
      error: 'Workflow execution failed',
      message: error.message
    });
  }
};

const getHistory = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    
    let history;
    
    try {
      const whereClause = userId ? { userId } : {};
      history = await WorkflowRun.findAll({
        where: whereClause,
        order: [['created_at', 'DESC']],
        limit: 50,
        attributes: ['id', 'prompt', 'action', 'final_result', 'created_at']
      });
      console.log(`✅ Retrieved ${history.length} workflow runs from database`);
    } catch (dbError) {
      console.warn('⚠️  Database query failed (using mock mode):', dbError.message);
      
      // Mock data for when database is not available
      const mockHistory = [
        {
          id: 1,
          prompt: "Show weather in New York",
          action: "weather",
          final_result: "Here's the current weather in New York: Partly cloudy, 22°C with light winds. Perfect for outdoor activities! #weather",
          created_at: new Date(Date.now() - 3600000)
        },
        {
          id: 2,
          prompt: "Latest news about AI",
          action: "news",
          final_result: "Breaking news: New AI developments are revolutionizing technology. Multiple articles discuss recent breakthroughs in machine learning and automation. #news",
          created_at: new Date(Date.now() - 7200000)
        },
        {
          id: 3,
          prompt: "Show JavaScript repositories",
          action: "github",
          final_result: "Popular JavaScript repositories on GitHub include React, Vue.js, and Angular. These projects showcase modern web development practices. #github",
          created_at: new Date(Date.now() - 10800000)
        }
      ];
      
      return res.json({
        history: mockHistory
      });
    }

    res.json({
      history
    });
  } catch (error) {
    console.error('History retrieval error:', error);
    
    // Fallback to mock data
    const mockHistory = [
      {
        id: 1,
        prompt: "Show weather in London",
        action: "weather",
        final_result: "Current weather in London: Cloudy with a chance of rain, 15°C. Don't forget your umbrella! #weather",
        created_at: new Date(Date.now() - 1800000)
      }
    ];

    res.json({
      history: mockHistory
    });
  }
};

const combineResponses = (aiResponse, apiResponse, action) => {
  const hashtag = `#${action}`;
  return `${aiResponse} ${apiResponse} ${hashtag}`;
};

const createContextAwarePrompt = (originalPrompt, apiResponse, action) => {
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
};

module.exports = {
  runWorkflow,
  getHistory
};