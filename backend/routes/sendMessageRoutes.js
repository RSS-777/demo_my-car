const express = require('express');
const router = express.Router();
const sendMessageController = require('../controllers/sendMessageController');

router.post('/send', sendMessageController.sendMessage);

module.exports = router;