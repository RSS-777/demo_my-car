const db = require('../config/db');

const Admin = {
    findAdmin: (email, callback) => {
        const query = `SELECT * FROM users WHERE email = ? AND role = "admin"`

        db.query(query, [email], (err, result) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        })
    },
    updateFailedAttempts: (email, failedAttempts, lockUntil, callback) => {
        const query = `
            UPDATE users 
            SET failed_attempts = ?, account_locked_until = ? 
            WHERE email = ? AND role = "admin"`;

        db.query(query, [failedAttempts, lockUntil, email], (err, result) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        });
    },
    resetFailedAttempts: (email, callback) => {
        const query = `
            UPDATE users 
            SET failed_attempts = 0, account_locked_until = NULL 
            WHERE email = ? AND role = "admin"`;

        db.query(query, [email], (err, result) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        });
    },
    listUsers: (callback) => {
        const query = `
            SELECT 
                users.user_id, 
                users.email, 
                users.tariff, 
                orders.tariff_start_date, 
                orders.tariff_end_date
            FROM users
            LEFT JOIN orders ON users.user_id = orders.user_id AND orders.status = 'completed'
        `
        db.query(query, (err, result) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        })
    }
};

module.exports = Admin;