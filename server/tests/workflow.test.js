const request = require('supertest');
const app = require('../src/index');
const { sequelize } = require('../src/models');

describe('Workflow API Tests', () => {
  describe('GET /', () => {
    it('should return API information', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('version');
      expect(response.body).toHaveProperty('endpoints');
    });
  });

  describe('POST /api/run-workflow', () => {
    it('should run workflow with valid input', async () => {
      const workflowData = {
        prompt: 'Write a tweet about sunny weather',
        action: 'weather'
      };

      const response = await request(app)
        .post('/api/run-workflow')
        .send(workflowData)
        .expect(200);

      expect(response.body).toHaveProperty('ai_response');
      expect(response.body).toHaveProperty('api_response');
      expect(response.body).toHaveProperty('final_result');
      expect(typeof response.body.ai_response).toBe('string');
      expect(typeof response.body.api_response).toBe('string');
      expect(typeof response.body.final_result).toBe('string');
    });

    it('should return 400 for missing prompt', async () => {
      const workflowData = {
        action: 'weather'
      };

      const response = await request(app)
        .post('/api/run-workflow')
        .send(workflowData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for invalid action', async () => {
      const workflowData = {
        prompt: 'Test prompt',
        action: 'invalid'
      };

      const response = await request(app)
        .post('/api/run-workflow')
        .send(workflowData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should work with all supported actions', async () => {
      const actions = ['weather', 'github', 'news'];
      
      for (const action of actions) {
        const workflowData = {
          prompt: `Test prompt for ${action}`,
          action: action
        };

        const response = await request(app)
          .post('/api/run-workflow')
          .send(workflowData)
          .expect(200);

        expect(response.body).toHaveProperty('ai_response');
        expect(response.body).toHaveProperty('api_response');
        expect(response.body).toHaveProperty('final_result');
        expect(response.body.final_result).toContain(`#${action}`);
      }
    }, 30000); // Increase timeout for multiple API calls
  });

  describe('GET /api/history', () => {
    it('should return workflow history', async () => {
      const response = await request(app)
        .get('/api/history')
        .expect(200);

      expect(response.body).toHaveProperty('history');
      expect(Array.isArray(response.body.history)).toBe(true);
    });
  });

  describe('Error handling', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/api/unknown-route')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });
});