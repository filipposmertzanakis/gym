import React, { useState, useEffect } from 'react';
import { deleteUser, getUsers } from '../apiService';
import UserModal from './UserDeleteModal';
import UserInfoModal from './UserInfoModal';

import UserUpdateModal from './UserUpdateModal';
import '../styles/UsersTable.css';

const DeleteUser = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

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
      setUsers(users.filter((user) => user.username !== username));
      handleCloseDeleteModal();
    } catch (error) {
      setMessage(`Could not delete this user at the moment. Please retry`);
    }
  };

  const handleOpenDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedUser(null);
    setIsDeleteModalOpen(false);
  };

  const handleOpenInfoModal = (user) => {
    setSelectedUser(user);
    setIsInfoModalOpen(true);
  };

  const handleCloseInfoModal = () => {
    setSelectedUser(null);
    setIsInfoModalOpen(false);
  };

  const handleOpenUpdateModal = (user) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedUser(null);
    setIsUpdateModalOpen(false);
  };

  // This onSave callback will refresh the selected user info
  const handleUserSave = (updatedUser) => {
    setSelectedUser(updatedUser);
  };

  return (
    <div className="users-container">
      <h2 className="users-title">Manage Users</h2>
      {message && <p className="users-message">{message}</p>}
      <table className="users-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td className="users-actions">
                <button
                  className="view-button"
                  onClick={() => handleOpenInfoModal(user)}
                >
                  View Info
                </button>
                <button
                  className="delete-button1"
                  onClick={() => handleOpenDeleteModal(user)}
                >
                  Delete
                </button>
                <button
                  className="update-button"
                  onClick={() => handleOpenUpdateModal(user)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isDeleteModalOpen && (
        <UserModal
          user={selectedUser}
          onClose={handleCloseDeleteModal}
          handleDelete={handleDelete}
        />
      )}

      {/* Render Info Modal */}
      {isInfoModalOpen && (
        <UserInfoModal
          user={selectedUser}
          onClose={handleCloseInfoModal}
        />
      )}
      {/* Render Update Modal */}
      {isUpdateModalOpen && (
        <UserUpdateModal
          user={selectedUser}
          onClose={handleCloseUpdateModal}
        />
      )}
    </div>
  );
};

export default DeleteUser;
