import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Services from './components/Services';
import './styles/App.css';
import './styles/navbar.css';

//EDV EINAI TO HOME PAGE DHLADH H SELIDA POY UA EMFANIZETAI KATHE FORA POY ANOIGEI TO SITE
function HomePage() {
  return (
    <div>
      <h2>Welcome to the Gym Management System</h2>
      <p>This is your one-stop solution for gym management.</p>
      <div className="home-content">
        <h3>Features:</h3>
        <ul>
          <li>Track your workouts</li>
          <li>Manage memberships</li>
          <li>Access premium services</li>
        </ul>
        <button>Get Started</button>
      </div>
    </div>
  );
}

//EDV BAZOYME OTI THELOYME NA EMFANIZETAI SE OLES TIS SELIDES
function App() {
  return (
    <Router>
      <div className="App">
        <div className="navbar">
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
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
