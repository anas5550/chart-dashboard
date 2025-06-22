import Login from '../pages/auth/Login';
import Dashboard from './../pages/Dashboard/Dashboard';
import NotFound from './../pages/NotFound/NotFound';

const routesConfig = [
  {
    routeName: 'Login',
    pathname: '/login',
    element: Login,
    isPublic: true,
    isProtected: false,
  },
  {
    routeName: 'Dashboard',
    pathname: '/',
    element: Dashboard,
    isPublic: false,
    isProtected: true,
  },
  {
    routeName: 'NotFound',
    pathname: '*',
    element: NotFound,
    isPublic: true,
    isProtected: false,
  },
];

export default routesConfig;
