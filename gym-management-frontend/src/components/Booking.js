import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createBooking } from '../apiService';
import { useUser } from '../context/UserContext';
import '../styles/Booking.css'; // Import CSS file

const Booking = () => {
  const location = useLocation();
  const { service } = location.state || {};
  const { user } = useUser();

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (service && service.schedule.length > 0) {
      setMessage('');
    }
  }, [service]);

  const handleBooking = async (e, session) => {
    e.preventDefault();
    const bookingData = {
      userId: user._id,
      serviceId: service._id,
      date: session.day,
      time: session.time,
    };

    try {
      await createBooking(bookingData);
      setMessage('Booking created successfully!');
    } catch (error) {
      setMessage('We couldn’t complete the booking at this moment. Please retry.');
    }
  };

  return (
    <div className="booking-container">
      {service ? (
        <div>
          <h2 className="booking-title">Booking for: {service.name}</h2>
          <p className="booking-description">{service.description}</p>
          <p className="booking-price">Price: €{service.price}</p>
          
          <h3 className="schedule-heading">Available Sessions:</h3>
          <ul className="schedule-list">
            {service.schedule.map((session, index) => (
              <li key={index} className="schedule-item">
                {session.day} at {session.time} with {session.trainer} (Max Capacity: {session.maxCapacity})
                
                <form onSubmit={(e) => handleBooking(e, session)} className="booking-form">
                  <button type="submit" className="confirm-button">Confirm Booking</button>
                </form>
              </li>
            ))}
          </ul>

          {message && <p className="booking-message">{message}</p>}
        </div>
      ) : (
        <p className="no-service-message">No service selected.</p>
      )}
    </div>
  );
};

export default Booking;
