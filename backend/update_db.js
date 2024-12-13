const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
        console.log('Connected to:', mongoose.connection.name);
        const users = database.collection('users');
    
        const result = await users.updateMany({}, { $set: { status: 'approved' } });
        console.log(`${result.matchedCount} documents matched the query.`);
        console.log(`${result.modifiedCount} documents were updated.`);
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
    
};