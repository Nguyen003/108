import config from './config-router';

// pages
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Home from '~/pages/Home';
import Location from '~/pages/Location';
import Control from '~/pages/Control';
import Statistics from '~/pages/Statistics';

// Public routers
const publicRoutes = [
    { path: config.login, component: Login },
    { path: config.register, component: Register },
    { path: config.home, component: Home },
    { path: config.location, component: Location },
    { path: config.control, component: Control },
    { path: config.statistics, component: Statistics }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };