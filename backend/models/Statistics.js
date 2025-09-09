const db = require('../config/db');

const Statistics = {
    getStatistics: (callback) => {
        const query = `SELECT * FROM visit_counts ORDER BY visit_date DESC;`;

        db.query(query, (err, result) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, result);
            }
        });
    },
    setStatistics: (callback) => {
        const currentDate = new Date().toISOString().split('T')[0];
    
        const insertQuery = `
            INSERT INTO visit_counts (visit_date, visit_count)
            VALUES (?, 1)
            ON DUPLICATE KEY UPDATE visit_count = visit_count + 1;
        `;
    
        const deleteQuery = `
            DELETE FROM visit_counts
            WHERE visit_date <= CURDATE() - INTERVAL 31 DAY;
        `;
    
        db.query(insertQuery, [currentDate], (err, result) => {
            if (err) {
                return callback(err);
            }

            db.query(deleteQuery, (err, result) => {
                if (err) {
                    return callback(err);
                }

                return callback(null, result);
            });
        });
    }
};

module.exports = Statistics;