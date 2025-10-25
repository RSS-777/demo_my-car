const VehicleRepair = require('../models/VehicleRepair');
const logger = require('../utils/logger');

exports.createVehicleRepair = (req, res) => {
    const { carId, mileage, operationName, partName, price } = req.body

    if (!carId || !mileage || !operationName || !partName || !price) {
        return res.status(400).json({ message: 'Необхідні дані відсутні.' })
    }

    VehicleRepair.createEntry(carId, mileage, operationName, partName, price, (err, result) => {
        if (err) {
            logger.error('Помилка при створенні запису ремонту.')
            return res.status(500).json({ message: 'Помилка сервера.' })
        }

        return res.status(201).json({ message: 'Запис успішно створено.' })
    })
};

exports.updateVehicleRepair = (req, res) => {
    const { repairId, mileage, operationName, partName, price } = req.body
      
    if (!repairId || !mileage || !operationName || !partName || !price) {
        return res.status(400).json({ message: 'Необхідні дані відсутні.' })
    }

    VehicleRepair.updateEntry(repairId, mileage, operationName, partName, price, (err, result) => {
        if (err) {
            logger.error('Помилка при оновленні запису ремонту.')
            return res.status(500).json({ message: 'Помилка сервера.' })
        }

        return res.status(200).json({ message: 'Запис успішно оновлено.' })
    })
};

exports.deleteVehicleRepair = (req, res) => {
    const repairId = req.params.repairId

    if (!repairId) {
        return res.status(400).json({ message: 'Не вказано ID запису для видалення.' })
    }

    VehicleRepair.deleteEntry(repairId, (err, result) => {
        if (err) {
            logger.error('Помилка при видаленні запису ремонту.')
            return res.status(500).json({ message: 'Помилка сервера.' })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Запис не знайдено.' })
        }

        return res.status(200).json({ message: 'Запис успішно видалено.' })
    })
};

exports.getVehicleRepair = (req, res) => {
    const carId = req.params.carId;

    if (!carId) {
        return res.status(400).json({ message: 'Не вказано ID транспортного засобу.' })
    }

    VehicleRepair.getEntry(carId, (err, result) => {
        if (err) {
            logger.error('Помилка при отриманні записів ремонту для транспортного засобу.')
            return res.status(500).json({ message: 'Помилка сервера.' })
        }

        if (result.length === 0) {
            return res.status(200).json({ data: []})
        }

        return res.status(200).json({ data: result })
    })
};