import React, { useState, useEffect } from 'react';
import { updateUser, getUsers } from '../apiService';

const UpdateUser = () => {
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
    <div>
      <h2>Update Users</h2>
      {message && <p>{message}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.username}>
            <strong>{user.name} ({user.username})</strong>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={user.name || ''}
                onChange={(e) => handleChange(e, user.username)}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={user.email || ''}
                onChange={(e) => handleChange(e, user.username)}
              />
              <input
                type="text"
                name="role"
                placeholder="Role"
                value={user.role || ''}
                onChange={(e) => handleChange(e, user.username)}
              />
              <button onClick={() => handleUpdate(user.username)}>Update</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpdateUser;
