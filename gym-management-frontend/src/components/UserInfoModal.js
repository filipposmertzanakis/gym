import React from 'react';
import '../styles/ServiceModal.css'; 


const UserInfoModal = ({ user, onClose}) => {
  if (!user) return null; // If no user is provided, return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className='title-modal'> User {user.username} Info:</h2>
        <p><strong>First Name:</strong> {user.name}</p>
        <p><strong>Last Name:</strong> {user.lastname}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Country:</strong> {user.address.country}</p>
        <p><strong>City:</strong> {user.address.city}</p>
        <p><strong>Street:</strong> {user.address.street}</p>
        
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserInfoModal;