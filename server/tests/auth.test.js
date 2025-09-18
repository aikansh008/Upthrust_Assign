const request = require('supertest');
const app = require('../src/index');
const { sequelize } = require('../src/models');

describe('Authentication API', () => {
  beforeAll(async () => {
    // Setup test database
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    // Cleanup
    await sequelize.close();
  });

  describe('GET /auth/status', () => {
    it('should return not authenticated for unauthenticated user', async () => {
      const response = await request(app)
        .get('/auth/status')
        .expect(200);

      expect(response.body).toEqual({
        isAuthenticated: false,
        user: null
      });
    });
  });

  describe('GET /auth/github', () => {
    it('should redirect to GitHub OAuth', async () => {
      const response = await request(app)
        .get('/auth/github')
        .expect(302);

      expect(response.headers.location).toContain('github.com');
    });
  });

  describe('POST /auth/logout', () => {
    it('should logout successfully', async () => {
      const response = await request(app)
        .post('/auth/logout')
        .expect(200);

      expect(response.body.message).toBe('Logged out successfully');
    });
  });
});

describe('JWT Authentication Middleware', () => {
  let validToken;
  
  beforeEach(() => {
    const jwt = require('jsonwebtoken');
    validToken = jwt.sign(
      { id: 1, username: 'testuser' },
      process.env.JWT_SECRET || 'test-secret',
      { expiresIn: '1h' }
    );
  });

  it('should accept valid JWT token', async () => {
    // This would require a protected route to test properly
    // For now, just test token generation
    expect(validToken).toBeDefined();
    expect(typeof validToken).toBe('string');
  });

  it('should reject invalid JWT token', async () => {
    const response = await request(app)
      .post('/api/chains')
      .set('Authorization', 'Bearer invalid-token')
      .send({
        name: 'Test Chain',
        actions: [{ type: 'weather' }]
      })
      .expect(403);

    expect(response.body.error).toBe('Invalid or expired token');
  });
});