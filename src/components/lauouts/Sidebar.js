import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineDashboard, AiFillDashboard } from 'react-icons/ai';
import { FaCog } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Sidebar = ({ logoSrc, brand_icon }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Mini Sidebar - Always visible */}
      <aside
        className="fixed top-0 left-0 h-screen w-16 bg-white shadow-md z-40 flex flex-col justify-between items-center py-4"
        onMouseEnter={() => setHovered(true)}
      >
        {/* Top Section */}
        <div>
          <div className="h-16 flex items-center justify-center">
            <img
              src={brand_icon}
              alt="Mini Logo"
              className="w-8 h-8 object-contain "
            />
          </div>

          <hr className="my-4 border-gray-200 w-full" />

          <nav className="space-y-6">
            <Link
              to="/"
              className="text-violet-600 hover:text-violet-800 bg-violet-600"
              title="Dashboard"
            >
              <AiFillDashboard size={25} />
            </Link>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="mb-4 space-y-6">
          <Link
            // onClick={() => navigate('/settings')}
            className="text-gray-600 hover:text-gray-800"
            title="Settings"
          >
            <FaCog size={22} />
          </Link>
        </div>
      </aside>

      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50 transition-all duration-300 ease-in-out transform ${
          hovered ? 'translate-x-0' : '-translate-x-full'
        }`}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex flex-col justify-between h-full w-full p-2">
          {/* Top Section */}
          <div>
            <div className="h-16 w-full flex justify-center items-center">
              <img
                src={logoSrc}
                alt="Full Logo"
                className="h-full w-full object-contain "
              />
            </div>

            <hr className="my-4 border-gray-200" />

            <nav>
              <Link
                to="/"
                className={`flex items-center px-4 py-2 text-violet-700 hover:bg-violet-100 transition-colors ${hovered && 'bg-violet-50'}`}
              >
                <AiOutlineDashboard size={22} />
                <span className="ml-3 font-lg">Dashboard</span>
              </Link>
            </nav>
          </div>

          {/* Bottom Section */}
          <div className="p-4">
            <hr className="mb-3 border-gray-200" />
            <button
              onClick={() => navigate('/settings')}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <FaCog size={18} />
              <span className="ml-3 font-medium">Settings</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  logoSrc: PropTypes.string.isRequired,
  brand_icon: PropTypes.string.isRequired,
};

export default Sidebar;
