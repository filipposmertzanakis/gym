require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./database');

connectDB();

const seedUsers = async () => {
    const users = [
        {
            username: 'admin212121',
            password: 'admin123',
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'admin',
            address: { country: 'USA', city: 'San Francisco', street: '456 Admin St' },
        },
        {
            username: 'johndoe',
            password: 'password123',
            name: 'John Doe',
            email: 'johndoe@example.com',
            role: 'user',
            address: { country: 'USA', city: 'New York', street: '123 Main St' },
        },
    ];

    try {
        await User.insertMany(users);
        console.log('Users seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding users:', error.message);
        process.exit(1);
    }
};

seedUsers();