const express = require('express');
const cors = require('cors');
const tourRoutes = require('./routes/tourRoutes');
const sampleRoutes = require('./routes/sampleRoutes');

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
app.use('/api/sample', sampleRoutes);

module.exports = app;
