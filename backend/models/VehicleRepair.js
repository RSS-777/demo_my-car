const db = require('../config/db');

const VehicleRepair = {
    createEntry: (carId, mileage, operationName, partName, price, callback) => {
        const query = 'INSERT INTO repair (car_id, mileage, operation_name, part_name, price) VALUES (?, ?, ?, ?, ?)'

        db.query(query, [carId, mileage, operationName, partName, price], (err, result) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        })
    },
    updateEntry: (repairId, mileage, operationName, partName, price, callback) => {
        const query = 'UPDATE repair SET mileage = ?, operation_name = ?, part_name = ?, price = ? WHERE repair_id = ?'

        db.query(query, [mileage, operationName, partName, price, repairId], (err, result) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        })
    },
    deleteEntry: (repairId, callback) => {
        const query = 'DELETE FROM repair WHERE repair_id = ?';

        db.query(query, [repairId], (err, result) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        })
    },
    getEntry: (carId, callback) => {
        const query = 'SELECT * FROM repair WHERE car_id = ?';

        db.query(query, [carId], (err, result) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        })
    }
};

module.exports = VehicleRepair;