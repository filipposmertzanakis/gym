import React, { useState } from 'react';
import { deleteServiceByName } from '../apiService';

const DeleteServiceByName = () => {
  const [serviceName, setServiceName] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    if (!serviceName) {
      setMessage('Please enter a service name.');
      return;
    }

    try {
      await deleteServiceByName(serviceName);
      setMessage(`Service "${serviceName}" deleted successfully!`);
      setServiceName(''); // Clear the input field
    } catch (error) {
      setMessage(error.message || 'Error deleting service');
    }
  };

  return (
    <div>
      <h2>Delete Service by Name</h2>
      <input
        type="text"
        placeholder="Enter Service Name"
        value={serviceName}
        onChange={(e) => setServiceName(e.target.value)}
        required
      />
      <button onClick={handleDelete}>Delete Service</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteServiceByName;
