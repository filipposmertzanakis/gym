import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { getUserBookings } from '../apiService';

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
    <div>
      <h2>User Profile</h2>
      {user ? (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <h3>Your Bookings</h3>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {bookings.length > 0 ? (
            <ul>
              {bookings.map((booking) => (
                <li key={booking._id}>
                  <p><strong>Service:</strong> {booking.serviceId.name}</p>
                  <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {booking.time}</p>
                  <p><strong>Status:</strong> {booking.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
