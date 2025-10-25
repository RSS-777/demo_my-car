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
            logger.error(`Помилка при пошуку користувача для відправки коду підтвердження.`)
            return res.status(500).json({ message: 'Помилка сервера при пошуку користувача.' })
        }

        const user = result[0]
        const code = Math.floor(100000 + Math.random() * 900000).toString()

        if (!user) {
            confirmationCodes[email] = code
            try {
                await sendEmailWithConfirmationCode(email, code)
                return res.status(200).json({ message: 'Код підтвердження надіслано.' })
            } catch (err) {
                logger.error(`Не вдалося надіслати код підтвердження`)
                return res.status(500).json({ message: 'Не вдалося надіслати код підтвердження.' })
            }
        } else {
            return res.status(400).json({ message: 'Користувач вже зареєстрований.' })
        }
    })
};

exports.validateConfirmationCode = async (req, res) => {
    const { email, confirmationCode } = req.body

    if (!confirmationCodes[email]) {
        return res.status(404).json({ message: 'Код був відправлений не на цей емейл.' })
    }
    if (confirmationCodes[email] === confirmationCode) {
        delete confirmationCodes[email]
        return res.status(200).json({ message: 'Ви успішно підтвердили пошту.' })
    } else {
        return res.status(403).json({ message: 'Неправильний код підтвердження.' })
    }
};

exports.registrationUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            message: 'Будь ласка, заповніть всі поля.'
        })
    }
    try {
        User.findEmail(email, async (err, result) => {
            if (err) {
                logger.error(`Помилка при пошуку користувача при реєстрації.`)
                return res.status(500).json({
                    message: 'Внутрішня помилка сервера при пошуку емейла. Спробуйте пізніше.'
                })
            }

            if (result.length > 0) {
                return res.status(409).json({
                    message: 'Користувач з таким емейлом вже існує.'
                })
            }

            const hashedPassword = await PasswordService.hashPassword(password)

            User.create(firstName, lastName, email, hashedPassword, (err, result) => {
                if (err) {
                    logger.error(`Помилка при створенні користувача.`)
                    return res.status(500).json({
                        message: 'Внутрішня помилка сервера при створенні користувача. Спробуйте пізніше.'
                    })
                } else {
                    return res.status(201).json({
                        message: 'Користувач успішно зареєстрований.',
                        data: { firstName }
                    })
                }
            })
        })
    } catch (err) {
        logger.error(`Загальна помилка при реєстрації користувача.`)
        return res.status(500).json({
            message: 'Внутрішня помилка сервера. Спробуйте пізніше.'
        })
    }
};

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Будь ласка, заповніть всі поля.'
        });
    }

    User.checkLockStatus(email, async (err, data) => {
        if (err) {
            logger.error(`Помилка при перевірці статусу блокування користувача.`)
            return res.status(500).json({
                message: 'Помилка сервера при перевірці статусу користувача.'
            });
        }

        if (!data.userExists) {
            return res.status(401).json({
                message: 'Невірний емейл або пароль.'
            });
        }

        const user = data.user;

        if (user.account_locked_until && new Date(user.account_locked_until) > new Date()) {
            return res.status(403).json({
                message: `Ваш обліковий запис заблоковано до ${user.account_locked_until}.`
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
                    logger.error(`Помилка при оновленні невдалих спроб для користувача.`)
                }
            });

            const message = lockUntil
                ? `Ваш обліковий запис заблоковано до ${lockUntil}.`
                : 'Невірний емейл або пароль.';

            return res.status(401).json({ message })
        }

        User.resetFailedAttempts(user.user_id, (err) => {
            if (err) {
                logger.error(`Помилка при скиданні невдалих спроб для користувача.`)
            }
        });

        const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: '1h' })
        const tariff = user.tariff
        return res.status(200).json({ message: 'Вхід успішний.', token, tariff })
    });
};

exports.deleteUser = (req, res) => {
    const { password } = req.body
    const userId = req.user.userId

    if (!userId) {
        return res.status(400).json({ message: 'Користувач не вказаний для видалення.' })
    }

    User.findById(userId, async (err, user) => {
        if (err) {
            logger.error(`Помилка при пошуку користувача для видалення.`)
            return res.status(500).json({ message: 'Помилка сервера при пошуку користувача.' })
        }

        if (!user) {
            return res.status(404).json({ message: 'Користувача не знайдено під час перевірки існування.' })
        }

        const isPasswordMatch = await PasswordService.comparePassword(password, user.password)

        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Пароль невірний.' })
        } else {
            User.deleteUser(userId, async (err, result) => {
                if (err) {
                    logger.error(`Помилка при видаленні користувача.`)
                    return res.status(500).json({
                        message: 'Сталася серверна помилка при видаленні користувача.',
                        error: err.message
                    })
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({
                        message: 'Користувача не знайдено під час спроби видалення.'
                    })
                }
                try {
                    const deleteImagesMessage = await deleteUserImages(userId)

                    res.status(200).json({
                        message: 'Користувача успішно видалено' + deleteImagesMessage
                    })
                } catch (error) {
                    return res.status(200).json({
                        message: 'Користувача успішно видалено, але не вдалося видалити зображення.'
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
            logger.error(`Помилка при отриманні даних для видалення з користувача.`)
            return res.status(500).json({
                message: 'Помилка сервера.'
            })
        }

        if (!result) {
            return res.status(404).json({
                message: 'Користувача не знайдено.'
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
            logger.error(`Помилка при отриманні тарифу користувача.`)
            return res.status(500).json({ message: 'Помилка сервера.' })
        }

        if (!result) {
            return res.status(404).json({
                message: 'Користувача не знайдено.'
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
        return res.status(400).json({ message: 'Не заповненні необхідні поля.' })
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
            logger.error(`Помилка при зміні профілю користувача.`)
            return res.status(500).json({ message: 'Помилка сервера.' })
        } else if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Користувача не знайдено.' })
        } else {
            return res.status(200).json({ message: 'Дані успішно оновлені.' })
        }
    })
};

exports.changePassword = async (req, res) => {
    const { passwordCurrent, passwordNew, passwordConfirm } = req.body
    const userId = req.user.userId

    if (passwordNew !== passwordConfirm) {
        return res.status(409).json({
            message: 'Новий пароль і підтвердження не збігаються.'
        });
    }

    User.findById(userId, async (err, user) => {
        if (err) {
            logger.error(`Помилка під час перевірки пароля в процесі зміни пароля користувача.`)
            return res.status(500).json({ message: 'Помилка сервера.' })
        }

        if (!user) {
            return res.status(404).json({ message: 'Користувача не знайдено.' })
        }

        const isPasswordMatch = await PasswordService.comparePassword(passwordCurrent, user.password)

        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Поточний пароль невірний.' })
        }

        const hashedPassword = await PasswordService.hashPassword(passwordNew)

        User.changePassword(userId, hashedPassword, (err, result) => {
            if (err) {
                logger.error(`Помилка при зміні пароля користувача.`)
                return res.status(500).json({ message: 'Помилка сервера при зміні пароля.' })
            }

            return res.status(200).json({ message: 'Пароль успішно змінений.' })
        });
    });
};