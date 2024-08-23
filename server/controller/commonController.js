import db from '../Dbcontext.js'
import { GET_ALL_FIELDS } from '../query/fieldQuery.js'
import { GET_ALL_UNIT } from '../query/unitQuery.js'

export const getAllUnit = async (req, res) => {
    try {
        const data = await new Promise((resolve, reject) => {
            db.all(GET_ALL_UNIT, [], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });

        res.status(200).json(data);
    } catch (err) {
        console.error('getAllUnit_commonController:', error);
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