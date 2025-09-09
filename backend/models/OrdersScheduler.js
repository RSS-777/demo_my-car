const db = require('../config/db');

const OrdersScheduler = {
    getUsersWithDates: async () => {
        const query = `
            SELECT 
                users.user_id, 
                orders.tariff_start_date, 
                orders.tariff_end_date, 
                orders.status, 
                orders.tariff_change
            FROM users
            JOIN orders ON users.user_id = orders.user_id
            WHERE orders.tariff_start_date IS NOT NULL 
            AND orders.tariff_end_date IS NOT NULL
        `;

        return new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
    changeTariff: async (userId, tariff) => {
        const query = 'UPDATE users SET tariff = ? WHERE user_id = ?';
        const query2 = `UPDATE orders SET status = 'completed' WHERE user_id = ?`

        return new Promise((resolve, reject) => {
            db.query(query, [tariff, userId], (err, result) => {
                if (err) {
                    reject(err)
                }
                db.query(query2, [userId], (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                })

            })
        })
    },
    cancelTariff: async (userId) => {
        const query = 'UPDATE users SET tariff = "basic" WHERE user_id = ?';
        const query2 = 'DELETE FROM orders WHERE user_id = ?';
    

        const connection = await db.promise().getConnection();
    
        try {
            await connection.beginTransaction(); 
            await connection.query(query, [userId]);
            await connection.query(query2, [userId]);
            await connection.commit();
    
            return 'Тариф успішно скасовано';
        } catch (err) {
        
            await connection.rollback();
        
            throw new Error(`Помилка при скасуванні тарифу: ${err.message}`);
        } finally {
          
            connection.release();
        }
    }
};

module.exports = OrdersScheduler;

