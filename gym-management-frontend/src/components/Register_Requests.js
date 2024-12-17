import React, { useEffect, useState } from 'react';
import { getPendingRegistrations, acceptRegistration, declineRegistration } from '../apiService';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getPendingRegistrations();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching USERS:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleAccept = async (username) => {
    try {
      const updatedUser = await acceptRegistration(username);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.username === username ? { ...user, status: 'active' } : user
        )
      );
      console.log(`User ${username} accepted successfully.`);
    } catch (error) {
      console.error(`Error accepting user ${username}:`, error);
    }
  };

  const handleDecline = async (username) => {
    try {
      const updatedUser = await declineRegistration(username);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.username === username ? { ...user, status: 'declined' } : user
        )
      );
      console.log(`User ${username} declined successfully.`);
    } catch (error) {
      const errorMessage = error?.error || error?.message || 'Unknown error';
      console.error(`Error declining user ${username}:`, errorMessage);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.username}>
            <span>
              {user.name} ({user.username}) - Status: {user.status}
            </span>
            {user.status === 'pending' && (
              <>
                <button onClick={() => handleAccept(user.username)}>Accept</button>
                <button onClick={() => handleDecline(user.username)}>Decline</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
