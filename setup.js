const fs = require('fs');
const path = require('path');

// Helper function to create a folder
function createFolder(folderPath) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`Created folder: ${folderPath}`);
    }
}

// Helper function to create a file
function createFile(filePath, content) {
    fs.writeFileSync(filePath, content);
    console.log(`Created file: ${filePath}`);
}

// Main function to generate project structure
function generateProjectStructure() {
    console.log('Generating backend structure...');

    const baseDir = path.join(__dirname, 'backend');
    const folders = [
        'routes',
        'models',
    ];

    // Create base folder and subfolders
    createFolder(baseDir);
    folders.forEach((folder) => createFolder(path.join(baseDir, folder)));

    // Create app.js
    createFile(
        path.join(baseDir, 'app.js'),
        `
require('dotenv').config();
const express = require('express');
const connectDB = require('./database');
const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
        `.trim()
    );

    // Create database.js
    createFile(
        path.join(baseDir, 'database.js'),
        `
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
        `.trim()
    );

    // Create .env
    createFile(
        path.join(baseDir, '.env'),
        `
MONGO_URI=mongodb://localhost:27017/gym
PORT=5000
        `.trim()
    );

    // Create route boilerplates
    createFile(
        path.join(baseDir, 'routes/userRoutes.js'),
        `
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login User
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && user.password === password) {
            res.status(200).json(user);
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
        `.trim()
    );

    createFile(
        path.join(baseDir, 'routes/serviceRoutes.js'),
        `
const express = require('express');
const Service = require('../models/Service');
const router = express.Router();

// Get All Services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add New Service
router.post('/', async (req, res) => {
    try {
        const newService = new Service(req.body);
        await newService.save();
        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
        `.trim()
    );

    createFile(
        path.join(baseDir, 'routes/bookingRoutes.js'),
        `
const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

// Create Booking
router.post('/', async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get Bookings for a User
router.get('/:userId', async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.params.userId });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
        `.trim()
    );

    // Create model boilerplates
    createFile(
        path.join(baseDir, 'models/User.js'),
        `
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: {
        country: String,
        city: String,
        street: String,
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
        `.trim()
    );

    createFile(
        path.join(baseDir, 'models/Service.js'),
        `
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    schedule: [
        {
            day: String,
            time: String,
            trainer: String,
            maxCapacity: Number,
        },
    ],
    price: Number,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Service', serviceSchema);
        `.trim()
    );

    createFile(
        path.join(baseDir, 'models/Booking.js'),
        `
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);
        `.trim()
    );

    console.log('Backend structure generated successfully!');
}

// Run the script
generateProjectStructure();
