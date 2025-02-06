const express = require('express');
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const User = require('../models/User'); // Import the User model to update cancellation-related fields
const router = express.Router();

// Create Booking
router.post('/', async (req, res) => {
    try {
        // Check if the user has already booked this service for the specific schedule entry
        const existingBooking = await Booking.findOne({
            userId: req.body.userId,
            serviceId: req.body.serviceId,
            date: req.body.date,
            time: req.body.time,
            status: 'confirmed' // Optional: Check only confirmed bookings
        });

        console.log('Existing Booking:', existingBooking); // Log the existing booking check

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
        const bookings = await Booking.find({ userId: req.params.userId }).populate('serviceId');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PATCH route to cancel a booking
router.patch('/cancel/:bookingId', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.bookingId);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        if (booking.status === 'cancelled') {
            return res.status(400).json({ error: 'Booking is already cancelled' });
        }

        const bookingDateTime = new Date(booking.date);
        const [hours, minutes] = booking.time.split(':').map(Number);
        bookingDateTime.setHours(hours, minutes, 0, 0);

        const now = new Date();
        const diff = bookingDateTime - now;
        console.log('Booking DateTime:', bookingDateTime);
        console.log('Current DateTime:', now);
        console.log('Difference in ms:', diff);

        const twoHoursInMs = 2 * 60 * 60 * 1000;
        if (diff < twoHoursInMs) {
            return res.status(400).json({ error: 'You cannot cancel a booking less than 2 hours prior to the booking time.' });
        }

        // Retrieve the user that made the booking
        const user = await User.findById(booking.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        console.log('User before update:', user);

        // Set or reset the cancellation counter as needed
        const currentDate = new Date();
        const dayOfWeek = currentDate.getDay();
        const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        const monday = new Date(currentDate);
        monday.setDate(currentDate.getDate() - diffToMonday);
        monday.setHours(0, 0, 0, 0);

        if (!user.lastCancellationReset || new Date(user.lastCancellationReset) < monday) {
            user.cancellationCounter = 0;
            user.lastCancellationReset = monday;
        }
        console.log('User cancellation counter before ban check:', user.cancellationCounter);

        if (user.cancellationCounter >= 2) {
            return res.status(400).json({ error: 'You are banned from booking for this week due to excessive cancellations.' });
        }

        // Increment cancellation counter
        user.cancellationCounter = (user.cancellationCounter || 0) + 1;
        await user.save();
        console.log('User after update:', user);

        // Update booking status to "cancelled"
        booking.status = 'cancelled';
        await booking.save();
        console.log('Booking after cancellation:', booking);

        res.status(200).json({ message: 'Booking cancelled successfully.', booking });
    } catch (error) {
        console.error('Cancellation Error:', error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;