const sendMailService = require('../services/emailContactService')
const logger = require('../utils/logger');

exports.sendMessage = async (req, res) => {
    const { firstName, lastName, email, userMessage } = req.body

    try {
        await sendMailService.sendMail({ firstName, lastName, email, userMessage })
        return res.status(200).json({ message: 'Повідомлення успішно відправлено.' })
    } catch (error) {
        logger.error('Помилка при відправленні повідомлення на email.')
        return res.status(500).json({ message: 'Сталася помилка при відправленні.' })
    }
};