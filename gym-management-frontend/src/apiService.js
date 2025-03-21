import axios from 'axios';


const API_URL = 'http://localhost:5000/api';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getPendingRegistrations = async () => {
  try {
      const response = await axios.get(`${API_URL}/users/pending`); // This should remain unchanged
      console.log('Response from /api/users/pending:', response);
      return response.data;
  } catch (error) {
      console.error('Error fetching pending registrations:', error);
      throw error.response.data;
  }
};

export const acceptRegistration = async (username) => {
  try {
    const response = await axios.put(`${API_URL}/users/accept`, { username });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const declineRegistration = async (username) => {
  try {
    const response = await axios.put(`${API_URL}/users/decline`, { username });
    return response.data;
  } catch (error) {
    console.error('Error in declineRegistration:', error?.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getServices = async () => {
  try {
    const response = await axios.get(`${API_URL}/services`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/Users`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${API_URL}/bookings`, bookingData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserBookings = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/bookings/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteUser = async (username) => {
  try {
    const response = await axios.delete(`${API_URL}/users`, { data: { username } });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateUser = async (username, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/users`, { username, ...updatedData });
    console.log("Updating user:", username);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createService = async (serviceData) => {
  try {
    const response = await axios.post(`${API_URL}/services`, serviceData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const deleteServiceByName = async (serviceName) => {
  try {
    console.log(`Attempting to delete service: ${serviceName}`);
    const response = await axios.delete(`${API_URL}/services/deleteByName/${serviceName}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response || error.message);
    throw error.response?.data || { message: 'Error deleting service' };
  }
};

export const updateService = async (serviceName, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/services/updateByName/${serviceName}`, updatedData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    const response = await axios.patch(`${API_URL}/bookings/cancel/${bookingId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


