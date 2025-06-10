import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const authenticateUser = async ({ username, password }) => {
  const FAKE_CREDS = {
    username: 'admin@dev.com',
    password: '123456',
  };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === FAKE_CREDS.username && password === FAKE_CREDS.password) {
        localStorage.setItem('token', 'fake_token');
        resolve(true);
      } else {
        reject('Invalid username or password');
      }
    }, 1000);
  });
};

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().email().required('Username is required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      await authenticateUser(values);
      navigate('/');
    } catch (err) {
      setFieldError('password', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Welcome Back</h2>
        <h2 className="text-xl font-bold mb-6 text-center text-gray-700">Login</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                  Username
                </label>
                <Field
                  name="username"
                  type="text"
                  className="mt-1 w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className="mt-1 w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>
              <div className="flex justify-end items-center">
                <input id="remember-me-checkbox" name="checkbox" type="checkbox" className="mr-1" />
                <label htmlFor="remember-me-checkbox" className="text-sm font-medium capitalize">
                  remember me
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
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
