import config from './config-router';

// pages
import Login from '~/pages/Login';
import Home from '~/pages/Home';

// Public routers
const publicRoutes = [
    { path: config.login, component: Login },
    { path: config.home, component: Home }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };