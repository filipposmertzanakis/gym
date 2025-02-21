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
    <div className="services-manager-container">
      <h2 className="services-manager-title">Manage Services</h2>
      {message && <p className="services-manager-message">{message}</p>}

      {/* Show Form Only When Editing a Service */}
      {isFormVisible && (
        <form className="services-manager-form"  onSubmit={handleUpdate}>
          <h3 className="services-manager-subtitle">Editing: {editingService}</h3>
          <label className="services-manager-label">Service Name</label>
          <input
            type="text"
            className="services-manager-input"
            placeholder="Service Name"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            required
            disabled
          />
          <label className="services-manager-label">Description</label>
          <textarea
            className="services-manager-input"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className="services-manager-label">Price</label>
          <input
            type="number"
            className="services-manager-input"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          {/* Trainer Selection */}
          <label className="services-manager-label">Select Trainer (Gymnast)</label>
          <select className="services-manager-input" value={trainer} onChange={(e) => setTrainer(e.target.value)} required>
            <option value="">Select Gymnast</option>
            {gymnasts.map((gymnast) => (
              <option key={gymnast._id} value={gymnast._id}>
                {gymnast.name} {gymnast.lastname}
              </option>
            ))}
          </select>

          {/* Schedules Section */}
          <h4 className="services-manager-subtitle">Schedules</h4>
          {schedules.map((session, index) => (
            <div className="services-manager-schedule-item" key={index}>
              <input
                type="date"
                name="day"
                className="services-manager-input"
                placeholder="Day"
                value={session.day}
                onChange={(e) => handleChangeSchedule(index, e)}
                required
              />
              <input
                type="time"
                name="time"
                className="services-manager-input"
                placeholder="Time"
                value={session.time}
                onChange={(e) => handleChangeSchedule(index, e)}
                required
              />
              <input
                type="number"
                name="maxCapacity"
                className="services-manager-input"
                placeholder="Max Capacity"
                value={session.maxCapacity}
                onChange={(e) => handleChangeSchedule(index, e)}
                required
              />
              <button className="services-remove-button" type="button" onClick={() => handleRemoveSchedule(index)}>Remove</button>
            </div>
          ))}
          <button className="services-add-button" type="button" onClick={handleAddSchedule}>Add Schedule</button>

          <button className="services-manager-submit" type="submit">Update Service</button>
          <button className="services-manager-cancel" type="button" onClick={() => setIsFormVisible(false)}>Cancel</button>
        </form>
      )}

      {/* List of Services */}
      <h3 className="services-manager-subtitle">Available Services</h3>
      <ul className="services-manager-list">
        {services.map(service => (
          <li className="services-manager-item" key={service._id}>
            <div className="services-manager-details">
              <span className="services-manager-name">{service.name}</span>
              
            </div>
            <div>
              <button className="services-manager-edit" onClick={() => handleEdit(service)}>Edit</button>
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageServices;
