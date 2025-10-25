const Advertising = require('../models/Advertising');

exports.getAdvertising = (req, res) => {
    const lang = req.params.lang;

    if (!lang) {
        return res.status(400).json({ message: 'Невідома або відсутня мова.' })
    };

    Advertising.getAdvertising(lang, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Виникла помилка на сервері.' })
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Не знайдено записів для цієї мови.' })
        }

        return res.status(200).json(result)
    })
};

exports.getAdvertisingAll = (req, res) => {

    Advertising.getAdvertisingAll((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Виникла помилка на сервері.' })
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Не знайдено записів.' })
        }

        return res.status(200).json(result)
    })
};

exports.updateAdvertising = (req, res) => {
    const data = req.body

    if(!Array.isArray(data)) {
        return res.status(400).json({ message: 'Дані для оновлення мають некоректний формат.'}) 
    }

    Advertising.updateAdvertising(data, (err, result) => {
        if(err) {
            return res.status(500).json({message: 'Помилка сервера.'})
        } 

        return res.status(200).json({message: 'Дані успішно оновлено.'})
    })
};