import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/services/api';

const useLogin = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (values, setFieldError) => {
    setLoginError(null);
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', {
        email: values.email,
        password: values.password,
        isLoggedInHere: 0,
      });

      const receivedToken =
        response.data.token || response.data.accessToken || response.data.jwt;

      if (receivedToken) {
        localStorage.setItem('authToken', receivedToken);
        setAuthToken(receivedToken);
        console.log('Login successful!', response.data);
        setTimeout(() => {
          console.log('Attempting to navigate to /');
          navigate('/');
        }, 1500);
      } else {
        setLoginError(
          'Login successful, but no authentication token was received.',
        );
        console.warn(
          'Login successful, but no token found in response:',
          response.data,
        );
      }
    } catch (err) {
      if (err.response) {
        console.error('Login error:', err.response.data);
        setLoginError(
          err.response.data.message || 'Invalid credentials. Please try again.',
        );
        if (err.response.data.errors) {
          if (err.response.data.errors.email) {
            setFieldError('email', err.response.data.errors.email);
          }
          if (err.response.data.errors.password) {
            setFieldError('password', err.response.data.errors.password);
          }
        }
      } else if (err.request) {
        console.error('No response from server:', err.request);
        setLoginError(
          'Network error. Please check your connection and try again.',
        );
      } else {
        console.error('Error setting up login request:', err.message);
        setLoginError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { login, loginError, authToken, isLoading };
};

export default useLogin;
