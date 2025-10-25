require('dotenv').config();
const Admin = require('../models/Admin');
const PasswordService = require('../services/passwordServices');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const logger = require('../utils/logger');

exports.loginAdmin = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Будь ласка, заповніть всі поля.'
        })
    }

    Admin.findAdmin(email, async (err, result) => {
        if (err) {
            logger.error('Помилка сервера при пошуку адміністратора.')
            return res.status(500).json({
                message: 'Помилка сервера при пошуку користувача.'
            })
        }

        if (result.length === 0) {
            logger.warn('Невірні дані для входу у систему.');
            return res.status(401).json({
                message: 'Невірний емейл або пароль.'
            })
        }

        const admin = result[0];
        if (admin.account_locked_until && new Date(admin.account_locked_until) > new Date()) {
            const lockUntil = new Date(admin.account_locked_until)

            return res.status(403).json({
                message: `Ваш обліковий запис заблоковано до ${lockUntil.toLocaleString()}.`
            });
        }

        const isPasswordMatch = await PasswordService.comparePassword(password, admin.password)
        if (!isPasswordMatch) {
            const newFailedAttempts = admin.failed_attempts + 1
            let lockUntil = null

            if (newFailedAttempts >= 3) {
                lockUntil = new Date(Date.now() + 15 * 60 * 1000)
                const lockTime = lockUntil.toLocaleString()
                logger.warn(`Обліковий запис адміністратора заблоковано через підозрілі спроби входу. ${lockTime}`)
            }

            Admin.updateFailedAttempts(email, newFailedAttempts, lockUntil, (err) => {
                if (err) {
                    logger.error('Помилка при оновленні невдалих спроб для адміністратора.')
                }
            });

            return res.status(401).json({
                message: 'Невірний емейл або пароль.'
            })
        }

        Admin.resetFailedAttempts(email, (err) => {
            if (err) {
                logger.error('Помилка при скиданні невдалих спроб для адміністратора')
            }
        });

        const tokenAdmin = jwt.sign({ userId: admin.user_id, role: admin.role }, JWT_SECRET, { expiresIn: '1h' })
        logger.info('Адміністратор успішно увійшов.')
        return res.status(200).json({ tokenAdmin })
    })
};

exports.getUsersList = (req, res) => {
    Admin.listUsers((err, users) => {
        if (err) {
            return res.status(500).json({
                message: 'Помилка при отриманні списку користувачів.',
                error: err
            });
        }

        return res.status(200).json({ users })
    });
};
