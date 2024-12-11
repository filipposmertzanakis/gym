import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Services from './components/Services';
import './App.css';
import './navbar.css';

function App() {
  return (
    <Router>
      <div className="App">
        

      <div className='navbar'>
        <p>DS_Gym</p>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/services">Services</Link>
        </nav>
      </div>  

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<Services />} />
          <Route path="/" element={<h2>Welcome to the Gym Management System</h2>} />
        </Routes>
      </div>
      
    </Router>
    
  );
}

export default App;