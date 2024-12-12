import React, { useState } from 'react';
import { deleteUser } from '../apiService';

const DeleteUser = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleDelete = async () => {
    try {
      await deleteUser(username);
      setMessage('User deleted successfully');
    } catch (error) {
      setMessage(`Error deleting user: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <div>
      <h2>Delete User</h2>
      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={handleChange}
      />
      <button onClick={handleDelete}>Delete User</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteUser;
