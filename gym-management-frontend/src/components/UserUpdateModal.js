import React, { useState, useEffect } from 'react';
import { updateUser } from '../apiService';
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

  // Update the form data if the user prop changes
  useEffect(() => {
    setFormData({
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
  }, [user]);

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

  const handleUpdate = async () => {
    try {
      const updatedUser = { username: user.username, ...formData };
      await updateUser(user.username, updatedUser);
      setMessage(`User ${user.username} updated successfully`);
      if (onSave) {
        onSave(updatedUser);
      }
      if (onClose) {
        onClose();
      }
    } catch (error) {
      setMessage(
        `Error updating user ${user.username}: ${error.message || 'Unknown error'}`
      );
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
        <button onClick={handleUpdate}>Save</button>
        <button onClick={onClose} className="close-button">
          Close
        </button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default UserUpdateModal;
