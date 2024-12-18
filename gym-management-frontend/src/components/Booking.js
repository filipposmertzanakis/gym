import React from 'react';
import { useLocation } from 'react-router-dom';

const Booking = () => {
  const location = useLocation();
  const { service } = location.state || {}; // Get the service details from the state

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
        </div>
      ) : (
        <p>No service selected.</p>
      )}
    </div>
  );
};

export default Booking;
