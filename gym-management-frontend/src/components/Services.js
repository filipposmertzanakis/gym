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

  // an o user exei lavei ban metra tis meres mexri tin epomeni deftera
  let bannedMessage = null;
  if (user && user.status === 'active' && user.cancellationCounter >= 2) {
    const now = new Date();
    const currentDay = now.getDay(); // Sunday=0, Monday=1, Tuesday=2, ... Saturday=6
    let daysUntilMonday;
    if (currentDay === 1) {
      // an einai deftera ypethese mexri tin epomeni deftera
      daysUntilMonday = 7;
    } else if (currentDay === 0) {
      daysUntilMonday = 1;
    } else {
      daysUntilMonday = 8 - currentDay;
    }
    bannedMessage = (
      <p className="booking-warning">
        You are banned from booking for this week due to excessive cancellations.
        You can book again in {daysUntilMonday} {daysUntilMonday === 1 ? 'day' : 'days'}.
      </p>
    );
  }

  return (
    <div className="services-container">
      <h1>Services</h1>
      <ul className="services-list">
        {services.map((service) => (
          <li key={service._id} className="service-item" onClick={() => handleServiceClick(service)}>
            <h2>{service.name}</h2>
            <h2>{service.price}$</h2>
            <p>{service.description}</p>
            {service.trainer?.name && (
              <p className="gymnast-info">Gymnast: {service.trainer.name}</p>
            )}
            {user ? (
              user.status === 'active' ? (
                <>
                  {user.cancellationCounter < 2 ? (
                    <button>
                      <Link to="/services/Booking" state={{ service }}>
                        Book
                      </Link>
                    </button>
                  ) : (
                    bannedMessage
                  )}
                </>
              ) : null
            ) : (
              <button>
                <Link to="/login">
                  Login to book
                </Link>
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
