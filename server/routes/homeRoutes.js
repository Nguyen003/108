import express from 'express';
import { getStations, getDeviceByStation } from '../controller/homeController.js';

const homeRouter = express.Router();

homeRouter.get('/home/station', getStations);
homeRouter.get('/home/device', getDeviceByStation);

export default homeRouter;