import db from "../Dbcontext.js";
import { GET_STATUS_BY_UNIT_AND_FIELD, GET_DEVICES_BY_STATION } from "../query/homeQuery.js";

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