import axios from 'axios';

// Use relative URLs when proxy is configured in package.json
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Include cookies for session-based auth
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`📤 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('📤 API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log(`📥 API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('📥 API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const runWorkflow = async (workflowData) => {
  try {
    const response = await api.post('/run-workflow', workflowData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to run workflow';
    throw new Error(message);
  }
};

export const getHistory = async () => {
  try {
    const response = await api.get('/history');
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to fetch history';
    throw new Error(message);
  }
};

// Authentication API functions
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/user');
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      return null; // Not authenticated
    }
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Workflow chains API
export const runWorkflowChain = async (chainData) => {
  try {
    const response = await api.post('/chains/run', chainData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to run workflow chain';
    throw new Error(message);
  }
};

export const getChainHistory = async () => {
  try {
    const response = await api.get('/chains/history');
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to fetch chain history';
    throw new Error(message);
  }
};

export default api;