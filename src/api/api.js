import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-controlstock.onrender.com/api',
});

// Interceptor para agregar el token a las cabeceras
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;