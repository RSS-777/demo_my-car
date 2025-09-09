const Orders = require('../models/Order');
const Tariff = require('../models/Tariff');
const logger = require('../utils/logger');

exports.changeStatusOrder = async (req, res) => {
    const { userId, status, startDate, endDate, tariff } = req.body

    if (status === 'completed') {
        Tariff.changeTariff(userId, tariff, (err, result) => {
            if (err) {
                logger.error('Error when changing tariff when updating status.', { userId, tariff })
                return res.status(500).json({ message: 'Error when changing tariff when updating status.' })
            }

            Orders.changeStatus(userId, status, startDate, endDate, (err, result) => {
                if (err) {
                    logger.error('Error while changing order status.', { userId, status})
                    return res.status(500).json({ message: 'Error while changing status.' });
                }

                return res.status(200).json({ message: 'Status changed successfully.' });
            });
        })
    } else {
        Orders.changeStatus(userId, status, startDate, endDate, (err, result) => {
            if (err) {
                logger.error('Error while changing order status.', { userId, status})
                return res.status(500).json({ message: 'Server error.' })
            }

            return res.status(200).json({ message: 'Status changed successfully.' })
        })
    }
};

exports.deleteOrderRequest = async (req, res) => {
    const { userId, orderCode } = req.body;
    const tariff = 'basic'

    Tariff.changeTariff(userId, tariff, (err, result) => {
        if (err) {
            logger.error('Error canceling rate while deleting order.', { userId, tariff })
            return res.status(500).json({ message: 'Error canceling rate while deleting order.' })
        }

        Orders.deleteRequest(userId, orderCode, (err, result) => {
            if (err) {
                logger.error('Error deleting order.', { userId, orderCode, error: err })
                return res.status(500).json({ message: 'Server error.' })
            }

            return res.status(200).json({ message: 'The rate change request has been successfully canceled.' });
        });
    });
};