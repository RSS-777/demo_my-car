const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

router.post('/login', adminController.loginAdmin);
router.get('/users', adminAuthMiddleware, adminController.getUsersList);

module.exports = router;

