const axios = require('axios');

class AIService {
  constructor() {
    console.log('🤖 AI Service Constructor Debug:', {
      envVarExists: !!process.env.OPENAI_API_KEY,
      envVarValue: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 15) + '...' : 'not found'
    });
    
    this.geminiApiKey = process.env.OPENAI_API_KEY;
    this.baseURL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
    this.requestCount = 0;
    this.lastRequestTime = 0;
    this.rateLimited = false;
    this.rateLimitResetTime = 0;
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async waitForRateLimit() {
    const now = Date.now();
    
    // Check if we're still in rate limit cooldown
    if (this.rateLimited && now < this.rateLimitResetTime) {
      const waitTime = this.rateLimitResetTime - now;
      console.log(`⏳ Rate limit cooldown: waiting ${Math.round(waitTime/1000)}s`);
      await this.delay(waitTime);
      this.rateLimited = false;
    }
    
    // Standard rate limiting between requests
    const timeSinceLastRequest = now - this.lastRequestTime;
    const minInterval = 2000; // Increase to 2 seconds between requests
    
    if (timeSinceLastRequest < minInterval) {
      const waitTime = minInterval - timeSinceLastRequest;
      console.log(`⏱️ Rate limiting: waiting ${waitTime}ms`);
      await this.delay(waitTime);
    }
    
    this.lastRequestTime = Date.now();
    this.requestCount++;
  }

  async generateResponse(prompt) {
    console.log('🤖 AI Service Debug:', {
      hasApiKey: !!this.geminiApiKey,
      keyLength: this.geminiApiKey ? this.geminiApiKey.length : 0,
      keyPrefix: this.geminiApiKey ? this.geminiApiKey.substring(0, 10) + '...' : 'none',
      requestCount: this.requestCount,
      rateLimited: this.rateLimited,
      prompt: prompt.substring(0, 100) + '...'
    });
    
    if (!this.geminiApiKey) {
      console.warn('⚠️ No Google Gemini API key found, using mock response');
      return this.getMockResponse(prompt);
    }

    // If we're currently rate limited, skip API call and use mock
    if (this.rateLimited) {
      console.warn('⚠️ Currently rate limited, using mock response');
      return this.getMockResponse(prompt);
    }

    await this.waitForRateLimit();
    console.log('🌐 Using Google Gemini API for AI response');
    
    try {
      const response = await axios.post(
        `${this.baseURL}?key=${this.geminiApiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            maxOutputTokens: 300,
            temperature: 0.8,
            topP: 0.95,
            topK: 40
          }
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 15000
        }
      );

      const aiResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      
      if (!aiResponse) {
        throw new Error('Empty response from Gemini API');
      }

      console.log('✅ Gemini API Success:', {
        responseLength: aiResponse.length,
        preview: aiResponse.substring(0, 50) + '...'
      });

      // Reset rate limit status on successful request
      this.rateLimited = false;
      return aiResponse;

    } catch (error) {
      console.error('❌ Gemini API Error Details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        code: error.code
      });
      
      if (error.response?.status === 429) {
        console.warn('🚫 RATE LIMIT HIT (429) - Setting cooldown period');
        this.rateLimited = true;
        // Set cooldown for 1 minute
        this.rateLimitResetTime = Date.now() + 60000;
      } else if (error.response?.status === 401) {
        console.warn('🔑 Invalid Gemini API key (401), using mock response');
      } else if (error.response?.status === 403) {
        console.warn('🚫 Gemini API access forbidden (403), using mock response');
      } else {
        console.warn('⚠️ Gemini API error, using mock response');
      }
      
      return this.getMockResponse(prompt);
    }
  }

  getMockResponse(prompt) {
    console.log('🎭 Using mock AI response for prompt:', prompt.substring(0, 50) + '...');
    
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('weather')) {
      const weatherResponses = [
        "What a wonderful day to enjoy the outdoors! The weather conditions look perfect for any activities you have planned. ",
        "The weather forecast suggests it's a great time to step outside and make the most of the beautiful conditions. ",
        "Perfect weather conditions ahead! This would be an ideal time for outdoor activities or just enjoying the fresh air. "
      ];
      return weatherResponses[Math.floor(Math.random() * weatherResponses.length)];
    } else if (lowerPrompt.includes('news') || lowerPrompt.includes('ai') || lowerPrompt.includes('technology')) {
      const newsResponses = [
        "The latest developments in technology continue to shape our world in fascinating ways. Stay tuned for more exciting innovations! ",
        "Breaking news in the tech world shows remarkable progress in AI and automation. These advancements are truly revolutionary! ",
        "Current events highlight the rapid evolution of technology and its impact across various industries. Exciting times ahead! "
      ];
      return newsResponses[Math.floor(Math.random() * newsResponses.length)];
    } else if (lowerPrompt.includes('github') || lowerPrompt.includes('repository') || lowerPrompt.includes('code')) {
      const githubResponses = [
        "The open-source community continues to amaze with incredible projects and collaborative development. Great things happening on GitHub! ",
        "Amazing repositories are trending with innovative solutions and cutting-edge technologies. The developer community is thriving! ",
        "GitHub showcases the best of collaborative coding with repositories that push the boundaries of what's possible. "
      ];
      return githubResponses[Math.floor(Math.random() * githubResponses.length)];
    } else {
      const genericResponses = [
        "This is a fascinating topic that opens up many interesting possibilities for discussion and exploration. ",
        "What an intriguing subject! There are so many angles to consider and valuable insights to be gained. ",
        "This presents an excellent opportunity to dive deeper and uncover the many layers of this complex topic. ",
        "Great point! This deserves thoughtful analysis and there's definitely more to explore here. "
      ];

      const hash = prompt.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0);
      
      const index = Math.abs(hash) % genericResponses.length;
      return genericResponses[index];
    }
  }
}

module.exports = AIService;
