import React, { useState } from 'react';
import { loginUser } from '../apiService';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const Login = () => {
  const [message, setMessage] = useState('');
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const user = await loginUser(credentials);
      if (user.status === 'active') {
        setUser(user); // Set user data in context
        console.log('User logged in:', user);
        navigate('/'); // Redirect to the home page after logging in
      } else {
        console.error('User is not active:', user.status);
        setMessage(`Your credentials are wrong or dont exist. Please retry`);
        // Optionally, display a message to the user.
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Your credentials are wrong or don’t exist. Please retry.');
      
    }
  };

  return (
    <div className='form-view'>
      <form className="form-login" onSubmit={handleSubmit}>
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
