const express = require('express');
const router = express.Router();
const tariffController = require('../controllers/tariffController');
const authMiddleware = require('../middleware/authMiddleware');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware')

router.patch('/change-request', authMiddleware, tariffController.requestTariffChange)
router.delete('/cancel-request', authMiddleware, tariffController.cancelTariffChangeRequest)
router.get('/get-tariffs', adminAuthMiddleware, tariffController.getAllTariffs)

module.exports = router;