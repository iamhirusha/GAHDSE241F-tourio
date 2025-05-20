const express = require('express');
const router = express.Router();
const addTourRequestController = require('../controllers/addTourRequestController');
const authenticate = require('../middleware/authMiddleware');

router.post('/add', authenticate, addTourRequestController.addTourRequest);

module.exports = router;