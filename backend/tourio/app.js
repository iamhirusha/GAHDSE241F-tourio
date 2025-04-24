const express = require('express');
const cors = require('cors');
const tourRoutes = require('./src/routes/tourRoutes');
const sampleRoutes = require('./src/routes/sampleRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Default Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// API Routes
app.use('/api/tours', tourRoutes);

module.exports = app;
