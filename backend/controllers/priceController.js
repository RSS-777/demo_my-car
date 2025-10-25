const Price = require('../models/Price');
const logger = require('../utils/logger');

exports.gettingPrice = (req, res) => {
    Price.getAllPrice((err, result) => {
        if (err) {
            logger.error('Помилка при отриманні всіх тарифів.')
            return res.status(500).json({ message: 'Помилка сервера.' })
        } else {
            return res.status(200).json({
                message: 'Дані успішно отримані.',
                data: result
            })
        }
    })
};

exports.changePrice = (req, res) => {
    const tariffs = req.body

    if(!Array.isArray(tariffs) || tariffs.length === 0) {
        return res.status(422).json({message: 'Немає тарифів для оновлення.'})
    }

    const invalidTariff = tariffs.find(tariff => tariff.price === undefined)
    if (invalidTariff) {
        return res.status(400).json({ message: 'Ціна повинна бути вказана.' })
    }

    Price.changePrice(tariffs, (err, result) => {
        if (err) {
            logger.error('Помилка при зміні тарифів.')
            return res.status(500).json({ message: 'Помилка сервера.' })
        }  

        return res.status(200).json({ message: 'Ціну успішно змінено.' })
    })
};
