import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Services from './components/Services';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Gym Management</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/services">Services</Link>
        </nav>
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