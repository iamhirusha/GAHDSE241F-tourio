const express = require('express');
const router = express.Router();
const { getFeedbacksByTourId } = require('../controllers/getTourFeedbackController');

router.get('/:id', getFeedbacksByTourId);

module.exports = router;
