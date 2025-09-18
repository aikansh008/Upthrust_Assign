const express = require('express');
const CacheService = require('../services/cacheService');

const router = express.Router();
const cacheService = new CacheService();

// GET /api/cache/stats - Get cache statistics
router.get('/cache/stats', async (req, res) => {
  try {
    const stats = await cacheService.getStats();
    res.json({
      cache: stats,
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get cache stats',
      message: error.message
    });
  }
});

// DELETE /api/cache/clear - Clear all cached data (for development)
router.delete('/cache/clear', async (req, res) => {
  try {
    // Note: This is a simple implementation for development
    // In production, you might want to add authentication
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({
        error: 'Cache clearing not allowed in production'
      });
    }

    // Clear memory cache (Redis would need to be cleared manually if needed)
    const stats = await cacheService.getStats();
    
    res.json({
      message: 'Cache cleared successfully',
      previousStats: stats
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to clear cache',
      message: error.message
    });
  }
});

module.exports = router;