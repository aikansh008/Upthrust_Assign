require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const { createClient } = require('redis');
const passport = require('./config/passport');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// Import routes
const workflowRoutes = require('./routes/workflow');
const authRoutes = require('./routes/auth');
const chainRoutes = require('./routes/chains');
const aiRoutes = require('./routes/ai');
const cacheRoutes = require('./routes/cache');

// Import database
const { initDatabase } = require('./models/index');

// Debug environment variables
console.log('🔍 Environment Variables Check:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? `${process.env.OPENAI_API_KEY.substring(0, 10)}...` : 'NOT FOUND');
console.log('WEATHER_API_KEY:', process.env.WEATHER_API_KEY ? `${process.env.WEATHER_API_KEY.substring(0, 10)}...` : 'NOT FOUND');
console.log('NEWS_API_KEY:', process.env.NEWS_API_KEY ? `${process.env.NEWS_API_KEY.substring(0, 10)}...` : 'NOT FOUND');

// Initialize database
initDatabase();

const app = express();

// Redis client setup
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => {
  console.log('Redis Client Error', err);
});

redisClient.on('connect', () => {
  console.log('✅ Connected to Redis');
});

// Connect to Redis
redisClient.connect().catch(console.error);

// Security middleware
app.use(helmet());
app.use(cors({
  origin: [
    'https://upthrust-assign.onrender.com',
    'http://localhost:3000',
    'http://localhost:3001',
    process.env.CLIENT_URL
  ].filter(Boolean),
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Upthrust Workflow Automation API',
    version: '1.0.0',
    authenticated: !!req.user,
    user: req.user ? req.user.username : null,
    endpoints: {
      workflow: 'POST /api/run-workflow',
      history: 'GET /api/history',
      chains: 'GET /api/chains',
      createChain: 'POST /api/chains',
      executeChain: 'POST /api/chains/:id/execute',
      aiHealth: 'GET /api/ai/health',
      cacheStats: 'GET /api/cache/stats',
      cacheClear: 'DELETE /api/cache/clear',
      auth: 'GET /auth/github'
    }
  });
});

app.use('/api', workflowRoutes);
app.use('/api', chainRoutes);
app.use('/api', aiRoutes);
app.use('/api', cacheRoutes);
app.use('/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.path}`
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔐 GitHub Auth: https://upthrust-assign.onrender.com/auth/github`);
});

module.exports = app;