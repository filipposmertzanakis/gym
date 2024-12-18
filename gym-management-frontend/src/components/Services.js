import React, { useEffect, useState } from 'react';
import { getServices  } from '../apiService';
import { BrowserRouter as Router, Route, Routes, Link, } from 'react-router-dom';


const Services = () => {
  const [services, setServices] = useState([]);

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

  return (
    <div>
      <h1>Services</h1>
      <ul>
        {services.map((service) => (
          <li key={service._id}>
            {service.name}
            <button>
              <Link to="/services/Booking" state={{ service }}>Booking</Link>
            </button>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default Services;
