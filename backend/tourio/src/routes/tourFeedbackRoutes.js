const express = require('express');
const router = express.Router();
const tourFeedbackController = require('../controllers/tourFeedbackController');
const authenticateFirebaseToken = require('../middleware/authMiddleware');
const { getFeedbacksByTourId } = require('../controllers/getTourFeedbackController');

router.post('/', authenticateFirebaseToken, tourFeedbackController.submitTourFeedback);
router.get('/:id', getFeedbacksByTourId);

module.exports = router;
