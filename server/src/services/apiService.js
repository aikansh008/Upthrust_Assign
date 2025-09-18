const axios = require('axios');

class APIService {
  constructor() {
    console.log('🔧 API Service Constructor Debug:', {
      weatherKeyExists: !!process.env.WEATHER_API_KEY,
      newsKeyExists: !!process.env.NEWS_API_KEY,
      weatherKeyPrefix: process.env.WEATHER_API_KEY ? process.env.WEATHER_API_KEY.substring(0, 10) + '...' : 'not found',
      newsKeyPrefix: process.env.NEWS_API_KEY ? process.env.NEWS_API_KEY.substring(0, 10) + '...' : 'not found'
    });
    
    this.weatherApiKey = process.env.WEATHER_API_KEY;
    this.newsApiKey = process.env.NEWS_API_KEY;
  }

  async callAPI(action, prompt = '') {
    switch (action) {
      case 'weather':
        return await this.getWeather(prompt);
      case 'github':
        return await this.getGithubTrending();
      case 'news':
        return await this.getTopNews();
      default:
        throw new Error(`Unknown action: ${action}`);
    }
  }

  async getWeather(prompt = '') {
    try {
      if (!this.weatherApiKey) {
        console.warn('⚠️  No Weather API key found, using mock data');
        return this.getMockWeather();
      }

      // Extract location from prompt or use default
      let queryLocation = 'Delhi,India'; // default
      if (prompt && prompt.trim()) {
        // Simple extraction - use the prompt as location
        queryLocation = prompt.trim();
        console.log(`🌍 Checking weather for: ${queryLocation}`);
      }

      console.log('🌤️ Using WeatherAPI.com for weather data');
      
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json`,
        {
          params: {
            key: this.weatherApiKey,
            q: queryLocation,
            aqi: 'no'
          },
          timeout: 10000
        }
      );

      const weather = response.data;
      const cityName = weather.location.name;
      const temp = Math.round(weather.current.temp_c);
      const condition = weather.current.condition.text;
      
      return `${condition} in ${cityName}, ${temp}°C`;

    } catch (error) {
      console.error('Weather API Error:', error.message);
      return this.getMockWeather();
    }
  }

  async getGithubTrending() {
    try {
      const response = await axios.get(
        'https://api.github.com/search/repositories',
        {
          params: {
            q: 'created:>2024-01-01',
            sort: 'stars',
            order: 'desc',
            per_page: 1
          },
          timeout: 10000
        }
      );

      const repo = response.data.items[0];
      if (repo) {
        return `${repo.name} by ${repo.owner.login} - ${repo.stargazers_count} stars`;
      } else {
        return this.getMockGithub();
      }

    } catch (error) {
      console.error('GitHub API Error:', error.message);
      return this.getMockGithub();
    }
  }

  async getTopNews() {
    try {
      if (!this.newsApiKey) {
        console.warn('⚠️  No News API key found, using mock data');
        return this.getMockNews();
      }

      const response = await axios.get(
        'https://newsapi.org/v2/top-headlines',
        {
          params: {
            country: 'us',
            pageSize: 1,
            apiKey: this.newsApiKey
          },
          timeout: 10000
        }
      );

      const article = response.data.articles[0];
      if (article) {
        return `Breaking: ${article.title}`;
      } else {
        return this.getMockNews();
      }

    } catch (error) {
      console.error('News API Error:', error.message);
      return this.getMockNews();
    }
  }

  // Mock responses for when APIs are unavailable
  getMockWeather() {
    const conditions = [
      'Sunny in Delhi, 32°C',
      'Cloudy in Mumbai, 28°C', 
      'Rainy in Bangalore, 24°C',
      'Clear skies in Chennai, 35°C'
    ];
    return conditions[Math.floor(Math.random() * conditions.length)];
  }

  getMockGithub() {
    const mockRepos = [
      'awesome-project by developer123 - 15.2k stars',
      'react-components by reactdev - 8.7k stars',
      'ml-toolkit by airesearcher - 12.1k stars',
      'web-framework by webmaster - 20.5k stars'
    ];
    return mockRepos[Math.floor(Math.random() * mockRepos.length)];
  }

  getMockNews() {
    const mockNews = [
      'Breaking: Tech innovation reaches new heights',
      'Breaking: Scientists make breakthrough discovery',
      'Breaking: Global markets show positive trends',
      'Breaking: New sustainable energy solutions emerge'
    ];
    return mockNews[Math.floor(Math.random() * mockNews.length)];
  }
}

module.exports = APIService;