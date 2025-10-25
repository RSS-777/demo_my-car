const express = require('express');
const router = express.Router();
const advertisingController = require('../controllers/advertisingController');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

router.get('/getAdvertising/:lang', advertisingController.getAdvertising);
router.get('/getAdvertising-all', advertisingController.getAdvertisingAll);
router.put('/updateAdvertising', adminAuthMiddleware, advertisingController.updateAdvertising);

module.exports = router;