import React, { useEffect, useState } from 'react';
import { getPendingRegistrations } from '../apiService';

const Register_Requests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const data = await getPendingRegistrations();
        setRequests(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch pending requests');
      }
    };

    fetchPendingRequests();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Pending Registration Requests</h2>
      <ul>
        {requests.map((request) => (
          <li key={request._id}>
            {request.name} {request.lastname} ({request.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Register_Requests;