import db from "../Dbcontext.js";
import {
    GET_STATUS_BY_UNIT_AND_FIELD,
    GET_DEVICES_BY_STATION,
    GET_DATA_LUU_LUONG_NUOC,
    GET_DATA_TRANG_THAI,
    GET_DATA_MUC_NUOC
} from "../query/homeQuery.js";

export const getStations = async (req, res) => {
    const { unit, field } = req.query;

    try {
        const data = await new Promise((resolve, reject) => {
            db.all(GET_STATUS_BY_UNIT_AND_FIELD, [field, unit], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });

        res.status(200).json(data);
    } catch (err) {
        console.error('getStations_homeController:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getDeviceByStation = async (req, res) => {
    const { stationCode } = req.query;

    try {
        const data = await new Promise((resolve, reject) => {
            db.all(GET_DEVICES_BY_STATION, [stationCode], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });

        res.status(200).json(data);
    } catch (err) {
        console.error('getStations_homeController:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getDataMucNuoc = async (req, res) => {
    const { date } = req.query;

    try {
        const data = await new Promise((resolve, reject) => {
            db.all(GET_DATA_MUC_NUOC, [date], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });

        res.status(200).json(data);
    } catch (err) {
        console.error('getStations_homeController:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getDataLuuLuongNuoc = async (req, res) => {
    const { date } = req.query;

    try {
        const data = await new Promise((resolve, reject) => {
            db.all(GET_DATA_LUU_LUONG_NUOC, [date], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });

        res.status(200).json(data);
    } catch (err) {
        console.error('getStations_homeController:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getDataTrangThai = async (req, res) => {
    const { date } = req.query;
    const startTime = `${date} 00:00:00`;
    const endtTime = `${date} 23:59:59`;

    try {
        const data = await new Promise((resolve, reject) => {
            db.all(GET_DATA_TRANG_THAI, [date, startTime, endtTime], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });

        res.status(200).json(data);
    } catch (err) {
        console.error('getStations_homeController:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}