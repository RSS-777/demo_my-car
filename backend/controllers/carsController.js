const Cars = require('../models/Cars');
const { deleteOldImage } = require('../utils/fileUtils');
const logger = require('../utils/logger');

exports.createNewCar = async (req, res) => {
    const { vehicleType, brand, model, year, mileage, mileageUnit, carType, fuelType, engineVolume, color, vinNumber, hinNumber, serialNumber, image } = req.body
    const userId = req.user.userId

    if (!vehicleType || !userId) {
        return res.status(400).json({ message: 'Необхідні дані відсутні.' })
    }

    const vehicleImage = req.file ? `/uploads/${userId}/${req.file.filename}` : null;

    Cars.checkDuplicateCodes(userId, vinNumber, hinNumber, serialNumber, async (err, isDuplicate) => {
        if (isDuplicate) {
            const response = await deleteOldImage(vehicleImage)

            if (!response.ok) {
                logger.error('Не вдалося видалити старе зображення після дублювання кодів.', { vehicleImage })
                return res.status(501).json({ message: response.message });
            }

            return res.status(409).json({ message: 'VIN-код, HIN-код, Serial-код є унікальними, вони не можуть повторюватись.' })
        }

        if (err) {
            logger.error('Помилка перевірки унікальності кодів.', { error: err })
            return res.status(500).json({ message: 'Помилка перевірки унікальності кодів.' })
        } else {
            Cars.createCar(userId, vehicleType, brand, model, year, mileage, mileageUnit, carType, fuelType, engineVolume, color, vinNumber, hinNumber, serialNumber, vehicleImage, async (err, result) => {
                if (err) {
                    logger.error('Помилка при створенні нового автомобіля.')
                    return res.status(500).json({ message: 'Помилка сервера.' })
                }

                return res.status(201).json({ message: 'Транспортний засіб успішно створено.' })
            })
        }
    })
};

exports.getUserCars = async (req, res) => {
    const userId = req.user.userId

    Cars.getCars(userId, (err, result) => {
        if (err) {
            logger.error('Помилка при отриманні автомобілів користувача.')
            return res.status(500).json({ message: 'Помилка сервера.' })
        }

        if (result.length === 0) {
            return res.status(200).json({ message: 'Записів не знайдено.', data: [] })
        }

        return res.status(200).json({ message: 'Записи отримано.', data: result })
    })
};

exports.deleteUserCar = async (req, res) => {
    const userId = req.user.userId
    const carId = req.params.carId
    const image = req.query.image;

    if (!carId) {
        return res.status(400).json({ message: 'Не вказано ID транспортного засобу для видалення.' });
    }

    Cars.deleteCar(userId, carId, async (err, result) => {
        if (err) {
            logger.error('Помилка при видаленні автомобіля.', { userId, carId })
            return res.status(500).json({ message: 'Помилка сервера.' })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Транспортний засіб не знайдено.' });
        }

        const response = await deleteOldImage(image);

        if (!response.ok) {
            logger.error('Не вдалося видалити старе зображення при видаленні автомобіля', { image })
            return res.status(501).json({ message: response.message });
        }

        return res.status(200).json({ message: 'Транспортний засіб видалено.' })
    })
};