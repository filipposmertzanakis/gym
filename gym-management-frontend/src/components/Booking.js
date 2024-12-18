import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createBooking } from '../apiService'; // Import the createBooking function
import { useUser } from '../context/UserContext';

const Booking = () => {
  const location = useLocation();
  const { service } = location.state || {};
  const { user } = useUser(); // Access the user context

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (service && service.schedule.length > 0) {
      // Set the date and time based on the first available schedule
      const firstSession = service.schedule[0];
      setDate(firstSession.day); // Assuming day is in a valid date format
      setTime(firstSession.time);
    }
  }, [service]);

  const handleBooking = async (e) => {
    e.preventDefault();
    const bookingData = {
      userId: user._id,
      serviceId: service._id,
      date,
      time,
    };

    try {
      await createBooking(bookingData);
      setMessage('Booking created successfully!');
      // Optionally reset the form or redirect the user
    } catch (error) {
      console.error('Error details:', error); // Log the full error for debugging
      setMessage(`Error creating booking: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div>
      {service ? (
        <div>
          <h2>Booking for: {service.name}</h2>
          <p>Description: {service.description}</p>
          <p>Price: ${service.price}</p>
          <h3>Schedule:</h3>
          <ul>
            {service.schedule.map((session, index) => (
              <li key={index}>
                {session.day} at {session.time} with {session.trainer} (Max Capacity: {session.maxCapacity})
              </li>
            ))}
          </ul>
          <form onSubmit={handleBooking}>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              readOnly
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              readOnly
            />
            <button type="submit">Confirm Booking</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      ) : (
        <p>No service selected.</p>
      )}
    </div>
  );
};

export default Booking;
