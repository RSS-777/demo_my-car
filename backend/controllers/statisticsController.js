const Statistics = require('../models/Statistics');
const logger = require('../utils/logger');

exports.getVisitStatistics = (req, res) => {
    Statistics.getStatistics((err, result) => {
        if (err) {
            logger.error('Помилка сервера під час отримання статистики.')
            return res.status(500).json({ message: 'Помилка сервера під час отримання статистики.' });
        }

        return res.status(200).json(result);
    });
};

exports.setVisitStatistics = (req, res) => {
    Statistics.setStatistics((err, result) => {
        if (err) {
            logger.error('Помилка сервера при запису статистики.')
            return res.status(500).json({ message: 'Помилка сервера при запису статистики.' });
        }

        return res.status(200).json({ message: 'Лічильник статистики успішно оновлено.' });
    });
};