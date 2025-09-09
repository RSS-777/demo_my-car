const db = require('../config/db');

const Orders = {
    changeStatus: (userId, status, startDate, endDate, callback) => {
        let query;
        let params;

        if (status === 'processing') {
            query = 'UPDATE orders SET status = ?, tariff_start_date = null, tariff_end_date = null WHERE user_id = ?'
            params = [status, userId]
        }

        if (status === 'confirmed') {
            query = 'UPDATE orders SET status = ?, tariff_start_date = ?, tariff_end_date = ?  WHERE user_id = ?'
            params = [status, startDate, endDate, userId]
        }

        if (status === 'completed') {
            query = 'UPDATE orders SET status = ? WHERE user_id = ?'
            params = [status, userId]
        }

        db.query(query, params, (err, result) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, result);
            }
        });
    },
    deleteRequest: (userId, orderCode, callback) => {
        const query = 'DELETE FROM orders WHERE user_id = ? AND order_code = ?';
        db.query(query, [userId, orderCode], (err, result) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, result);
            }
        });
    },
};

module.exports = Orders;