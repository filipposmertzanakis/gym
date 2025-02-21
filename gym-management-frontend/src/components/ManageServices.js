import React, { useState, useEffect } from 'react';
import { getServices, updateService, deleteServiceByName, getUsers } from '../apiService';
import '../styles/manage_services.css';
const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [schedules, setSchedules] = useState([{ day: '', time: '', trainer: '', maxCapacity: 0 }]);
  const [trainer, setTrainer] = useState('');
  const [editingService, setEditingService] = useState(null);
  const [message, setMessage] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [gymnasts, setGymnasts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesData = await getServices();
        setServices(servicesData);

        const usersData = await getUsers();
        const gymnastUsers = usersData.filter(user => user.role === 'gymnast');
        setGymnasts(gymnastUsers);
      } catch (error) {
        setMessage(`Error fetching data: ${error.message || 'Unknown error'}`);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingService) return;

    const updatedService = { 
      name: serviceName, 
      description, 
      price, 
      schedule: schedules,
      trainer 
    };

    try {
      await updateService(editingService, updatedService);
      setMessage('Service updated successfully');
      setEditingService(null);
      setIsFormVisible(false);
      setServiceName('');
      setDescription('');
      setPrice(0);
      setTrainer('');
      setSchedules([{ day: '', time: '', trainer: '', maxCapacity: 0 }]);
      const updatedServices = await getServices();
      setServices(updatedServices);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Could not update service. Please retry.');
    }
  };

  const handleEdit = (service) => {
    setEditingService(service.name);
    setServiceName(service.name);
    setDescription(service.description);
    setPrice(service.price);
    setTrainer(service.trainer);
    setSchedules(service.schedule);
    setIsFormVisible(true);
  };

  const handleDelete = async (name) => {
    try {
      await deleteServiceByName(name);
      setMessage(`Service "${name}" deleted successfully`);
      const updatedServices = await getServices();
      setServices(updatedServices);
    } catch (error) {
      setMessage(error.message || 'Could not delete service at the moment. Please retry');
    }
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

      {/* Show Form Only When Editing a Service */}
      {isFormVisible && (
        <form onSubmit={handleUpdate}>
          <h3>Editing: {editingService}</h3>
          <input
            type="text"
            placeholder="Service Name"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            required
            disabled
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

          {/* Trainer Selection */}
          <label>Select Trainer (Gymnast):</label>
          <select value={trainer} onChange={(e) => setTrainer(e.target.value)} required>
            <option value="">Select Gymnast</option>
            {gymnasts.map((gymnast) => (
              <option key={gymnast._id} value={gymnast._id}>
                {gymnast.name} {gymnast.lastname}
              </option>
            ))}
          </select>

          {/* Schedules Section */}
          <h4>Schedules</h4>
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

          <button type="submit">Update Service</button>
          <button type="button" onClick={() => setIsFormVisible(false)}>Cancel</button>
        </form>
      )}

      {/* List of Services */}
      <h3>Available Services</h3>
      <ul>
        {services.map(service => (
          <li key={service._id}>
            {service.name} - {service.description} - ${service.price}
            <br />
            <strong>Trainer:</strong> {gymnasts.find(g => g._id === service.trainer)?.name || 'Not Assigned'}
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
