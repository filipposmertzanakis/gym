const express = require('express');
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const router = express.Router();

// Create Booking
router.post('/', async (req, res) => {
    try {
        // Check if the user has already booked this service
        const existingBooking = await Booking.findOne({
            userId: req.body.userId,
            serviceId: req.body.serviceId,
            date: req.body.date,
            time: req.body.time,
        });

        if (existingBooking) {
            return res.status(400).json({ error: 'You have already booked this service for the selected date and time.' });
        }

        const newBooking = new Booking(req.body);
        await newBooking.save();

        // Update the service's maxCapacity for the specific schedule
        const service = await Service.findById(req.body.serviceId);
        if (service) {
            const scheduleEntry = service.schedule.find(session => 
                session.day === req.body.date && session.time === req.body.time
            );

            if (scheduleEntry && scheduleEntry.maxCapacity > 0) {
                scheduleEntry.maxCapacity -= 1; // Deduct one from maxCapacity
                await service.save(); // Save the updated service
            } else {
                return res.status(400).json({ error: 'No available capacity for the selected schedule.' });
            }
        }

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