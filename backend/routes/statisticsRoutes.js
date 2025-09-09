const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

router.get('/get-visits', adminAuthMiddleware, statisticsController.getVisitStatistics);
router.post('/set-visits', statisticsController.setVisitStatistics);

module.exports = router;