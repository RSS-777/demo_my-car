const sendMailService = require('../services/emailContactService')
const logger = require('../utils/logger');

exports.sendMessage = async (req, res) => {
    const { firstName, lastName, email, userMessage } = req.body

    try {
        await sendMailService.sendMail({ firstName, lastName, email, userMessage })
        return res.status(200).json({ message: 'The message was sent successfully.' })
    } catch (error) {
        logger.error('Error sending email message.')
        return res.status(500).json({ message: 'An error occurred while sending.' })
    }
};