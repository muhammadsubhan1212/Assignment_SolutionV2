import axios from 'axios';
import { handleMockRequest } from './mockHandlers';

const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// MOCK — replace with real backend by removing this interceptor
api.interceptors.request.use(async (config) => {
  const mockResponse = await handleMockRequest(config);
  if (mockResponse) {
    config.adapter = async () => ({
      data: mockResponse.data,
      status: mockResponse.status,
      statusText: 'OK',
      headers: {},
      config,
      request: {},
    });
  }
  return config;
});

export default api;
