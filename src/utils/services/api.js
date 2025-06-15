import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem('authToken');
    // NOTE: If X-USER-IDENTITY should be dynamic from login response,
    // it would be added here via localStorage.getItem('userIdentity')
    // For now, it's hardcoded or imported directly in components as per your latest request.

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      console.warn('Authentication expired or invalid. Redirecting to login.');
      localStorage.removeItem('authToken');
      // Potentially remove localStorage.removeItem('userIdentity'); if you ever store it there dynamically
      window.location.href = '/login'; // Redirect to login
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default api;
