import config from './config-router';

// pages
import Login from '~/pages/Login';
import Home from '~/pages/Home';
import Location from '~/pages/Location';

// Public routers
const publicRoutes = [
    { path: config.login, component: Login },
    { path: config.home, component: Home },
    { path: config.location, component: Location }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };