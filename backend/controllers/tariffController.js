const Tariff = require('../models/Tariff');
const logger = require('../utils/logger');

exports.requestTariffChange = async (req, res) => {
    const { tariff, orderCode, paymentMonths, amountDue } = req.body
    const userId = req.user.userId

    Tariff.requestTariffUpdate(userId, tariff, orderCode, paymentMonths, amountDue, (err, result) => {
        if (err) {
            logger.error('Помилка при запиті на зміну тарифу.')
            return res.status(500).json({ message: 'Помилка сервера.' })
        }
        if (result.affectedRows === 0) {
            logger.warn('Користувача не знайдено для зміни тарифу.')
            return res.status(400).json({ message: 'Користувача не знайдено.' })
        }
        return res.status(200).json({ message: 'Запит на зміну тарифу успішно добавлено.' })
    })
};

exports.cancelTariffChangeRequest = async (req, res) => {
    const { orderCode } = req.body
    const userId = req.user.userId

    Tariff.cancelTariffChangeRequest(userId, orderCode, (err, result) => {
        if (err) {
            logger.error('Помилка при скасуванні запиту на зміну тарифу.')
            return res.status(500).json({ message: 'Помилка сервера.' })
        }

        return res.status(200).json({ message: 'Запит на зміну тарифу успішно відмінено.' })
    })
};

exports.getAllTariffs = async (req, res) => {
    Tariff.getTariffRequest((err, result) => {
        if (err) {
            logger.error('Помилка при отриманні тарифних запитів.')
            return res.status(500).json({ message: 'Помилка сервера.' })
        }

        if (!result || result.length === 0) {
            return res.status(204).json({ message: 'Замовлень немає.' })
        }

        return res.status(200).json({ data: result });
    });
};





