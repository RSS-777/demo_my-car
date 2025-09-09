const Cars = require('../models/Cars');
const { deleteOldImage } = require('../utils/fileUtils');
const logger = require('../utils/logger');

exports.createNewCar = async (req, res) => {
    const { vehicleType, brand, model, year, mileage, mileageUnit, carType, fuelType, engineVolume, color, vinNumber, hinNumber, serialNumber, image } = req.body
    const userId = req.user.userId

    if (!vehicleType || !userId) {
        return res.status(400).json({ message: 'The required data is missing.' })
    }

    const vehicleImage = req.file ? `/uploads/${userId}/${req.file.filename}` : null;

    Cars.checkDuplicateCodes(userId, vinNumber, hinNumber, serialNumber, async (err, isDuplicate) => {
        if (isDuplicate) {
            const response = await deleteOldImage(vehicleImage)

            if (!response.ok) {
                logger.error('Unable to delete old image after duplicating codes.', { vehicleImage })
                return res.status(501).json({ message: response.message });
            }

            return res.status(409).json({ message: 'VIN code, HIN code, Serial code are unique, they cannot be repeated.' })
        }

        if (err) {
            logger.error('Error checking the uniqueness of codes.', { error: err })
            return res.status(500).json({ message: 'Error checking the uniqueness of codes.' })
        } else {
            Cars.createCar(userId, vehicleType, brand, model, year, mileage, mileageUnit, carType, fuelType, engineVolume, color, vinNumber, hinNumber, serialNumber, vehicleImage, async (err, result) => {
                if (err) {
                    logger.error('Error creating a new car.')
                    return res.status(500).json({ message: 'Server error.' })
                }

                return res.status(201).json({ message: 'The vehicle has been successfully created.' })
            })
        }
    })
};

exports.getUserCars = async (req, res) => {
    const userId = req.user.userId

    Cars.getCars(userId, (err, result) => {
        if (err) {
            logger.error('Error retrieving user cars.')
            return res.status(500).json({ message: 'Server error.' })
        }

        if (result.length === 0) {
            return res.status(200).json({ message: 'No records found.', data: [] })
        }

        return res.status(200).json({ message: 'Entries received.', data: result })
    })
};

exports.deleteUserCar = async (req, res) => {
    const userId = req.user.userId
    const carId = req.params.carId
    const image = req.query.image;

    if (!carId) {
        return res.status(400).json({ message: 'No vehicle ID was specified for deletion.' });
    }

    Cars.deleteCar(userId, carId, async (err, result) => {
        if (err) {
            logger.error('Error deleting car.', { userId, carId })
            return res.status(500).json({ message: 'Server error.' })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Vehicle not found.' });
        }

        const response = await deleteOldImage(image);

        if (!response.ok) {
            logger.error('Unable to delete old image when deleting car.', { image })
            return res.status(501).json({ message: response.message });
        }

        return res.status(200).json({ message: 'The vehicle has been deleted.' })
    })
};