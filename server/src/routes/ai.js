const express = require('express');
const AIService = require('../services/aiService');

const router = express.Router();
const ai = new AIService();

// GET /api/ai/health - quick check of Gemini integration
router.get('/ai/health', async (req, res) => {
  const testPrompt = 'Return the word HEALTH-CHECK only.';
  try {
    const startedAt = Date.now();
    const response = await ai.generateResponse(testPrompt);
    const elapsedMs = Date.now() - startedAt;
    res.json({
      ok: true,
      response,
      elapsedMs,
      usedMock: !process.env.OPENAI_API_KEY,
      keyPresent: !!process.env.OPENAI_API_KEY,
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

module.exports = router;
