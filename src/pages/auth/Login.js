import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from './../../utils/services/api';

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    setLoginError(null);
    setSubmitting(true);

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
          console.log('Attempting to navigate to /'); // Added for debugging
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
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-sm bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 backdrop-blur-sm bg-opacity-80">
        <h2 className="text-3xl font-extrabold mb-4 text-center text-gray-800 tracking-tight">
          Welcome Back
        </h2>
        <p className="text-xl font-semibold mb-6 text-center text-gray-600">
          Sign In to Your Account
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <Field
                  name="email"
                  type="email"
                  className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 text-base shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                  placeholder="test@dev.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 text-base shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                  placeholder="#Test@123"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              {loginError && (
                <div className="text-sm text-red-700 bg-red-100 p-3 rounded-md text-center border border-red-200">
                  {loginError}
                </div>
              )}

              {authToken && (
                <div className="text-sm text-green-700 bg-green-100 p-3 rounded-md text-center border border-green-200">
                  Login Successful! Redirecting...
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || authToken}
                className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out text-lg font-semibold shadow-md
                           disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isSubmitting ? 'Logging in...' : 'Sign In'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
