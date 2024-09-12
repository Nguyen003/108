import express from 'express';
import {
    getStations,
    getDeviceByStation,
    getDataLuuLuongNuoc,
    getDataMucNuoc,
    getDataTrangThai
} from '../controller/homeController.js';

const homeRouter = express.Router();

homeRouter.get('/home/station', getStations);
homeRouter.get('/home/device', getDeviceByStation);
homeRouter.get('/home/mucnuoc', getDataMucNuoc);
homeRouter.get('/home/luuluongnuoc', getDataLuuLuongNuoc);
homeRouter.get('/home/trangthai', getDataTrangThai);

export default homeRouter;