import express from 'express';
import { getAllUnit, getAllField, getMucNCLuuLuong } from '../controller/commonController.js';

const commonRouter = express.Router();

commonRouter.get('/common/unitAll', getAllUnit);
commonRouter.get('/common/fieldAll', getAllField);
commonRouter.get('/common/location', getMucNCLuuLuong);

export default commonRouter;