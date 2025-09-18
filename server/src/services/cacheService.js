const redis = require('redis');

class CacheService {
  constructor() {
    this.isRedisAvailable = false;
    this.memoryCache = new Map(); // Fallback in-memory cache
    this.maxMemoryCacheSize = 1000;
    this.defaultTTL = 3600; // 1 hour in seconds
    
    this.initializeRedis();
  }

  async initializeRedis() {
    try {
      this.redisClient = redis.createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379'
      });

      this.redisClient.on('error', (err) => {
        console.warn('⚠️  Redis not available, using memory cache:', err.message);
        this.isRedisAvailable = false;
      });

      this.redisClient.on('connect', () => {
        console.log('✅ Cache service connected to Redis');
        this.isRedisAvailable = true;
      });

      await this.redisClient.connect();
    } catch (error) {
      console.warn('⚠️  Redis initialization failed, using memory cache:', error.message);
      this.isRedisAvailable = false;
    }
  }

  async set(key, value, ttl = this.defaultTTL) {
    const serializedValue = JSON.stringify({
      data: value,
      timestamp: Date.now(),
      ttl: ttl * 1000 // Convert to milliseconds for memory cache
    });

    try {
      if (this.isRedisAvailable) {
        await this.redisClient.setEx(key, ttl, serializedValue);
        console.log(`📦 Cached in Redis: ${key}`);
      } else {
        // Use memory cache as fallback
        this.memoryCache.set(key, serializedValue);
        this.cleanupMemoryCache();
        console.log(`📦 Cached in memory: ${key}`);
      }
    } catch (error) {
      console.error('Cache set error:', error.message);
      // Fallback to memory cache
      this.memoryCache.set(key, serializedValue);
      this.cleanupMemoryCache();
    }
  }

  async get(key) {
    try {
      let cachedData = null;

      if (this.isRedisAvailable) {
        try {
          cachedData = await this.redisClient.get(key);
        } catch (error) {
          console.warn('Redis get error, trying memory cache:', error.message);
        }
      }

      // Fallback to memory cache
      if (!cachedData && this.memoryCache.has(key)) {
        cachedData = this.memoryCache.get(key);
      }

      if (!cachedData) {
        return null;
      }

      const parsed = JSON.parse(cachedData);
      
      // Check if memory cached item has expired
      if (!this.isRedisAvailable && parsed.timestamp + parsed.ttl < Date.now()) {
        this.memoryCache.delete(key);
        return null;
      }

      console.log(`📦 Cache hit: ${key}`);
      return parsed.data;

    } catch (error) {
      console.error('Cache get error:', error.message);
      return null;
    }
  }

  async delete(key) {
    try {
      if (this.isRedisAvailable) {
        await this.redisClient.del(key);
      }
      this.memoryCache.delete(key);
      console.log(`🗑️  Cache deleted: ${key}`);
    } catch (error) {
      console.error('Cache delete error:', error.message);
    }
  }

  async exists(key) {
    try {
      if (this.isRedisAvailable) {
        const exists = await this.redisClient.exists(key);
        return exists === 1;
      }
      return this.memoryCache.has(key);
    } catch (error) {
      console.error('Cache exists error:', error.message);
      return false;
    }
  }

  cleanupMemoryCache() {
    if (this.memoryCache.size > this.maxMemoryCacheSize) {
      // Remove oldest entries
      const entries = Array.from(this.memoryCache.entries());
      const toDelete = entries.slice(0, entries.length - this.maxMemoryCacheSize);
      toDelete.forEach(([key]) => this.memoryCache.delete(key));
      console.log(`🧹 Cleaned up ${toDelete.length} old cache entries`);
    }
  }

  generateCacheKey(prefix, ...params) {
    const key = `${prefix}:${params.join(':')}`;
    return key.replace(/[^a-zA-Z0-9:_-]/g, '_'); // Sanitize key
  }

  async cacheChainResult(chainId, prompt, result) {
    const key = this.generateCacheKey('chain_result', chainId, Buffer.from(prompt).toString('base64').slice(0, 50));
    await this.set(key, result, 1800); // Cache for 30 minutes
    return key;
  }

  async getCachedChainResult(chainId, prompt) {
    const key = this.generateCacheKey('chain_result', chainId, Buffer.from(prompt).toString('base64').slice(0, 50));
    return await this.get(key);
  }

  async cacheAPIResponse(action, prompt, response) {
    const key = this.generateCacheKey('api_response', action, Buffer.from(prompt).toString('base64').slice(0, 50));
    await this.set(key, response, 600); // Cache API responses for 10 minutes
    return key;
  }

  async getCachedAPIResponse(action, prompt) {
    const key = this.generateCacheKey('api_response', action, Buffer.from(prompt).toString('base64').slice(0, 50));
    return await this.get(key);
  }

  async getStats() {
    try {
      const stats = {
        redisAvailable: this.isRedisAvailable,
        memoryCacheSize: this.memoryCache.size,
        timestamp: new Date().toISOString()
      };

      if (this.isRedisAvailable) {
        try {
          const info = await this.redisClient.info('memory');
          stats.redisInfo = info;
        } catch (error) {
          stats.redisInfo = 'Unable to get Redis info';
        }
      }

      return stats;
    } catch (error) {
      return {
        error: error.message,
        redisAvailable: false,
        memoryCacheSize: this.memoryCache.size
      };
    }
  }
}

module.exports = CacheService;