import express from 'express';
import { getAllUnit, getAllField } from '../controller/commonController.js';

const commonRouter = express.Router();

commonRouter.get('/common/unitAll', getAllUnit);
commonRouter.get('/common/fieldAll', getAllField);

export default commonRouter;