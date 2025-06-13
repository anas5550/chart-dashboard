import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4 sm:p-6">
      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl text-center max-w-lg w-full">
        <h1 className="text-6xl sm:text-8xl font-extrabold text-blue-600 mb-6 drop-shadow-md">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
          The Page you are looking does not exist, Please check the URL and try again.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ease-in-out duration-200 transform hover:scale-105"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
