import React, { useState } from 'react';
import { Button } from '@mantine/core';
import { AiOutlineDashboard, AiFillDashboard } from 'react-icons/ai';
import { FaCog } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ logoSrc }) => {
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [dashboardHover, setDashboardHover] = useState(false);
  const [settingsHover, setSettingsHover] = useState(false);

  const navigate = useNavigate();

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-screen bg-white shadow-md flex flex-col justify-between transition-all duration-300
        ${sidebarHovered ? 'w-64' : 'w-16'}
      `}
      onMouseEnter={() => setSidebarHovered(true)}
      onMouseLeave={() => setSidebarHovered(false)}
    >
      {/* Top Section */}
      <div className="p-4">
        {/* Logo */}
        <div className="w-full h-16 flex items-center justify-center overflow-hidden">
          {sidebarHovered ? (
            <img
              src={logoSrc}
              alt="Logo"
              className="w-full h-full object-cover rounded bg-black"
            />
          ) : (
            <span className="text-xl font-bold text-violet-600">TS</span>
          )}
        </div>

        {/* Divider */}
        <hr className="my-4 border-gray-200" />

        {/* Dashboard Button */}
        <div
          onMouseEnter={() => setDashboardHover(true)}
          onMouseLeave={() => setDashboardHover(false)}
        >
          <Button
            fullWidth
            component={Link}
            to="/"
            leftSection={
              dashboardHover ? (
                <AiFillDashboard size={20} />
              ) : (
                <AiOutlineDashboard size={20} />
              )
            }
            color="violet"
            variant="light"
            className="justify-start"
            styles={{
              root: {
                paddingLeft: '1rem',
                paddingRight: '1rem',
                height: '40px',
                fontSize: sidebarHovered ? '14px' : '0px',
                transition: 'all 0.3s',
              },
              section: {
                marginRight: sidebarHovered ? '10px' : '0px',
              },
            }}
          >
            {sidebarHovered && 'Dashboard'}
          </Button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-4">
        <hr className="mb-4 border-gray-200" />

        <div
          onMouseEnter={() => setSettingsHover(true)}
          onMouseLeave={() => setSettingsHover(false)}
        >
          <Button
            fullWidth
            leftSection={
              <FaCog
                size={18}
                className={`${
                  settingsHover
                    ? 'rotate-90 transition-transform duration-300'
                    : ''
                }`}
              />
            }
            variant="subtle"
            color="gray"
            className="justify-start"
            styles={{
              root: {
                paddingLeft: sidebarHovered ? '1rem' : '0.5rem',
                fontSize: sidebarHovered ? '14px' : '0px',
                height: '38px',
                transition: 'all 0.3s',
              },
              section: {
                marginRight: sidebarHovered ? '10px' : '0px',
              },
            }}
          >
            {sidebarHovered && 'Settings'}
          </Button>
        </div>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  logoSrc: PropTypes.string.isRequired,
};

export default Sidebar;
