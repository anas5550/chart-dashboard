// src/services/authService.js
import api from './api'; // axios instance

export const loginUser = async ({ email, password }) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
      isLoggedInHere: 0,
    });

    const { token, userDetails } = response.data;

    if (!token || !userDetails) {
      throw new Error('Invalid login response structure');
    }

    return { token, userDetails };
  } catch (err) {
    if (err.response) {
      const message = err.response.data?.message || 'Invalid credentials';
      const errors = err.response.data?.errors || {};
      const fieldErrors = {};
      if (errors.email) fieldErrors.email = errors.email;
      if (errors.password) fieldErrors.password = errors.password;
      throw { message, fieldErrors };
    }

    throw new Error('Network error or unexpected issue');
  }
};
