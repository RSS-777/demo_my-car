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
            message: 'Please fill in all fields.'
        })
    }

    Admin.findAdmin(email, async (err, result) => {
        if (err) {
            logger.error('Server error while searching for administrator.')
            return res.status(500).json({
                message: 'Server error while searching for user.'
            })
        }

        if (result.length === 0) {
            logger.warn('Invalid login details.');
            return res.status(401).json({
                message: 'Incorrect email or password.'
            })
        }

        const admin = result[0];
        if (admin.account_locked_until && new Date(admin.account_locked_until) > new Date()) {
            const lockUntil = new Date(admin.account_locked_until)

            return res.status(403).json({
                message: `Your account has been blocked until: ${lockUntil.toLocaleString()}.`
            });
        }

        const isPasswordMatch = await PasswordService.comparePassword(password, admin.password)
        if (!isPasswordMatch) {
            const newFailedAttempts = admin.failed_attempts + 1
            let lockUntil = null

            if (newFailedAttempts >= 3) {
                lockUntil = new Date(Date.now() + 15 * 60 * 1000)
                const lockTime = lockUntil.toLocaleString()
                logger.warn(`The administrator account has been locked due to suspicious login attempts. ${lockTime}`)
            }

            Admin.updateFailedAttempts(email, newFailedAttempts, lockUntil, (err) => {
                if (err) {
                    logger.error('Error updating failed attempts for administrator.')
                }
            });

            return res.status(401).json({
                message: 'Incorrect email or password.'
            })
        }

        Admin.resetFailedAttempts(email, (err) => {
            if (err) {
                logger.error('Error resetting failed attempts for administrator.')
            }
        });

        const tokenAdmin = jwt.sign({ userId: admin.user_id, role: admin.role }, JWT_SECRET, { expiresIn: '1h' })
        logger.info('The administrator has successfully logged in.')
        return res.status(200).json({ tokenAdmin })
    })
};

exports.getUsersList = (req, res) => {
    Admin.listUsers((err, users) => {
        if (err) {
            return res.status(500).json({
                message: 'Error retrieving user list.',
                error: err
            });
        }

        return res.status(200).json({ users })
    });
};
