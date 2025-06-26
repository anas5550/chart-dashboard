import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AiFillDashboard, AiOutlineDashboard } from 'react-icons/ai';
import { FaCog } from 'react-icons/fa';

const Sidebar = ({ logoSrc, brand_icon }) => {
  const [hovered, setHovered] = useState(false);
  const fullSidebarRef = useRef(null);

  // Close full sidebar when clicking outside (mobile support)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        fullSidebarRef.current &&
        !fullSidebarRef.current.contains(e.target) &&
        window.innerWidth < 640 // Mobile screen condition
      ) {
        setHovered(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <aside
        className="fixed top-0 left-0 h-screen w-16 bg-white shadow-md z-40 flex flex-col justify-between items-center py-4"
        onMouseEnter={() => window.innerWidth >= 640 && setHovered(true)}
      >
        <button
          onClick={() => window.innerWidth < 640 && setHovered(true)}
          className="absolute inset-0 w-full h-full bg-transparent border-none p-0 m-0 cursor-pointer z-10"
          aria-label="Expand Sidebar"
        />

        {/* Top Section */}
        <div className="relative z-20">
          <div className="h-16 flex items-center justify-center pointer-events-none">
            <img
              src={brand_icon}
              alt="Mini Logo"
              className="w-8 h-8 object-contain"
            />
          </div>

          <hr className="my-4 border-gray-200 w-full" />

          <nav className="space-y-6">
            <Link
              to="/"
              className="text-violet-600 hover:text-violet-800 bg-violet-600 transition-colors duration-200"
              title="Dashboard"
            >
              <AiFillDashboard size={25} />
            </Link>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="relative z-20 mb-4 space-y-6">
          <Link
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
            title="Settings"
          >
            <FaCog size={22} />
          </Link>
        </div>
      </aside>

      {/* Full Sidebar */}
      <aside
        ref={fullSidebarRef}
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50 transition-transform duration-300 transform ${
          hovered ? 'translate-x-0' : '-translate-x-full'
        }`}
        onMouseLeave={() => window.innerWidth >= 640 && setHovered(false)}
      >
        <div className="flex flex-col justify-between h-full p-4">
          {/* Top */}
          <div>
            <div className="h-16 w-full flex justify-center items-center">
              <img
                src={logoSrc}
                alt="Full Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <hr className="my-4 border-gray-200" />
            <nav>
              <Link
                to="/"
                className="flex items-center px-4 py-2 text-violet-700 bg-violet-100 hover:bg-violet-200 transition-colors rounded-md"
              >
                <AiOutlineDashboard size={22} />
                <span className="ml-3">Dashboard</span>
              </Link>
            </nav>
          </div>

          {/* Bottom */}
          <div>
            <hr className="mb-3 border-gray-200" />
            <Link
              // to="/settings"
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors rounded-md"
            >
              <FaCog size={18} />
              <span className="ml-3">Settings</span>
            </Link>
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
