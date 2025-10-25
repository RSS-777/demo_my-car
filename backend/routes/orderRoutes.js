const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware')

router.patch('/change-status', adminAuthMiddleware, orderController.changeStatusOrder)
router.delete('/delete-request', adminAuthMiddleware, orderController.deleteOrderRequest)

module.exports = router;