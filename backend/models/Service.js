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