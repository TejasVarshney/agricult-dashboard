import axios from 'axios';
import { API_CONFIG } from '@/config';

export const apiClient = axios.create({
  baseURL: API_CONFIG.baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  response => response.data,
  error => {
    // Handle errors globally
    console.error('API Error:', error);
    return Promise.reject(error);
  }
); 