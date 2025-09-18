const request = require('supertest');
const app = require('../src/index');
const { sequelize } = require('../src/models');
const jwt = require('jsonwebtoken');

describe('Chained Workflows API', () => {
  let authToken;
  
  beforeAll(async () => {
    // Setup test database
    await sequelize.sync({ force: true });
    
    // Create test JWT token
    authToken = jwt.sign(
      { id: 1, username: 'testuser' },
      process.env.JWT_SECRET || 'test-secret',
      { expiresIn: '1h' }
    );
  });

  afterAll(async () => {
    // Cleanup
    await sequelize.close();
  });

  describe('GET /api/chains', () => {
    it('should return public chains for unauthenticated users', async () => {
      const response = await request(app)
        .get('/api/chains')
        .expect(200);

      expect(response.body).toHaveProperty('chains');
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('userAuthenticated');
      expect(response.body.userAuthenticated).toBe(false);
      expect(Array.isArray(response.body.chains)).toBe(true);
      expect(response.body.chains.length).toBeGreaterThan(0);
    });

    it('should return user chains for authenticated users', async () => {
      const response = await request(app)
        .get('/api/chains')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('chains');
      expect(response.body.userAuthenticated).toBe(true);
      expect(Array.isArray(response.body.chains)).toBe(true);
    });
  });

  describe('POST /api/chains', () => {
    it('should create a new workflow chain with authentication', async () => {
      const chainData = {
        name: 'Test Weather & News Chain',
        description: 'A test chain for weather and news',
        actions: [
          { type: 'weather', prompt: 'Get current weather' },
          { type: 'news', prompt: 'Get latest tech news' }
        ]
      };

      const response = await request(app)
        .post('/api/chains')
        .set('Authorization', `Bearer ${authToken}`)
        .send(chainData)
        .expect(201);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('chain');
      expect(response.body.chain.name).toBe(chainData.name);
      expect(response.body.chain.actions).toHaveLength(2);
    });

    it('should require authentication to create chains', async () => {
      const chainData = {
        name: 'Test Chain',
        actions: [{ type: 'weather' }]
      };

      const response = await request(app)
        .post('/api/chains')
        .send(chainData)
        .expect(401);

      expect(response.body.error).toBe('Access token required');
    });

    it('should validate chain data', async () => {
      const invalidChainData = {
        name: '', // Invalid: empty name
        actions: [] // Invalid: empty actions array
      };

      const response = await request(app)
        .post('/api/chains')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidChainData)
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
    });

    it('should validate action types', async () => {
      const invalidChainData = {
        name: 'Test Chain',
        actions: [
          { type: 'invalid-action' } // Invalid action type
        ]
      };

      const response = await request(app)
        .post('/api/chains')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidChainData)
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
    });
  });

  describe('POST /api/chains/:id/execute', () => {
    it('should execute a public workflow chain', async () => {
      const response = await request(app)
        .post('/api/chains/public-1/execute')
        .send({
          prompt: 'Get weather and news update'
        })
        .expect(200);

      expect(response.body).toHaveProperty('chainId');
      expect(response.body).toHaveProperty('chainName');
      expect(response.body).toHaveProperty('results');
      expect(response.body).toHaveProperty('summary');
      expect(response.body.isPublic).toBe(true);
      expect(Array.isArray(response.body.results)).toBe(true);
      expect(response.body.results.length).toBeGreaterThan(0);
    });

    it('should execute multiple steps in sequence', async () => {
      const response = await request(app)
        .post('/api/chains/public-2/execute')
        .send({
          prompt: 'Get developer daily brief'
        })
        .expect(200);

      expect(response.body.results).toHaveLength(3); // Weather, GitHub, News
      expect(response.body.results[0].action).toBe('weather');
      expect(response.body.results[1].action).toBe('github');
      expect(response.body.results[2].action).toBe('news');
      
      // Check that each step has required properties
      response.body.results.forEach(result => {
        expect(result).toHaveProperty('step');
        expect(result).toHaveProperty('action');
        expect(result).toHaveProperty('ai_response');
        expect(result).toHaveProperty('api_response');
        expect(result).toHaveProperty('final_result');
      });
    });

    it('should validate prompt for chain execution', async () => {
      const response = await request(app)
        .post('/api/chains/public-1/execute')
        .send({
          // Missing prompt
        })
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
    });

    it('should handle non-existent chain gracefully', async () => {
      const response = await request(app)
        .post('/api/chains/public-999/execute')
        .send({
          prompt: 'Test prompt'
        })
        .expect(404);

      expect(response.body.error).toBe('Public workflow chain not found');
    });
  });

  describe('GET /api/chains/:id', () => {
    it('should get public chain details', async () => {
      const response = await request(app)
        .get('/api/chains/public-1')
        .expect(200);

      expect(response.body).toHaveProperty('chain');
      expect(response.body.chain.id).toBe('public-1');
      expect(response.body.chain).toHaveProperty('name');
      expect(response.body.chain).toHaveProperty('description');
      expect(response.body.chain).toHaveProperty('actions');
      expect(Array.isArray(response.body.chain.actions)).toBe(true);
    });

    it('should handle non-existent public chain', async () => {
      const response = await request(app)
        .get('/api/chains/public-999')
        .expect(404);

      expect(response.body.error).toBe('Public workflow chain not found');
    });
  });
});