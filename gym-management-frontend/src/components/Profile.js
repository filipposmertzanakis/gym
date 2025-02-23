import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { getUserBookings, cancelBooking } from '../apiService';
import '../styles/Profile.css';

const Profile = () => {
  const { user, setUser } = useUser();
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      if (user) {
        try {
          const userBookings = await getUserBookings(user._id);
          setBookings(userBookings);
        } catch (err) {
          setError('Error fetching bookings: ' + err.message);
        }
      }
    };

    fetchBookings();
  }, [user]);

  // vgale ta canceled bookings
  const nonCancelledBookings = bookings.filter(booking => booking.status !== 'cancelled');

  const now = new Date();
  const pastBookings = nonCancelledBookings.filter(booking => new Date(booking.date) < now);
  const pendingBookings = nonCancelledBookings.filter(booking => new Date(booking.date) >= now);

  const handleCancelBooking = async (booking) => {
    // antikeimeno typou date apo to date and time tou booking
    const bookingDateTime = new Date(booking.date);
    const [hours, minutes] = booking.time.split(':').map(Number);
    bookingDateTime.setHours(hours, minutes, 0, 0);

    // elegkse an ksekinaei se ligotero apo dyo ores
    const twoHoursInMs = 2 * 60 * 60 * 1000;
    if (bookingDateTime - new Date() < twoHoursInMs) {
      setMessage('You cannot cancel a booking less than 2 hours prior to the booking time.');
      return;
    }

    try {
      const response = await cancelBooking(booking._id);
      
      
      if (response.updatedUser) {
        setUser(response.updatedUser);
      } else {
        // metritis akiroseon +1
        setUser({ ...user, cancellationCounter: (user.cancellationCounter || 0) + 1 });
      }

      setMessage('Booking cancelled successfully!');
      // afairese to canceled booking
      setBookings(prevBookings => prevBookings.filter(b => b._id !== booking._id));
    } catch (err) {
      setError('Error cancelling booking: ' + (err.response?.data?.error || err.message));
    }
  };

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
            <h3>Your Upcoming Bookings</h3>
            {error && <p className="error">{error}</p>}
            {pendingBookings.length > 0 ? (
              <ul className="booking-list">
                {pendingBookings.map((booking) => (
                  <li key={booking._id}>
                    <p>
                    <strong>Service:</strong> {booking.serviceId?.name || 'Unknown Service'}
                    </p>
                    <p>
                      <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Time:</strong> {booking.time}
                    </p>
                    <p>
                      <strong>Status:</strong> {booking.status}
                    </p>
                    <button onClick={() => handleCancelBooking(booking)}>Cancel Booking</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="login-message">No upcoming bookings found.</p>
            )}

            <h3>Your Past Bookings</h3>
            {pastBookings.length > 0 ? (
              <ul className="booking-list">
                {pastBookings.map((booking) => (
                  <li key={booking._id}>
                    <p>
                    <strong>Service:</strong> {booking.serviceId?.name || 'Unknown Service'}
                    </p>
                    <p>
                      <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}
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
              <p className="login-message">No past bookings found.</p>
            )}
          </div>
          {message && <p className="message">{message}</p>}
        </>
      ) : (
        <p className="login-message">Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
