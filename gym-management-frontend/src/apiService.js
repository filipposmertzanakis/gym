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
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};