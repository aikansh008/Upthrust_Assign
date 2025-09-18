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

    // Step 1: Call AI Agent
    const aiResponse = await aiService.generateResponse(prompt);
    console.log(`🤖 AI Response: ${aiResponse}`);

    // Step 2: Call selected API
    const apiResponse = await apiService.callAPI(action, prompt);
    console.log(`📡 API Response: ${apiResponse}`);

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

export const getHistory = async (req, res) => {
  try {
    const history = await WorkflowRun.findAll({
      order: [['created_at', 'DESC']],
      limit: 10
    });

    res.json({
      history: history.map(run => ({
        id: run.id,
        prompt: run.prompt,
        action: run.action,
        ai_response: run.ai_response,
        api_response: run.api_response,
        final_result: run.final_result,
        created_at: run.created_at
      }))
    });

  } catch (error) {
    console.warn('⚠️  Database fetch failed (using mock data):', error.message);
    
    // Return mock history when database is unavailable
    const mockHistory = [
      {
        id: 1,
        prompt: "Write a tweet about sunny weather",
        action: "weather",
        ai_response: "Perfect day to chill outside! 🌞",
        api_response: "Sunny in Delhi, 32°C",
        final_result: "Perfect day to chill outside! 🌞 Sunny in Delhi, 32°C #weather",
        created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString()
      },
      {
        id: 2,
        prompt: "Tell me about trending repos",
        action: "github",
        ai_response: "Amazing projects are trending! 🚀",
        api_response: "awesome-project by developer123 - 15.2k stars",
        final_result: "Amazing projects are trending! 🚀 awesome-project by developer123 - 15.2k stars #github",
        created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString()
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