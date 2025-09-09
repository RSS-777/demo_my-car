require('dotenv').config();
const logger = require('../utils/logger');
const { deleteOldImage } = require('../utils/fileUtils');
const User = require('../models/User');
const PasswordService = require('../services/passwordServices');
const sendEmailWithConfirmationCode = require('../services/emailService');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const deleteUserImages = require('../utils/deleteUserImages');

const confirmationCodes = {};

exports.sendConfirmationCode = async (req, res) => {
    const { email } = req.body

    User.findEmail(email, async (err, result) => {
        if (err) {
            logger.error(`Error finding user to send confirmation code to.`)
            return res.status(500).json({ message: 'Server error while searching for user.' })
        }

        const user = result[0]
        const code = Math.floor(100000 + Math.random() * 900000).toString()

        if (!user) {
            confirmationCodes[email] = code
            try {
                await sendEmailWithConfirmationCode(email, code)
                return res.status(200).json({ message: 'Verification code sent.' })
            } catch (err) {
                logger.error(`Failed to send verification code.`)
                return res.status(500).json({ message: 'Failed to send verification code.' })
            }
        } else {
            return res.status(400).json({ message: 'The user is already registered.' })
        }
    })
};

exports.validateConfirmationCode = async (req, res) => {
    const { email, confirmationCode } = req.body

    if (!confirmationCodes[email]) {
        return res.status(404).json({ message: 'The code was sent to the wrong email address.' })
    }
    if (confirmationCodes[email] === confirmationCode) {
        delete confirmationCodes[email]
        return res.status(200).json({ message: 'You have successfully verified your email.' })
    } else {
        return res.status(403).json({ message: 'Invalid confirmation code.' })
    }
};

exports.registrationUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            message: 'Please fill in all fields.'
        })
    }
    try {
        User.findEmail(email, async (err, result) => {
            if (err) {
                logger.error(`Error searching for user during registration.`)
                return res.status(500).json({
                    message: 'Internal server error while retrieving email. Please try again later.'
                })
            }

            if (result.length > 0) {
                return res.status(409).json({
                    message: 'A user with this email already exists.'
                })
            }

            const hashedPassword = await PasswordService.hashPassword(password)

            User.create(firstName, lastName, email, hashedPassword, (err, result) => {
                if (err) {
                    logger.error(`Error creating user.`)
                    return res.status(500).json({
                        message: 'Internal server error while creating user. Please try again later.'
                    })
                } else {
                    return res.status(201).json({
                        message: 'The user has been successfully registered.',
                        data: { firstName }
                    })
                }
            })
        })
    } catch (err) {
        logger.error(`General error during user registration.`)
        return res.status(500).json({
            message: 'Internal server error. Please try again later.'
        })
    }
};

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Please fill in all fields.'
        });
    }

    User.checkLockStatus(email, async (err, data) => {
        if (err) {
            logger.error(`Error checking user lock status.`)
            return res.status(500).json({
                message: 'Server error while checking user status.'
            });
        }

        if (!data.userExists) {
            return res.status(401).json({
                message: 'Incorrect email or password.'
            });
        }

        const user = data.user;

        if (user.account_locked_until && new Date(user.account_locked_until) > new Date()) {
            return res.status(403).json({
                message: `Your account has been blocked until ${user.account_locked_until}.`
            });
        }

        const isPasswordMatch = await PasswordService.comparePassword(password, user.password);
        if (!isPasswordMatch) {
            const newFailedAttempts = user.failed_attempts + 1;
            let lockUntil = null

            if (newFailedAttempts >= 3) { 
                lockUntil = new Date(Date.now() + 15 * 60 * 1000) 
            }

            User.updateFailedAttempts(user.user_id, newFailedAttempts, lockUntil, (err) => {
                if (err) {
                    logger.error(`Error updating failed attempts for user.`)
                }
            });

            const message = lockUntil
                ? `Your account has been blocked until ${lockUntil}.`
                : 'Incorrect email or password.';

            return res.status(401).json({ message })
        }

        User.resetFailedAttempts(user.user_id, (err) => {
            if (err) {
                logger.error(`Error resetting failed attempts for the user.`)
            }
        });

        const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: '1h' })
        const tariff = user.tariff
        return res.status(200).json({ message: 'Login successful.', token, tariff })
    });
};

exports.deleteUser = (req, res) => {
    const { password } = req.body
    const userId = req.user.userId

    if (!userId) {
        return res.status(400).json({ message: 'The user is not specified for deletion.' })
    }

    User.findById(userId, async (err, user) => {
        if (err) {
            logger.error(`Error finding user to delete.`)
            return res.status(500).json({ message: 'Server error while searching for user.' })
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found during existence check.' })
        }

        const isPasswordMatch = await PasswordService.comparePassword(password, user.password)

        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'The password is incorrect.' })
        } else {
            User.deleteUser(userId, async (err, result) => {
                if (err) {
                    logger.error(`Error deleting user.`)
                    return res.status(500).json({
                        message: 'A server error occurred while deleting the user.',
                        error: err.message
                    })
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({
                        message: 'User not found when attempting to delete.'
                    })
                }
                try {
                    const deleteImagesMessage = await deleteUserImages(userId)

                    res.status(200).json({
                        message: 'User successfully deleted' + deleteImagesMessage
                    })
                } catch (error) {
                    return res.status(200).json({
                        message: 'The user was successfully deleted, but the image could not be deleted.'
                    })
                }
            })
        }
    });
};

exports.getUserData = (req, res) => {
    const userId = req.user.userId

    User.findById(userId, (err, result) => {
        if (err) {
            logger.error(`Error retrieving data for deletion from user.`)
            return res.status(500).json({
                message: 'Server error.'
            })
        }

        if (!result) {
            return res.status(404).json({
                message: 'User not found.'
            })
        }

        const { user_id, first_name, last_name, email, person_image, tariff, tariff_change, order_code, amount_due, payment_months, status, tariff_start_date, tariff_end_date } = result
        return res.status(200).json({ user_id, first_name, last_name, email, person_image, tariff, tariff_change, order_code, amount_due, payment_months, status, tariff_start_date, tariff_end_date })
    })
};

exports.getUserTariff = (req, res) => {
    const userId = req.user.userId

    User.findById(userId, (err, result) => {
        if (err) {
            logger.error(`Error while retrieving user rate.`)
            return res.status(500).json({ message: 'Server error.' })
        }

        if (!result) {
            return res.status(404).json({
                message: 'User not found.'
            })
        }

        const { tariff } = result
        return res.status(200).json({ tariff })
    })
};

exports.changeProfile = async (req, res) => {
    const { firstName, lastName, existingImagePath } = req.body
    const userId = req.user.userId

    if (!firstName || !lastName) {
        return res.status(400).json({ message: 'Required fields are not filled in.' })
    }

    const personImage = req.file ? `/uploads/${userId}/${req.file.filename}` : existingImagePath || null

    if (personImage && existingImagePath && personImage !== existingImagePath) {
        const response = await deleteOldImage(existingImagePath);
        if (!response.ok) {
            return res.status(501).json({ message: response.message })
        }
    }

    User.changeProfile(userId, firstName, lastName, personImage, (err, result) => {
        if (err) {
            logger.error(`Error while changing user profile.`)
            return res.status(500).json({ message: 'Server error.' })
        } else if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found.' })
        } else {
            return res.status(200).json({ message: 'Data updated successfully.' })
        }
    })
};

exports.changePassword = async (req, res) => {
    const { passwordCurrent, passwordNew, passwordConfirm } = req.body
    const userId = req.user.userId

    if (passwordNew !== passwordConfirm) {
        return res.status(409).json({
            message: 'The new password and confirmation do not match.'
        });
    }

    User.findById(userId, async (err, user) => {
        if (err) {
            logger.error(`Password verification error while changing user password.`)
            return res.status(500).json({ message: 'Server error.' })
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found.' })
        }

        const isPasswordMatch = await PasswordService.comparePassword(passwordCurrent, user.password)

        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'The current password is incorrect.' })
        }

        const hashedPassword = await PasswordService.hashPassword(passwordNew)

        User.changePassword(userId, hashedPassword, (err, result) => {
            if (err) {
                logger.error(`Error while changing user password.`)
                return res.status(500).json({ message: 'Server error when changing password.' })
            }

            return res.status(200).json({ message: 'Password successfully changed.' })
        });
    });
};