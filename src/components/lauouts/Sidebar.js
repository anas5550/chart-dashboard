import React from 'react';
import { Link } from 'react-router-dom';
import { CiHome } from 'react-icons/ci';
import PropTypes from 'prop-types';
import LOGO from '../../assets/logo.svg';

const Sidebar = ({ logoSrc }) => {
  return (
    <aside className="group w-20 hover:w-64 transition-all duration-300 ease-in-out bg-white shadow-md flex flex-col fixed h-screen z-30 overflow-hidden">
      <div className="h-16 flex items-center justify-center font-bold text-blue-600 text-xl border-b overflow-hidden">
        <img
          src={logoSrc}
          alt="Company Logo"
          className="w-full h-full object-contain group-hover:hidden transition-opacity duration-300 bg-black"
        />
        <span className="hidden group-hover:flex items-center justify-center w-full text-center whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-800 text-2xl font-semibold">
          TechSavvy
        </span>
      </div>

      <nav className="flex-1 p-4 space-y-4 text-gray-700">
        <Link
          to="/"
          className="flex items-center space-x-3 p-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200 group"
        >
          <span className="w-6 h-6 flex items-center justify-center text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
            <CiHome className="w-5 h-5" />
          </span>
          <span className="hidden group-hover:block whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
            Home
          </span>
        </Link>
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  logoSrc: PropTypes.string.isRequired,
};

export default Sidebar;
