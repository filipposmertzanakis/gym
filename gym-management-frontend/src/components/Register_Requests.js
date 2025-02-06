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
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name & Surname </th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username} style={{ backgroundColor: user.status === 'pending' ? '#fff' : '#f9f9f9' }}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {user.name} {user.surname}
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.status}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {user.status === 'pending' && (
                  <>
                    <button
                      style={{
                        marginRight: '10px',
                        padding: '5px 10px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleAccept(user.username)}
                    >
                      Accept
                    </button>
                    <button
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#F44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleDecline(user.username)}
                    >
                      Decline
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
