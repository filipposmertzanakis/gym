import React, { useState, useEffect } from 'react';
import { deleteServiceByName, getServices } from '../apiService';
import '../styles/delete_services.css';

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
      setMessage(error.message || 'Could not delete asked service at the moment.Please retry');
    }
  };

  return (
    <div className="delete-service-container">
      <h3>Available Services</h3>
      {message && <p className="message">{message}</p>}
      <table className="services-table">
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service._id}>
              <td>{service.name}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(service.name)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteServiceByName;
