const db = require('../config/db');

const Notes = {
    createNotes : (userId, carId, text, callback) => {
        const query = 'INSERT INTO notes (user_id, car_id, content_text) VALUES(?, ?, ?)'

        db.query(query, [userId, carId, text], (err, result) => {
            if(err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        })
    },
    updateNotes : (userId, carId, text, callback) => {
        const query = 'UPDATE notes SET content_text = ?  WHERE user_id = ? AND car_id = ?'

        db.query(query, [text, userId, carId], (err, result) => {
            if(err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        })
    },
    getNotes : (userId, carId, callback) => {
        const query = 'SELECT * FROM notes WHERE user_id = ? AND car_id = ?'

        db.query(query, [userId, carId], (err, result) => {
            if(err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        })
    },
    deleteNotes : (userId, carId, callback) => {
        const query = 'DELETE FROM notes WHERE user_id = ? AND car_id = ?';

        db.query(query, [userId, carId], (err, result) => {
            if(err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        })
    }
};

module.exports = Notes;