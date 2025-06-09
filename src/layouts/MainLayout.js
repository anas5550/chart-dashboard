import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="h-16 flex items-center justify-center font-bold text-blue-600 text-xl border-b">
          TechSavvy Dashoard
        </div>
        <nav className="flex-1 p-4 space-y-4 text-gray-700">
          <Link to="/" className="block hover:text-blue-600">
            Home
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
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
