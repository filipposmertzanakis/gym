import React, { useState, useEffect } from 'react';
import { deleteUser, getUsers } from '../apiService';

const DeleteUser = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

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

  const handleDelete = async (username) => {
    try {
      await deleteUser(username);
      setMessage('User deleted successfully');
      // Refresh the user list after deletion
      setUsers(users.filter(user => user.username !== username));
    } catch (error) {
      setMessage(`Error deleting user: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <div>
      <h2>Delete User</h2>
      {message && <p>{message}</p>}
      <ul>
        {users.map(user => (
          <li key={user.username}>
            {user.name} ({user.username})
            <button onClick={() => handleDelete(user.username)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteUser;
