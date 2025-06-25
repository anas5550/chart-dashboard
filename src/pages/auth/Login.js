import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useLogin from '../../hooks/useLogin';
import login_background_image from '../../assets/login_background_image.png';
import { Link } from 'react-router-dom';
import LOGO from '../../assets/logo.png';

const Login = () => {
  const { login, loginError, authToken, isLoading } = useLogin();

  const initialValues = {
    email: '',
    password: '',
    rememberMe: false,
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
    await login(values, setFieldError);
    setSubmitting(false);
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex flex-col items-center justify-center px-4"
      style={{ backgroundImage: `url(${login_background_image})` }}
    >
      <img src={LOGO} alt="Logo" className="h-16 mb-6" />

      <div className="w-full max-w-md bg-white bg-opacity-90 p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-6">
          Welcome Back!
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-5">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="test@dev.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-2 focus:ring-violet-500 outline-none"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              {/* Password Field with Forgot */}
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>

                <div className="relative">
                  <Field
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="w-full pr-28 pl-4 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-2 focus:ring-violet-500 outline-none"
                  />
                  <Link
                    // to="/forgot-password"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-red-600 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              {/* Remember Me */}
              <div className="flex items-center text-sm text-gray-700 justify-end">
                <Field
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  className="h-4 w-4 mr-2"
                />
                <label htmlFor="rememberMe" className="cursor-pointer">
                  Remember Me
                </label>
              </div>

              {/* Error & Success Messages */}
              {loginError?.message && (
                <div className="text-sm text-red-700 bg-red-100 border border-red-200 p-2 rounded text-center">
                  {loginError.message}
                </div>
              )}

              {authToken && (
                <div className="text-sm text-green-700 bg-green-100 border border-green-200 p-2 rounded text-center">
                  Login successful! Redirecting...
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || authToken}
                className="w-full bg-[#5932EA] hover:bg-[#5905EA] text-white text-sm font-semibold py-2.5 rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Logging in...' : 'SIGN IN'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
