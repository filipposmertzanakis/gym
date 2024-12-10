require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const x = 6 //alfo