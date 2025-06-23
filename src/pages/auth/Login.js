import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useLogin from '../../hooks/useLogin';

const Login = () => {
  const { login, loginError, authToken, isLoading } = useLogin();

  const initialValues = {
    email: '',
    password: '',
    rememberMe: false,
  };
  // const initialValues = {
  //   email: 'test@dev.com',
  //   password: '#Test@123',
  //   rememberMe: false,
  // };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    await login(values, setFieldError);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Sign In to Your Account
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
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
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              <div className="flex items-center text-sm text-gray-700 justify-end">
                <Field
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  className="h-4 w-4 mr-2 text-blue-600"
                />
                <label htmlFor="rememberMe" className="cursor-pointer">
                  Remember me
                </label>
              </div>

              {loginError?.message && (
                <div className="text-sm text-red-700 bg-red-100 p-3 rounded-md text-center border border-red-200">
                  {loginError.message}
                </div>
              )}

              {authToken && (
                <div className="text-sm text-green-700 bg-green-100 border border-green-200 p-2 rounded-md text-center">
                  Login successful! Redirecting...
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || authToken}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-semibold transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Logging in...' : 'Sign In'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
