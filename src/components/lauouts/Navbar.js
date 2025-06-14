import React from 'react';
import PropTypes from 'prop-types';

import useLogout from './../../hooks/useLogout';

const Navbar = () => {
  const logOut = useLogout();
  return (
    <header className="h-16 bg-white shadow-sm flex justify-end items-center px-4 sm:px-6 md:px-8 border-b border-gray-200">
      <button
        onClick={() => logOut()}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200 text-sm font-medium shadow-md
                   focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Logout
      </button>
    </header>
  );
};

Navbar.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
