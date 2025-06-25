import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FiUser, FiLogOut } from 'react-icons/fi';
import { BsFullscreen, BsFullscreenExit } from 'react-icons/bs';
import { toggleFullscreen } from '../../utils/toggleFullscreen';
import { Avatar, Text } from '@mantine/core';
import useLogout from '../../hooks/useLogout';

const Navbar = ({ sidebarExpanded }) => {
  const [fullscreen, setFullscreen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const logOut = useLogout();

  useEffect(() => {
    const nameFromStorage = localStorage.getItem('userFullName');
    if (nameFromStorage) {
      setFullName(nameFromStorage);
    } else {
      setFullName('TS');
    }
  }, []);

  const initial = fullName?.charAt(0).toUpperCase() || 'Hello, User';

  return (
    <nav
      className={`fixed top-0 right-0 h-16 bg-white shadow-md z-20 flex items-center justify-between px-4 transition-all duration-300 ${
        sidebarExpanded ? 'ml-64' : 'ml-16'
      } w-[calc(100%-4rem)]`}
    >
      <h3 className="text-md font-bold text-gray-800">Dashboard</h3>

      <div className="flex items-center space-x-4 relative">
        {/* Fullscreen toggle */}
        <button
          onClick={() => toggleFullscreen(setFullscreen)}
          className="text-gray-600 hover:text-violet-600 transition"
          title={fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {fullscreen ? (
            <BsFullscreenExit size={20} />
          ) : (
            <BsFullscreen size={20} />
          )}
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="text-gray-600 hover:text-violet-600 transition"
            title="User Menu"
          >
            <FiUser size={20} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded shadow-lg py-2 text-sm z-50 border border-gray-100">
              <div className="px-4 pb-2">
                <div className="flex items-center space-x-3 py-2">
                  <Avatar
                    radius="xl"
                    color="#2a4dd8"
                    size="md"
                    variant="filled"
                  >
                    {initial}
                  </Avatar>
                  <Text className="font-medium text-gray-800 truncate">
                    {fullName}
                  </Text>
                </div>
                <hr className="border-t border-gray-200 mt-2" />
              </div>

              <button
                onClick={() => logOut()}
                className="w-full flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition"
              >
                <FiLogOut className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  sidebarExpanded: PropTypes.bool.isRequired,
};

export default Navbar;
