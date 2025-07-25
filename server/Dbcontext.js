import sqlite3 from 'sqlite3';

sqlite3.verbose();

const db = new sqlite3.Database('./database/IOT.db', (err) => {
    if (err) {
        console.error('Error opening database: ', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

export default db;