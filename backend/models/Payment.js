const db = require('../config/db')

const Payment = {
    getInformation: (lang, callback) => {
        const query = 'SELECT * FROM payment_details WHERE lang = ?'

        db.query(query, [lang], (err, result) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        })
    },
    setInformation: (iban, edrpou, payment_purpose, payee_details, is_active, lang, callback) => {
        const query = 'UPDATE payment_details SET iban = ?, edrpou = ?, payment_purpose = ?, payee_details = ?, is_active = ? WHERE lang = ?';

        db.query(query, [iban, edrpou, payment_purpose, payee_details, is_active, lang], (err, result) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        })
    },
    getBlockStatusMessage: (callback) => {
        const query = `SELECT * FROM system_messages WHERE message_key = "payment_blocker"`

        db.query(query, (err, result) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        })
    },
    setBlockStatusMessage: (message_text_ua, message_text_ru, message_text_en, callback) => {
        const query = `UPDATE system_messages SET message_text_ua = ?, message_text_ru = ?, message_text_en = ? WHERE message_key = "payment_blocker"`;

        db.query(query, [message_text_ua, message_text_ru, message_text_en], (err, result) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        })
    },
    getPaymentActive: (lang, callback) => {
        const query = 'SELECT is_active FROM payment_details WHERE lang = ?';

        db.query(query, [lang], (err, result) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        })
    },
};

module.exports = Payment;