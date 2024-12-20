import React from 'react';
import '../styles/ServiceModal.css'; // Optional: Add styles for the modal

const ServiceModal = ({ service, onClose }) => {
  if (!service) return null; // If no service is provided, return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{service.name}</h2>
        <p><strong>Description:</strong> {service.description}</p>
        <p><strong>Price:</strong> ${service.price}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ServiceModal;
