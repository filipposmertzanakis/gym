import React, { useState } from 'react';
import { updateUser } from '../apiService';

const UpdateUser = () => {
  const [username, setUsername] = useState('');
  const [updatedData, setUpdatedData] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateUser(username, updatedData);
      setMessage('User updated successfully');
    } catch (error) {
      setMessage(`Error updating user: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <div>
      <h2>Update User</h2>
      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        name="name"
        placeholder="New Name"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="New Email"
        onChange={handleChange}
      />
      <button onClick={handleUpdate}>Update User</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateUser;