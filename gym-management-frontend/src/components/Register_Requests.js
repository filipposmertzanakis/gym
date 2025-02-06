import React, { useEffect, useState } from 'react';
import { getPendingRegistrations, acceptRegistration, declineRegistration } from '../apiService';
import '../styles/Register_Table.css';

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
    <div className="table-container">
      <h1>Users</h1>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Name & Surname </th>
            <th>Surname</th>
            <th>Username</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.username} className={ index % 2 === 0 ? 'row-even' : 'row-odd'}>
              <td>{user.name}</td>
              <td>{user.lastname}</td>
              <td>{user.username}</td>
              <td>{user.status}</td>
              <td className='Accept_Decline_btn'>
                {user.status === 'pending' && (
                  <>
                    <button className="btn-accept" onClick={() => handleAccept(user.username)}>
                      Accept
                    </button>
                    <button className="btn-decline" onClick={() => handleDecline(user.username)}>
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
