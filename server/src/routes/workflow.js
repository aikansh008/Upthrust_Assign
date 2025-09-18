const express = require('express');
const { body } = require('express-validator');
const { runWorkflow, getHistory } = require('../controllers/workflowController');
const { validateRequest } = require('../middleware/validation');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// POST /api/run-workflow
router.post('/run-workflow', [
  optionalAuth,
  body('prompt')
    .isString()
    .isLength({ min: 1, max: 500 })
    .withMessage('Prompt must be a string between 1-500 characters'),
  body('action')
    .isIn(['weather', 'github', 'news'])
    .withMessage('Action must be one of: weather, github, news'),
  validateRequest
], runWorkflow);

// GET /api/history
router.get('/history', optionalAuth, getHistory);

module.exports = router;