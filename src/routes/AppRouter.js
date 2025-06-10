import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';
import Home from '../pages/Home';
import Login from '../features/Auth/Login';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';

const AppRouter = () => (
  <Router>
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Dashboard />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRouter;
