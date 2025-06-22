import api from './api';

export const loginUser = async (values, setFieldError) => {
  try {
    const response = await api.post('/auth/login', {
      email: values.email,
      password: values.password,
      isLoggedInHere: 0,
    });

    const token =
      response.data.token || response.data.accessToken || response.data.jwt;

    const userIdentity =
      response.data.userIdentity ||
      response.data.xIdentity ||
      response.data.your_user_identity_field;

    if (!token) {
      throw 'Login successful, but no authentication token was received.';
    }

    return { token, userIdentity };
  } catch (err) {
    if (err.response) {
      const resData = err.response.data;

      if (resData.errors) {
        if (resData.errors.email) setFieldError('email', resData.errors.email);
        if (resData.errors.password)
          setFieldError('password', resData.errors.password);
      }

      throw resData.message || 'Invalid credentials. Please try again.';
    } else if (err.request) {
      throw 'Network error. Please check your connection and try again.';
    } else {
      throw 'An unexpected error occurred. Please try again.';
    }
  }
};
