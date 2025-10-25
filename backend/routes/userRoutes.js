const express = require('express');
const upload = require('../config/multerConfig')
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const errorMulterMiddleware = require('../middleware/errorMulterMiddleware')

router.get('/user', authMiddleware, userController.getUserData);
router.get('/user-tariff', authMiddleware, userController.getUserTariff);
router.post('/send-code', userController.sendConfirmationCode);
router.post('/validate-code', userController.validateConfirmationCode);
router.patch('/change-profile', authMiddleware, upload.single('image'), userController.changeProfile, errorMulterMiddleware);
router.patch('/change-password', authMiddleware, userController.changePassword);
router.post('/registration', userController.registrationUser);
router.post('/login', userController.loginUser);
router.delete('/delete', authMiddleware, userController.deleteUser);

module.exports = router;