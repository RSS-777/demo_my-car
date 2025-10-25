const express = require('express');
const router = express.Router();
const priceController = require('../controllers/priceController');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

router.get('/price',  priceController.gettingPrice);
router.patch('/price', adminAuthMiddleware, priceController.changePrice);

module.exports = router;