
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
      const user = await registerUser(formData);
      console.log('User registered:', user);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    /* whenClicked is a property not an event, per se. 
    <!-<form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <button type="submit">Register</button>
      <h2>nigga2222</h2>
    </form>
    */

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
  );
};

export default Register;