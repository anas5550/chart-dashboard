import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import LOGO from '../../assets/logo.svg';

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100 font-inter">
      {' '}
      {/* Sidebar Component */}
      <Sidebar logoSrc={LOGO} />
      <div className="flex-1 flex flex-col ml-20 group-hover:ml-64 transition-all duration-300 ease-in-out">
        {/* Navbar Component */}
        <Navbar />

        {/* Main Content */}
        <main className="p-4 sm:p-6 lg:p-8 overflow-auto flex-1 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
