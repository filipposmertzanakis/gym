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
app.get('/api/users/pending', async (req, res) => {
    try {
      const pendingUsers = await User.find({ status: 'pending' });
  
      if (pendingUsers.length === 0) {
        return res.status(404).json({ message: 'No pending users found' });
      }
  
      return res.status(200).json(pendingUsers);
    } catch (error) {
      console.error('Error fetching pending users:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

