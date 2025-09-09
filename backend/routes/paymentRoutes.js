const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

router.get('/payment', paymentController.getInfoPayment);
router.put('/payment', adminAuthMiddleware, paymentController.setInfoPayment);
router.get('/get-block-message', paymentController.getBlockStatusMessage);
router.get('/get-active-payment', paymentController.getPaymentActive);
router.put('/update-block-message', adminAuthMiddleware, paymentController.updateBlockStatusMessage);

module.exports = router;