import express from 'express';
import {
    getAllUnit,
    getAllField,
    getMucNCLuuLuong,
    getDataDeviceUsageByDay
} from '../controller/commonController.js';

const commonRouter = express.Router();

commonRouter.get('/common/unitAll', getAllUnit);
commonRouter.get('/common/fieldAll', getAllField);
commonRouter.get('/common/location', getMucNCLuuLuong);
commonRouter.get('/common/statistics', getDataDeviceUsageByDay);

export default commonRouter;