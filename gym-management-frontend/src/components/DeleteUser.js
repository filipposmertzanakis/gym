import React, { useState, useEffect } from 'react';
import { deleteUser, getUsers } from '../apiService';
import UserModal from './UserDeleteModal';
import UserInfoModal from './UserInfoModal';
import '../styles/UsersTable.css';


const DeleteUser = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  const [selectedUser, setSelectedUser] = useState(null); // State to manage the selected user for both modals
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to control delete modal
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false); // State to control info modal

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
      setUsers(users.filter(user => user.username !== username));
      handleCloseDeleteModal(); // Close the delete modal after action
    } catch (error) {
      setMessage(`Error deleting user: ${error.message || 'Unknown error'}`);
    }
  };

  // Open/Close Delete Modal
  const handleOpenDeleteModal = (user) => {
    setSelectedUser(user); // Set the selected user
    setIsDeleteModalOpen(true); // Open the delete modal
  };

  const handleCloseDeleteModal = () => {
    setSelectedUser(null); // Clear the selected user
    setIsDeleteModalOpen(false); // Close the delete modal
  };

  // Open/Close Info Modal
  const handleOpenInfoModal = (user) => {
    setSelectedUser(user); // Set the selected user
    setIsInfoModalOpen(true); // Open the info modal
  };

  const handleCloseInfoModal = () => {
    setSelectedUser(null); // Clear the selected user
    setIsInfoModalOpen(false); // Close the info modal
  };

  return (
    <div>
      <h2>Manage Users</h2>
      {message && <p>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                {/* Open the info modal */}
                <button onClick={() => handleOpenInfoModal(user)}>View Info</button>
                {/* Open the delete modal */}
                <button onClick={() => handleOpenDeleteModal(user)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render Delete Modal */}
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
    </div>
  );
};

export default DeleteUser;
