const Tariff = require('../models/Tariff');
const logger = require('../utils/logger');

exports.requestTariffChange = async (req, res) => {
    const { tariff, orderCode, paymentMonths, amountDue } = req.body
    const userId = req.user.userId

    Tariff.requestTariffUpdate(userId, tariff, orderCode, paymentMonths, amountDue, (err, result) => {
        if (err) {
            logger.error('Error when requesting a rate change.')
            return res.status(500).json({ message: 'Server error.' })
        }
        if (result.affectedRows === 0) {
            logger.warn('No user found to change the tariff.')
            return res.status(400).json({ message: 'User not found.' })
        }
        return res.status(200).json({ message: 'Rate change request successfully added.' })
    })
};

exports.cancelTariffChangeRequest = async (req, res) => {
    const { orderCode } = req.body
    const userId = req.user.userId

    Tariff.cancelTariffChangeRequest(userId, orderCode, (err, result) => {
        if (err) {
            logger.error('Error while canceling rate change request.')
            return res.status(500).json({ message: 'Server error.' })
        }

        return res.status(200).json({ message: 'The request to change the tariff has been successfully canceled.' })
    })
};

exports.getAllTariffs = async (req, res) => {
    Tariff.getTariffRequest((err, result) => {
        if (err) {
            logger.error('Error while receiving tariff requests.')
            return res.status(500).json({ message: 'Server error.' })
        }

        if (!result || result.length === 0) {
            return res.status(204).json({ message: 'There are no orders.' })
        }

        return res.status(200).json({ data: result });
    });
};