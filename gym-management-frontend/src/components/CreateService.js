import React, { useState, useEffect } from 'react';
import { createService, getUsers } from '../apiService';
import '../styles/create_service.css';

const CreateService = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [schedule, setSchedule] = useState([{ day: '', time: '', maxCapacity: 0 }]);
  const [price, setPrice] = useState(0);
  const [trainer, setTrainer] = useState('');
  const [message, setMessage] = useState('');
  const [gymnasts, setGymnasts] = useState([]);

  useEffect(() => {
    const fetchGymnasts = async () => {
      try {
        const users = await getUsers();
        const gymnastUsers = users.filter(user => user.role === 'gymnast');
        setGymnasts(gymnastUsers);
      } catch (error) {
        console.error('Error fetching gymnasts:', error);
      }
    };
    fetchGymnasts();
  }, []);

  const handleChangeSchedule = (index, e) => {
    const values = [...schedule];
    values[index][e.target.name] = e.target.value;
    setSchedule(values);
  };

  const handleAddSchedule = () => {
    setSchedule([...schedule, { day: '', time: '', maxCapacity: 0 }]);
  };

  const handleRemoveSchedule = (index) => {
    const values = [...schedule];
    values.splice(index, 1);
    setSchedule(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newService = { name, description, schedule, trainer, price };

    try {
      await createService(newService);
      setMessage('Service created successfully');
      // Reset form values
      setName('');
      setDescription('');
      setSchedule([{ day: '', time: '', maxCapacity: 0 }]);
      setPrice(0);
      setTrainer('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error creating service');
    }
  };

  return (
    <div className="create-service-container">
      <h2>Create New Service</h2>
      <form onSubmit={handleSubmit}>
      <label className='service-label'>Name:</label>
        <input
          type="text"
          className="input-field"
          placeholder="Service Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label className='service-label'>Description:</label>
        <textarea
          className="input-field"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className='service-label'>Assign Trainer (Gymnast):</label>
        <select
          className="input-field"
          value={trainer}
          onChange={(e) => setTrainer(e.target.value)}
          required
        >
          <option value="">Select Gymnast</option>
          {gymnasts.map((gymnast) => (
            <option key={gymnast._id} value={gymnast._id}>
              {gymnast.name} {gymnast.lastname}
            </option>
          ))}
        </select>
        {schedule.map((session, index) => (
          <div key={index} className="schedule-item">
            <label className='service-label'>Day:</label>
            <input
              type="date"
              className="input-field"
              name="day"
              placeholder="Day"
              value={session.day}
              onChange={(e) => handleChangeSchedule(index, e)}
              required
            />
            <label className='service-label'>Time:</label>
            <input
              type="time"
              className="input-field"
              name="time"
              placeholder="Time"
              value={session.time}
              onChange={(e) => handleChangeSchedule(index, e)}
              required
            />
            <label className='service-label'>Max Capacity:</label>
            <input
              type="number"
              className="input-field"
              name="maxCapacity"
              placeholder="Max Capacity"
              value={session.maxCapacity}
              onChange={(e) => handleChangeSchedule(index, e)}
              required
            />
            <button
              type="button"
              className="remove-button"
              onClick={() => handleRemoveSchedule(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" className="add-schedule-button" onClick={handleAddSchedule}>
          Add Schedule
        </button>
        <label className='service-label'>Price €:</label>
        <input
          type="number"
          className="input-field"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit" className="submit-button">
          Create Service
        </button>
      </form>
      {message && <p className="message-services">{message}</p>}
    </div>
  );
  
};

export default CreateService;
