const VehicleRepair = require('../models/VehicleRepair');
const logger = require('../utils/logger');

exports.createVehicleRepair = (req, res) => {
    const { carId, mileage, operationName, partName, price } = req.body

    if (!carId || !mileage || !operationName || !partName || !price) {
        return res.status(400).json({ message: 'Required data is missing.' })
    }

    VehicleRepair.createEntry(carId, mileage, operationName, partName, price, (err, result) => {
        if (err) {
            logger.error('Error creating repair record.')
            return res.status(500).json({ message: 'Server error.' })
        }

        return res.status(201).json({ message: 'The entry was successfully created.' })
    })
};

exports.updateVehicleRepair = (req, res) => {
    const { repairId, mileage, operationName, partName, price } = req.body
      
    if (!repairId || !mileage || !operationName || !partName || !price) {
        return res.status(400).json({ message: 'Required data is missing.' })
    }

    VehicleRepair.updateEntry(repairId, mileage, operationName, partName, price, (err, result) => {
        if (err) {
            logger.error('Error updating repair record.')
            return res.status(500).json({ message: 'Server error.' })
        }

        return res.status(200).json({ message: 'The record was successfully updated.' })
    })
};

exports.deleteVehicleRepair = (req, res) => {
    const repairId = req.params.repairId

    if (!repairId) {
        return res.status(400).json({ message: 'No record ID was specified for deletion.' })
    }

    VehicleRepair.deleteEntry(repairId, (err, result) => {
        if (err) {
            logger.error('Error deleting repair record.')
            return res.status(500).json({ message: 'Server error.' })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Record not found.' })
        }

        return res.status(200).json({ message: 'The entry was successfully deleted.' })
    })
};

exports.getVehicleRepair = (req, res) => {
    const carId = req.params.carId;

    if (!carId) {
        return res.status(400).json({ message: 'No vehicle ID specified.' })
    }

    VehicleRepair.getEntry(carId, (err, result) => {
        if (err) {
            logger.error('Error retrieving repair records for vehicle.')
            return res.status(500).json({ message: 'Server error.' })
        }

        if (result.length === 0) {
            return res.status(200).json({ data: []})
        }

        return res.status(200).json({ data: result })
    })
};