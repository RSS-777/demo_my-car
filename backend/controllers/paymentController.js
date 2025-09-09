const Payment = require('../models/Payment');
const logger = require('../utils/logger');

exports.getInfoPayment = (req, res) => {
    const { lang } = req.query

    Payment.getInformation(lang, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Server error.' })
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'The data does not exist.' })
        }

        return res.status(200).json({ message: 'Data successfully received.', data: result })
    })
};

exports.setInfoPayment = (req, res) => {
    const { iban, edrpou, payment_purpose, payee_details, is_active, lang } = req.body

    if (!iban || !edrpou || !payment_purpose || !payee_details) {
        return res.status(400).json({ message: 'All fields must be filled in.' })
    }

    Payment.setInformation(iban, edrpou, payment_purpose, payee_details, is_active, lang, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Server error.' })
        }

        return res.status(200).json({ message: 'Data updated successfully.' })
    })
};

exports.getBlockStatusMessage = (req, res) => {
    Payment.getBlockStatusMessage((err, result) => {
        if (err) {
            logger.error('Error receiving status blocking notification.')
            return res.status(500).json({ message: 'Server error.' })
        }
        if (!result || result.length === 0) {
            return res.status(404).json({ message: 'Message not found.' });
        }

        return res.status(200).json(result[0])
    })
};

exports.updateBlockStatusMessage = (req, res) => {
    const { message_text_ua, message_text_ru, message_text_en } = req.body.data

    if (!message_text_ua || !message_text_ru || !message_text_en) {
        return res.status(400).json({ message: 'Please fill in all required fields.' })
    }

    Payment.setBlockStatusMessage(message_text_ua, message_text_ru, message_text_en, (err, result) => {
        if (err) {
            logger.error('Error updating status lock message.')
            return res.status(500).json({ message: 'Server error.' })
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No record found to update.' });
        }

        return res.status(200).json({ message: 'The message was successfully updated.' })
    })
};

exports.getPaymentActive = (req, res) => {
    const { lang } = req.query

    if (!lang) {
        return res.status(400).json({ message: 'The language was not specified in the request.' });
    }

    Payment.getPaymentActive(lang, (err, result) => {
        if (err) {
            logger.error(`Error getting active payment status for language ${lang}`)
            return res.status(500).json({ message: 'Server error while processing the request.' })
        }

        return res.status(200).json(result)
    })
};