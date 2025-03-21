require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const newsRoutes = require('./routes/newsRoutes');

const app = express();
app.use(express.json());

// energopoiisi cors
app.use(cors());

// syndesi MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/news', newsRoutes);

// energopoiisi server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use('/photos', express.static('photos'));

