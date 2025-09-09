const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
});

const sendMail = async (formData) => {
    const { firstName, lastName, email, userMessage } = formData;

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.SMTP_USER,
        subject: 'letter from the STO_SERVICE',
        text: `
            First Name: ${firstName}
            Last Name: ${lastName}
            Email: ${email}
            Message: ${userMessage}
        `
    }
    await transporter.sendMail(mailOptions)
};

module.exports = { sendMail };