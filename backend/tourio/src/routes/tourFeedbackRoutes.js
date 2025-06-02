const express = require('express');
const router = express.Router();
const tourFeedbackController = require('../controllers/tourFeedbackController');
const authenticateFirebaseToken = require('../middleware/authMiddleware');

router.post('/', authenticateFirebaseToken, tourFeedbackController.submitTourFeedback);

module.exports = router;
