import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';

const useLogin = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (values, setFieldError) => {
    setLoginError(null);
    setIsLoading(true);

    try {
      const { token, userIdentity } = await loginUser(values, setFieldError);

      if (token) {
        localStorage.setItem('authToken', token);
        setAuthToken(token);
      }

      if (userIdentity) {
        localStorage.setItem('userIdentity', userIdentity);
      }

      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (errMsg) {
      setLoginError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, loginError, authToken, isLoading };
};

export default useLogin;
