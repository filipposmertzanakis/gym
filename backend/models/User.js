const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user','gymnast'], default: 'user' },
    name: { type: String, required: true },
    lastname: {type : String , required: true},
    email: { type: String, required: true, unique: true },
    status: { type: String, enum:['pending' , 'active' , 'declined'] , default: 'pending' ,required :true }, 
    address: {
        country: { type: String, required: true },
        city: { type: String, required: true },
        street: { type: String, required: true }
    },
    cancellationCounter: { type: Number, default: 0 },
    lastCancellationReset: { type: Date },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema)