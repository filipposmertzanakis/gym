import React, { useState, useEffect } from 'react';
import { getServices, updateService } from '../apiService';


const UpdateService = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
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

  const handleSelectService = (service) => {
    setSelectedService(service);
    setName(service.name);
    setDescription(service.description);
    setPrice(service.price);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedService) return;

    const updatedService = { name, description, price };

    try {
      await updateService(selectedService.name, updatedService);
      setMessage(`Service "${selectedService.name}" updated successfully!`);
      // Refresh the services list
      const updatedServices = await getServices();
      setServices(updatedServices);
      setSelectedService(null);
      setName('');
      setDescription('');
      setPrice(0);
    } catch (error) {
      setMessage(`Error updating service: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <div>
      <h2>Update Service</h2>
      {message && <p>{message}</p>}
      <select onChange={(e) => handleSelectService(JSON.parse(e.target.value))} value={selectedService ? JSON.stringify(selectedService) : ''}>
        <option value="">Select a service to update</option>
        {services.map(service => (
          <option key={service._id} value={JSON.stringify(service)}>
            {service.name}
          </option>
        ))}
      </select>
      {selectedService && (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Service Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <button type="submit">Update Service</button>
        </form>
      )}
    </div>
  );
};

export default UpdateService;
