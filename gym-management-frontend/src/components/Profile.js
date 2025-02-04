import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { getUserBookings } from '../apiService';
import '../styles/Profile.css';

const Profile = () => {
  const { user } = useUser();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      if (user) {
        try {
          const userBookings = await getUserBookings(user._id);
          setBookings(userBookings);
        } catch (error) {
          setError('Error fetching bookings: ' + error.message);
        }
      }
    };

    fetchBookings();
  }, [user]);

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {user ? (
        <>
          <div className="profile-details">
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
          <div className="booking-section">
            <h3>Your Bookings</h3>
            {error && <p className="error">{error}</p>}
            {bookings.length > 0 ? (
              <ul className="booking-list">
                {bookings.map((booking) => (
                  <li key={booking._id}>
                    <p>
                      <strong>Service:</strong> {booking.serviceId.name}
                    </p>
                    <p>
                      <strong>Date:</strong>{' '}
                      {new Date(booking.date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Time:</strong> {booking.time}
                    </p>
                    <p>
                      <strong>Status:</strong> {booking.status}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="login-message">No bookings found.</p>
            )}
          </div>
        </>
      ) : (
        <p className="login-message">Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
