import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';
import routesConfig from './routesConfig';

const AppRouter = () => (
  <Router>
    <Routes>
      {routesConfig.map((route, index) => {
        if (route.isPublic) {
          return (
            <Route key={index} element={<PublicRoutes />}>
              <Route path={route.pathname} element={<route.element />} />
            </Route>
          );
        } else if (route.isProtected) {
          return (
            <Route key={index} element={<ProtectedRoutes />}>
              <Route path={route.pathname} element={<route.element />} />
            </Route>
          );
        }
        return null;
      })}
    </Routes>
  </Router>
);

export default AppRouter;
