import axios from 'axios';

const DEFAULT_DEV_API = 'http://localhost:5000/api';
const DEFAULT_PROD_API = 'https://dek-nek-round2.vercel.app/api';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  (process.env.NODE_ENV === 'production' ? DEFAULT_PROD_API : DEFAULT_DEV_API);

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signup = (userData) => api.post('/auth/signup', userData);
export const login = (email, password) => api.post('/auth/login', { email, password });
export const verifyToken = () => api.post('/auth/verify');
export const getCurrentUser = () => api.get('/user/me');
export const updateProfile = (userData) => api.put('/user/update', userData);
export const getAllUsers = () => api.get('/user/all');
export const deleteAccount = () => api.delete('/user/delete');

export default api;
