import React, { useState, useEffect } from 'react';
import { updateUser, getUsers, deleteUser } from '../apiService';
import '../styles/UpdateModal.css';
  

const UserUpdateModal = ({ user, onClose, onSave }) => {

  const [message, setMessage] = useState('');
  
  const [formData, setFormData] = useState({
    name: user.name || '',
    lastname: user.lastname || '',
    email: user.email || '',
    role: user.role || '',
    address: {
      country: user.address?.country || '',
      city: user.address?.city || '',
      street: user.address?.street || '',
    },
  });




  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['country', 'city', 'street'].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Update a specific user
    const handleUpdate = async (username) => {
      const userToUpdate =  user.username === username;
      try {
        await updateUser(username, userToUpdate);
        setMessage(`User ${username} updated successfully`);
        
      } catch (error) {
        setMessage(`Error updating user ${username}: ${error.message || 'Unknown error'}`);
      }
    };

  return (
    <div className="Umodal-overlay">
      <div className="Umodal-content">
        <h2>Update User</h2>
        <form>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Role:</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Country:</label>
            <input
              type="text"
              name="country"
              value={formData.address.country}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={formData.address.city}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Street:</label>
            <input
              type="text"
              name="street"
              value={formData.address.street}
              onChange={handleChange}
            />
          </div>
        </form>
        <button onClick={() => handleUpdate(user.username)}>Save</button>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default UserUpdateModal;
