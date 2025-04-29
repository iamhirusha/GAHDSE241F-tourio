const express = require('express');
const { getPredefinedTours , getPredefinedTourById } = require('../controllers/tourController');
const router = express.Router();

router.get('/', getPredefinedTours);

// GET one tour by ID
router.get('/:id', getPredefinedTourById);

module.exports = router;
