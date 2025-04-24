const express = require('express');
const { getPredefinedTours } = require('../controllers/tourController');
const router = express.Router();

router.get('/api/tours', getPredefinedTours);

module.exports = router;
