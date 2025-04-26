const express = require('express');
const { getTourRequests } = require('../controllers/tourRequestController');
const router = express.Router();

router.get('/', getTourRequests);

module.exports = router;
