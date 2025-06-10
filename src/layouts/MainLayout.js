import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';
import LOGO from '../assets/logo.svg';
import { CiHome } from 'react-icons/ci';

const MainLayout = ({ children }) => {
  const navigate = useNavigate();

  // fake logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="group w-20 hover:w-64 transition-all duration-300 ease-in-out bg-white shadow-md flex flex-col fixed h-screen z-30">
        <div className="h-16 flex items-center justify-center font-bold text-blue-600 text-xl border-b overflow-hidden">
          <img
            src={LOGO}
            alt="Company Logo"
            className="w-full h-full object-contain group-hover:hidden transition-opacity duration-300 bg-black"
          />
          <span className="hidden group-hover:block group-hover:w-full text-center whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            TechSavvy Dashboard
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-4 text-gray-700">
          <Link to="/" className="flex items-center space-x-3 hover:text-blue-600 group">
            <span className="w-6 h-6 flex items-center justify-center">
              <CiHome className="w-5 h-5" />
            </span>
            <span className="hidden group-hover:block whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Home
            </span>
          </Link>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col ml-20 group-hover:ml-64 transition-all duration-300 ease-in-out">
        <header className="h-16 bg-white shadow flex justify-end items-center px-6">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </header>

        <main className="p-6 overflow-auto flex-1">{children}</main>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
