require('dotenv').config();
const mysql = require('mysql2');
const logger = require('../utils/logger');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
});

db.query('SELECT 1', (error) => {
    if (error) {
        logger.error('Database connection error.')
        return
    }
    
    logger.info('Connected to MySQL database')
});

module.exports = db;