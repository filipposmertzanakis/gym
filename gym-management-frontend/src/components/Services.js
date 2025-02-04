import React, { useEffect, useState } from 'react';
import { getServices } from '../apiService';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import ServiceModal from './ServiceModal';
import '../styles/Services.css';


const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  return (
    <div className="services-container">
      <h1>Services</h1>
      <ul className="services-list">
        {services.map((service) => (
          <li key={service._id} className="service-item" onClick={() => handleServiceClick(service)}>
            <h2>{service.name}</h2>
            <h2>{service.price}$</h2>
            <p>{service.description}</p>
            {user && user.status === 'active' && (
              <button>
                <Link to="/services/Booking" state={{ service }}>Booking</Link>
              </button>
            )}
          </li>
        ))}
      </ul>
      {selectedService && (
        <ServiceModal service={selectedService} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Services;
