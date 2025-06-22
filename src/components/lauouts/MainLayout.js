import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import PropTypes from 'prop-types';
import LOGO from '../../assets/logo.svg';

const Layout = ({ children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar goes from top to bottom */}
      <Sidebar
        logoSrc={LOGO}
        onHoverChange={setSidebarExpanded} // optional if lifting hover
      />

      {/* Navbar shifted right */}
      <Navbar sidebarExpanded={sidebarExpanded} />

      {/* Main content area */}
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarExpanded ? 'ml-64' : 'ml-16'
        } p-4`}
      >
        {children}
      </main>
    </div>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
  sidebarExpanded: PropTypes.any.isRequired,
};

export default Layout;
