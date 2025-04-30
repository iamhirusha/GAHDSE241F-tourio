const express = require('express');
const cors = require('cors');
const tourRoutes = require('./src/routes/tourRoutes');
const hotelRoutes = require('./src/routes/hotelRoutes');
const tourRequestRoutes = require('./src/routes/tourRequestRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Default Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

//routes
const authRoutes = require('./src/routes/auth');

// API Routes
app.use('/api/tours', tourRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/tourreq', tourRequestRoutes);
app.use('/api', authRoutes);

module.exports = app;
