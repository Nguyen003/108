import moment from 'moment/moment.js'

import db from '../Dbcontext.js'
import { GET_ALL_FIELDS } from '../query/fieldQuery.js'
import { GET_ALL_UNIT } from '../query/unitQuery.js'
import { INSERT_TABLE_DEVICEDATA, GET_MUCNC_LUULUONG } from '../query/commonQueries.js'
import { GET_DATA_DEVICE_USAGE_BY_DAY } from '../query/statisticsQuery.js'

export const getAllUnit = async (req, res) => {
    const { unitCode } = req.query;

    try {
        const data = await new Promise((resolve, reject) => {
            db.all(GET_ALL_UNIT, [unitCode, unitCode, unitCode], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });

        res.status(200).json(data);
    } catch (err) {
        console.error('getAllUnit_commonController:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllField = async (req, res) => {
    try {
        const data = await new Promise((resolve, reject) => {
            db.all(GET_ALL_FIELDS, [], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });

        res.status(200).json(data);
    } catch (err) {
        console.error('getAllField_commonController:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getMucNCLuuLuong = async (req, res) => {
    const currentDate = moment().format('YYYY-MM-DD');

    try {
        const data = await new Promise((resolve, reject) => {
            db.all(GET_MUCNC_LUULUONG, [currentDate], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });

        res.status(200).json(data);
    } catch (err) {
        console.error('getMucNCLuuLuong_commonController:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const insertDeviceData = (data) => {
    const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');

    return new Promise((resolve, reject) => {
        db.run(INSERT_TABLE_DEVICEDATA, [data[0], data[2], data[1], currentDate], (err) => {
            if (err) {
                console.log(err.message);
                reject(err);
                return;
            }
            if (data[0] === '#00000001') {
                // Update D03 với status là 'A', D02 với status là 'S'
                updateDeviceStatus('D03', 'A');
                updateDeviceStatus('D02', 'S');
            } else if (data[0] === '#00000010') {
                // Update D03 với status là 'S', D02 với status là 'A'
                updateDeviceStatus('D03', 'S');
                updateDeviceStatus('D02', 'A');
            }
        })
    });
}

// Hàm để thực hiện thao tác update
const updateDeviceStatus = (deviceID, status) => {
    return new Promise((resolve, reject) => {
        const updateQuery = `UPDATE Devices SET Status = ? WHERE DeviceCode = ?`;
        db.run(updateQuery, [status, deviceID], (err) => {
            if (err) {
                console.log(err.message);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// biểu đồ trang thống kê
export const getDataDeviceUsageByDay = async (req, res) => {
    const { dateStart, dateEnd } = req.query;

    try {
        const data = await new Promise((resolve, reject) => {
            db.all(GET_DATA_DEVICE_USAGE_BY_DAY, [dateStart, dateEnd, dateStart, dateEnd], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });

        res.status(200).json(data);
    } catch (err) {
        console.error('getMucNCLuuLuong_commonController:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}