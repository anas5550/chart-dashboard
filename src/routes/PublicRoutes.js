import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PublicRoutes = () => {
  const isAuthenticated = localStorage.getItem('authToken');

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoutes;
