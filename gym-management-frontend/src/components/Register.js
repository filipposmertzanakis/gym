
import React, { useState } from 'react';
import { registerUser } from '../apiService';

import '../styles/Register.css'; 

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    lastname: '',
    email: '',
    address:{
      country: '',
      city: '',
      street: ''
    }
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send registration request to admin
      const response = await registerUser(formData);
      console.log('Registration request sent:', response);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div class="page-container">
      <div class="register-form">
        <form className="form" onSubmit={handleSubmit}>
          <p className="title">Register </p>
          <p className="message">Signup now and get full access to our gym. </p>

          <div className="flex">
            <label>
            <input className="input" type="text" name="name" placeholder required onChange={handleChange} />
              <span>Firstname</span>
            </label>
            <label>
            <input className="input" type="text" name="lastname" placeholder required onChange={handleChange} />
              <span>Lastname</span>
            </label>
          </div>
          <label>
            <input className="input" type="text" name="address.country" placeholder required onChange={handleChange} />
            <span>Country</span>
          </label>
          <label>
          <input className="input" type="text" name="address.city" placeholder required onChange={handleChange} />
            <span>City</span>
          </label>
          <label>
          <input className="input" type="text" name="address.street" placeholder required onChange={handleChange} />
            <span>Street&number</span>
          </label>
          <label>
            <input className="input" type="text" name="username" placeholder required onChange={handleChange} />
            <span>Username</span>
          </label>
          <label>
            <input className="input" type="email" name="email" placeholder required onChange={handleChange} />
            <span>Email</span>
          </label>
          <label>
            <input className="input" type="password" name="password" placeholder required onChange={handleChange} />
            <span>Password</span>
          </label>
          <label>
            <input className="input" type="password" name="password" placeholder required onChange={handleChange} />
            <span>Confirm password</span>
          </label>
          <button className="submit" type="submit">Request for Register!</button>
          <p className="signin">Already have an acount ? <a href="#">Signin</a> </p>
        </form>
      </div>
    </div>
    
  );
};

export default Register;