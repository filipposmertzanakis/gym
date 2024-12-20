import React, { useState, useEffect } from 'react';
import { getServices, createService, updateService, deleteServiceByName } from '../apiService';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [schedules, setSchedules] = useState([{ day: '', time: '', trainer: '', maxCapacity: 0 }]);
  const [editingService, setEditingService] = useState(null);
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

  const handleCreate = async (e) => {
    e.preventDefault();
    const newService = { name: serviceName, description, price, schedule: schedules };

    try {
      await createService(newService);
      setMessage('Service created successfully');
      setServiceName('');
      setDescription('');
      setPrice(0);
      setSchedules([{ day: '', time: '', trainer: '', maxCapacity: 0 }]);
      const updatedServices = await getServices();
      setServices(updatedServices);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error creating service');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedService = { 
      name: serviceName, 
      description, 
      price, 
      schedule: schedules 
    };

    try {
      await updateService(editingService, updatedService);
      setMessage('Service updated successfully');
      setEditingService(null);
      setServiceName('');
      setDescription('');
      setPrice(0);
      setSchedules([{ day: '', time: '', trainer: '', maxCapacity: 0 }]);
      const updatedServices = await getServices();
      setServices(updatedServices);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error updating service');
    }
  };

  const handleDelete = async (name) => {
    try {
      await deleteServiceByName(name);
      setMessage(`Service "${name}" deleted successfully`);
      const updatedServices = await getServices();
      setServices(updatedServices);
    } catch (error) {
      setMessage(error.message || 'Error deleting service');
    }
  };

  const handleEdit = (service) => {
    setEditingService(service.name);
    setServiceName(service.name);
    setDescription(service.description);
    setPrice(service.price);
    setSchedules(service.schedule); // Load the existing schedules for editing
  };

  const handleChangeSchedule = (index, e) => {
    const values = [...schedules];
    values[index][e.target.name] = e.target.value;
    setSchedules(values);
  };

  const handleAddSchedule = () => {
    setSchedules([...schedules, { day: '', time: '', trainer: '', maxCapacity: 0 }]);
  };

  const handleRemoveSchedule = (index) => {
    const values = [...schedules];
    values.splice(index, 1);
    setSchedules(values);
  };

  return (
    <div>
      <h2>Manage Services</h2>
      {message && <p>{message}</p>}
      <form onSubmit={editingService ? handleUpdate : handleCreate}>
        <input
          type="text"
          placeholder="Service Name"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
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
        {schedules.map((session, index) => (
          <div key={index}>
            <input
              type="text"
              name="day"
              placeholder="Day"
              value={session.day}
              onChange={(e) => handleChangeSchedule(index, e)}
              required
            />
            <input
              type="time"
              name="time"
              placeholder="Time"
              value={session.time}
              onChange={(e) => handleChangeSchedule(index, e)}
              required
            />
            <input
              type="text"
              name="trainer"
              placeholder="Trainer"
              value={session.trainer}
              onChange={(e) => handleChangeSchedule(index, e)}
              required
            />
            <input
              type="number"
              name="maxCapacity"
              placeholder="Max Capacity"
              value={session.maxCapacity}
              onChange={(e) => handleChangeSchedule(index, e)}
              required
            />
            <button type="button" onClick={() => handleRemoveSchedule(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddSchedule}>Add Schedule</button>
        <button type="submit">{editingService ? 'Update Service' : 'Create Service'}</button>
        {editingService && <button type="button" onClick={() => setEditingService(null)}>Cancel</button>}
      </form>
      <h3>Available Services</h3>
      <ul>
        {services.map(service => (
          <li key={service._id}>
            {service.name} - {service.description} - ${service.price}
            <ul>
              {service.schedule.map((session, index) => (
                <li key={index}>
                  {session.day} at {session.time} with {session.trainer} (Max Capacity: {session.maxCapacity})
                </li>
              ))}
            </ul>
            <button onClick={() => handleEdit(service)}>Edit</button>
            <button onClick={() => handleDelete(service.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageServices;
