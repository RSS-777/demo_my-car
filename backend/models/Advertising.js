const db = require('../config/db');

const Advertising = {
    getAdvertising: (lang, callback) => {
        const queries = {
            ua: 'SELECT advertising_id, title_ua, text_ua, image FROM advertising',
            ru: 'SELECT advertising_id, title_ru, text_ru, image FROM advertising',
            en: 'SELECT advertising_id, title_en, text_en, image FROM advertising'
        };

        const query = queries[lang]

        db.query(query, (err, result) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        })
    },
    getAdvertisingAll: (callback) => {
        const query = 'SELECT * FROM advertising'

        db.query(query, (err, result) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        })
    },
    updateAdvertising: (data, callback) => {
        const query = 'UPDATE advertising SET title_ua = ?, title_ru = ?, title_en = ?, text_ua = ?, text_ru = ?, text_en = ?, image = ? WHERE advertising_id = ?'

        const queries = data.map((elem) => {
            const { advertising_id, image, text_en, text_ru, text_ua, title_en, title_ru, title_ua } = elem

            return new Promise((resolve, reject) => {
                db.query(query, [title_ua, title_ru, title_en, text_ua, text_ru, text_en, image, advertising_id], (err, result) => {
                    if (err) {
                        return reject(err)
                    } else {
                        return resolve(result)
                    }
                })
            })
        })

        Promise.all(queries)
            .then(results => callback(null, results))
            .catch(err => callback(err))
    }
};

module.exports = Advertising;