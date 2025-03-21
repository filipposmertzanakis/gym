import React, { useState, useEffect } from 'react';
import { updateUser, getUsers, deleteUser } from '../apiService';

const UpdateUser = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  // fere tous xristes
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

  
  const handleChange = (e, username) => {
    const { name, value } = e.target;

    // enimerose ta stoixeia localy
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.username === username
          ? { ...user, [name]: value }
          : user
      )
    );
  };

  // enimerosi stoixion enos xristi
  const handleUpdate = async (username) => {
    const userToUpdate = users.find((user) => user.username === username);
    try {
      await updateUser(username, userToUpdate);
      setMessage(`User ${username} updated successfully`);
      setEditingUser(null);
    } catch (error) {
      setMessage(`Could not change user information. Please retry`);
    }
  };

  // diegrapse enan xrisit
  const handleDelete = async (username) => {
    try {
      await deleteUser(username);
      setUsers(users.filter(user => user.username !== username));
      setMessage(`User ${username} deleted successfully`);
    } catch (error) {
      setMessage(`Could not delete asked user. Please retry`);
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
              <button onClick={() => setEditingUser(editingUser === user.username ? null : user.username)}>
                {editingUser === user.username ? 'Close' : 'Update'}
              </button>
              <button onClick={() => handleDelete(user.username)}>Delete</button>
              {editingUser === user.username && (
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value = {user.name}
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
                  <input
                    type="text"
                    name="status"
                    placeholder="Status"
                    value={user.status || ''}
                    onChange={(e) => handleChange(e, user.username)}
                  />
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={user.address.country || ''}
                    onChange={(e) => handleChange(e, user.username)}
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={user.address.city || ''}
                    onChange={(e) => handleChange(e, user.username)}
                  />
                  <input
                    type="text"
                    name="street"
                    placeholder="Street"
                    value={user.address.street || ''}
                    onChange={(e) => handleChange(e, user.username)}
                  />
                  <button onClick={() => handleUpdate(user.username)}>Save</button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpdateUser;
