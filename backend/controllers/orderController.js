const Orders = require('../models/Order');
const Tariff = require('../models/Tariff');
const logger = require('../utils/logger');

exports.changeStatusOrder = async (req, res) => {
    const { userId, status, startDate, endDate, tariff } = req.body

    if (status === 'completed') {
        Tariff.changeTariff(userId, tariff, (err, result) => {
            if (err) {
                logger.error('Помилка при зміні тарифу при оновленні статусу.', { userId, tariff })
                return res.status(500).json({ message: 'Помилка при зміні тарифу при оновленні статусу.' })
            }

            Orders.changeStatus(userId, status, startDate, endDate, (err, result) => {
                if (err) {
                    logger.error('Помилка при зміні статусу замовлення.', { userId, status})
                    return res.status(500).json({ message: 'Помилка при зміні статусу.' });
                }

                return res.status(200).json({ message: 'Статус успішно змінено.' });
            });
        })
    } else {
        Orders.changeStatus(userId, status, startDate, endDate, (err, result) => {
            if (err) {
                logger.error('Помилка при зміні статусу замовлення.', { userId, status})
                return res.status(500).json({ message: 'Помилка сервера.' })
            }

            return res.status(200).json({ message: 'Статус успішно змінено.' })
        })
    }
};

exports.deleteOrderRequest = async (req, res) => {
    const { userId, orderCode } = req.body;
    const tariff = 'basic'

    Tariff.changeTariff(userId, tariff, (err, result) => {
        if (err) {
            logger.error('Помилка при скасуванні тарифу під час видалення замовлення.', { userId, tariff })
            return res.status(500).json({ message: 'Помилка при скасуванні тарифу під час видалення замовлення.' })
        }

        Orders.deleteRequest(userId, orderCode, (err, result) => {
            if (err) {
                logger.error('Помилка при видаленні замовлення.', { userId, orderCode, error: err })
                return res.status(500).json({ message: 'Помилка сервера.' })
            }

            return res.status(200).json({ message: 'Запит на зміну тарифу успішно скасовано.' });
        });
    });
};