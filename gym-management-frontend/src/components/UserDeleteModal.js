import React from 'react';
import '../styles/ServiceModal.css'; 


const UserModal = ({ user, onClose, handleDelete }) => {
  if (!user) return null; // If no user is provided, return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className='title-modal'>Delete User</h2>
        <p><strong>Do you want to delete the user:</strong> {user.username}?</p>
        <button onClick={() => handleDelete(user.username)}>Delete</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserModal;