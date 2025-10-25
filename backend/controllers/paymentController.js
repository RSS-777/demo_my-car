const Payment = require('../models/Payment');
const logger = require('../utils/logger');

exports.getInfoPayment = (req, res) => {
    const { lang } = req.query

    Payment.getInformation(lang, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Помилка сервера.' })
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Даних не існує.' })
        }

        return res.status(200).json({ message: 'Дані успішно отримано.', data: result })
    })
};

exports.setInfoPayment = (req, res) => {
    const { iban, edrpou, payment_purpose, payee_details, is_active, lang } = req.body

    if (!iban || !edrpou || !payment_purpose || !payee_details) {
        return res.status(400).json({ message: 'Всі поля повинні бути заповнені.' })
    }

    Payment.setInformation(iban, edrpou, payment_purpose, payee_details, is_active, lang, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Помилка сервера.' })
        }

        return res.status(200).json({ message: 'Дані успішно оновлено.' })
    })
};

exports.getBlockStatusMessage = (req, res) => {
    Payment.getBlockStatusMessage((err, result) => {
        if (err) {
            logger.error('Помилка при отриманні повідомлення про блокування статусу.')
            return res.status(500).json({ message: 'Помилка сервера.' })
        }
        if (!result || result.length === 0) {
            return res.status(404).json({ message: 'Повідомлення не знайдено.' });
        }

        return res.status(200).json(result[0])
    })
};

exports.updateBlockStatusMessage = (req, res) => {
    const { message_text_ua, message_text_ru, message_text_en } = req.body.data

    if (!message_text_ua || !message_text_ru || !message_text_en) {
        return res.status(400).json({ message: 'Будь ласка, заповніть всі необхідні поля.' })
    }

    Payment.setBlockStatusMessage(message_text_ua, message_text_ru, message_text_en, (err, result) => {
        if (err) {
            logger.error('Помилка при оновленні повідомлення про блокування статусу.')
            return res.status(500).json({ message: 'Помилка сервера.' })
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Запис для оновлення не знайдено.' });
        }

        return res.status(200).json({ message: 'Повідомлення успішно оновлено.' })
    })
};

exports.getPaymentActive = (req, res) => {
    const { lang } = req.query

    if (!lang) {
        return res.status(400).json({ message: 'Мова не вказана в запиті.' });
    }

    Payment.getPaymentActive(lang, (err, result) => {
        if (err) {
            logger.error(`Помилка при отриманні активного статусу оплати для мови ${lang}`)
            return res.status(500).json({ message: 'Помилка сервера при обробці запиту.' })
        }

        return res.status(200).json(result)
    })
};