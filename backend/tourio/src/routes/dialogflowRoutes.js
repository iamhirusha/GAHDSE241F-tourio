const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../controllers/dialogflowController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/webhook', authMiddleware, handleWebhook);

module.exports = router;
