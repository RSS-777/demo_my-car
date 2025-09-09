const db = require('../config/db');

const Price = {
    getAllPrice: (callback) => {
        const query = 'SELECT * FROM prices';
        db.query(query, (err, result) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        })
    },
    changePrice: async (tariffs, callback) => {
        const query = 'UPDATE prices SET price = ? WHERE tariff = ?';
        try {
            for (const tariff of tariffs) {
                await db.promise().query(query, [tariff.price, tariff.tariff]);
            }
            callback(null, 'Ціни успішно оновлені');
        } catch (err) {
            callback(err);
        }
    }
};

module.exports = Price