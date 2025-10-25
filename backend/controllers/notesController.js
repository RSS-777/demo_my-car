const Notes = require('../models/Notes')
const logger = require('../utils/logger');

exports.createCarNotes = (req, res) => {
    const { text, carId } = req.body
    const userId = req.user.userId

    if (!userId) {
        return res.status(400).json({ message: 'Id користувача відсутній або недійсний.' })
    }

    if (!text || text.trim() === '') {
        return res.status(422).json({ error: 'Поле не може бути порожнім.' })
    }

    Notes.createNotes(userId, carId, text, (err, result) => {
        if (err) {
            logger.error('Помилка при створенні запису "нотатка для авто".')
            return res.status(500).json({ message: 'Помилка сервера.' })
        }

        return res.status(201).json({ message: 'Запис успішно створено.' })
    })
};

exports.getCarNotes = (req, res) => {
    const { carId } = req.query
    const userId = req.user.userId

    if (!userId) {
        return res.status(400).json({ message: 'Id користувача відсутній або недійсний.' })
    }

    Notes.getNotes(userId, carId, (err, result) => {
        if (err) {
            logger.error('Помилка при отриманні записів "нотаток для авто".')
            return res.status(500).json({ message: 'Помилка сервера.' })
        }

        if (result.length === 0) {
            return res.status(200).json([]);
        }

        return res.status(200).json(result)
    })
};

exports.updateCarNotes = (req, res) => {
    const { text, carId } = req.body
    const userId = req.user.userId

    if (!userId) {
        return res.status(400).json({ message: 'Id користувача відсутній або недійсний.' })
    }

    if (!text || text.trim() === '') {
        return res.status(422).json({ error: 'Поле не може бути порожнім.' })
    }

    if (text.length > 350) {
        return res.status(422).json({ message: 'Текст примітки не може перевищувати 350 символів.' })
    }

    Notes.updateNotes(userId, carId, text, (err, result) => {
        if (err) {
            logger.error('Помилка при оновленні запису. "нотатки"')
            return res.status(500).json({ message: 'Помилка сервера.' })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Запис не знайдено або не було змінено.' })
        }

        return res.status(200).json({ message: 'Запис успішно оновлено.' })
    })
};

exports.deleteCarNotes = (req, res) => {
    const { carId } = req.body
    const userId = req.user.userId

    if (!userId) {
        return res.status(400).json({ message: 'Id користувача відсутній або недійсний.' })
    }

    Notes.deleteNotes(userId, carId, (err, result) => {
        if (err) {
            logger.error('Помилка при видаленні запису "нотатки"')
            return res.status(500).json({ message: 'Помилка сервера.' })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Запис не знайдений або вже видалено.' })
        }

        return res.status(200).json({ message: 'Запис успішно видалено.' })
    })
};