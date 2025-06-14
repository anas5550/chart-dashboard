import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
  const isAuthenticated = localStorage.getItem('authToken');

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
