import axios from 'axios';

const api = axios.create({
  baseURL: 'https://yusufacmaci.com/yildizskylab/', // Base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// API'ye isteklerde auth token eklemek için interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
