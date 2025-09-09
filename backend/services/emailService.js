const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE, 
    auth: {
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASS,
    },
});

const sendEmailWithConfirmationCode = async (email, code) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM, 
        to: email,
        subject: 'Your Confirmation Code',
        text: `Your confirmation code is: ${code}`,
        html: `<p>Your confirmation code is: <strong>${code}</strong></p>`, 
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmailWithConfirmationCode;