import express from 'express';
import { getListStation, getDeviceByStation } from '../controller/controlController.js';

const controlRouter = express.Router();

controlRouter.get('/control/station', getListStation);
controlRouter.get('/control/device', getDeviceByStation);

export default controlRouter;