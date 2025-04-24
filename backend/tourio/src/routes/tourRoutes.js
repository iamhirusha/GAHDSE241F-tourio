const express = require('express');
const { getPredefinedTours } = require('../controllers/tourController');
const router = express.Router();

router.get('/', getPredefinedTours);

module.exports = router;
