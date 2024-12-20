import React, { useState, useEffect } from 'react';
import { deleteServiceByName, getServices } from '../apiService';

const DeleteServiceByName = () => {
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        setMessage(`Error fetching services: ${error.message || 'Unknown error'}`);
      }
    };

    fetchServices();
  }, []);

  const handleDelete = async (name) => {
    if (!name) {
      setMessage('Please enter a service name.');
      return;
    }

    try {
      await deleteServiceByName(name);
      setMessage(`Service "${name}" deleted successfully!`);
      // Refresh the services list
      const updatedServices = services.filter(service => service.name !== name);
      setServices(updatedServices);
    } catch (error) {
      setMessage(error.message || 'Error deleting service');
    }
  };

  return (
    <div>
      <h3>Available Services</h3>
      <ul>
        {services.map(service => (
          <li key={service._id}>
            {service.name}
            <button onClick={() => handleDelete(service.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteServiceByName;
