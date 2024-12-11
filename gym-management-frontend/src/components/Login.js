import React, { useState } from 'react';
import { loginUser } from '../apiService';
import '../styles/login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(credentials);
      console.log('User logged in:', user);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className='form-view'>
      <form className="form" onSubmit={handleSubmit}>
        <span className="input-span">
            <label htmlFor="username" className="label">Username</label>
            <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        </span>
        <span className="input-span">
            <label htmlFor="password" className="label">Password</label>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        </span>
        <span className="span"><a href="#">Forgot password?</a></span>
        <input className="submit" type="submit" defaultValue="Log in" />
        <span className="span">Don't have an account? <a href="register">Sign up</a></span>
      </form>
    </div>  
  );
};

export default Login;
