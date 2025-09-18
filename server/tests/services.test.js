const AIService = require('../src/services/aiService');
const APIService = require('../src/services/apiService');

const aiService = new AIService();
const apiService = new APIService();

describe('AI Service Tests', () => {
  it('should generate AI response', async () => {
    const prompt = 'Write a tweet about sunny weather';
    const response = await aiService.generateResponse(prompt);
    
    expect(typeof response).toBe('string');
    expect(response.length).toBeGreaterThan(0);
  });

  it('should handle empty prompt', async () => {
    const response = await aiService.generateResponse('');
    
    expect(typeof response).toBe('string');
    expect(response.length).toBeGreaterThan(0);
  });
});

describe('API Service Tests', () => {
  it('should call weather API', async () => {
    const response = await apiService.callAPI('weather');
    
    expect(typeof response).toBe('string');
    expect(response.length).toBeGreaterThan(0);
  });

  it('should call GitHub API', async () => {
    const response = await apiService.callAPI('github');
    
    expect(typeof response).toBe('string');
    expect(response.length).toBeGreaterThan(0);
  });

  it('should call News API', async () => {
    const response = await apiService.callAPI('news');
    
    expect(typeof response).toBe('string');
    expect(response.length).toBeGreaterThan(0);
  });

  it('should throw error for invalid action', async () => {
    await expect(apiService.callAPI('invalid')).rejects.toThrow();
  });
});