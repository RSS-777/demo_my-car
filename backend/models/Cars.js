const db = require('../config/db');

const Cars = {
    createCar: (userId, vehicleType, brand, model, year, mileage, mileageUnit, carType, fuelType, engineVolume, color, vinNumber, hinNumber, serialNumber, vehicleImage, callback) => {
        const query = `
        INSERT INTO cars (
            user_id,
            vehicle_type,
            brand,
            model,
            year,
            mileage,
            mileage_unit,
            car_type,
            fuel_type,
            engine_volume,
            color,
            vin_number,
            hin_number,
            serial_number,
            image
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
        db.query(query, [userId, vehicleType, brand, model, year, mileage, mileageUnit, carType, fuelType, engineVolume, color, vinNumber, hinNumber, serialNumber, vehicleImage], (err, result) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        })
    },
    getCars: (userId, callback) => {
        const query = 'SELECT * FROM cars WHERE user_id = ?'

        db.query(query, [userId], (err, result) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        })
    },
    deleteCar: (userId, carId, callback) => {
        const query = 'DELETE FROM cars WHERE user_id = ? AND car_id = ?'

        db.query(query, [userId, carId], (err, result) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        })
    },
    checkDuplicateCodes: (userId, vinNumber, hinNumber, serialNumber, callback) => {
        const query = `
        SELECT COUNT(*) AS count 
        FROM cars 
        WHERE (vin_number = ? OR hin_number = ? OR serial_number = ?) AND user_id = ?
    `
        db.query(query, [vinNumber, hinNumber, serialNumber, userId], (err, result) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, result[0].count > 0)
            }
        })
    }
};

module.exports = Cars;