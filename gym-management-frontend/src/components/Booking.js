import React, { useState, useEffect } from 'react';
import { updateUser, getUsers } from '../apiService';

const Booking = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        setMessage(`Error fetching users: ${error.message || 'Unknown error'}`);
      }
    };

    fetchUsers();
  }, []);

  // Handle input changes for individual users
  const handleChange = (e, username) => {
    const { name, value } = e.target;

    // Update the specific user's data in the local state
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.username === username
          ? { ...user, [name]: value }
          : user
      )
    );
  };

  // Update a specific user
  const handleUpdate = async (username) => {
    const userToUpdate = users.find((user) => user.username === username);
    try {
      await updateUser(username, userToUpdate);
      setMessage(`User ${username} updated successfully`);
    } catch (error) {
      setMessage(`Error updating user ${username}: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <p>TSAPOU</p>
  );
};

export default Booking;
