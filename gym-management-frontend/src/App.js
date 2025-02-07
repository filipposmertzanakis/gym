import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Services from './components/Services';
import AdminPage from './components/AdminPage';
import DeleteUser from './components/DeleteUser';
import UpdateUser from './components/UpdateUser';
import News from './components/News';
import './styles/App.css';
import './styles/navbar.css';
import './styles/Services.css';
import Register_Requests from './components/Register_Requests';
import CreateService from './components/CreateService';
import DeleteServiceByName from './components/DeleteServiceByName';
import Booking from './components/Booking';
import Profile from './components/Profile';
import { useUser } from './context/UserContext';
import ManageServices from './components/ManageServices';
import './styles/modernGym.css';
import './styles/Home.css';

// HomePage Component
function HomePage() {
  const { user } = useUser(); // Get the user data from context

  return (
    <div>
      <h2>
        {user ? (
          <>
            Welcome, <span style={{ color: 'var(--accent)' }}>{user.username}</span>, to the Gym Management System
          </>
        ) : (
          'Welcome to the Gym Management System'
        )}
      </h2>
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

// Main App Component
function App() {
  const { user } = useUser(); // Access the user context
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu toggle

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <Router>
      <div>
        {/* Navbar */}
        <div className={`navbar ${isMenuOpen ? 'nav-open' : ''}`}>
          <div className="navbar-brand">
            <Link to="/" className='logo'>DS_Gym</Link>
            <button
              className="menu-toggle"
              onClick={toggleMenu}
              aria-label="Toggle navigation"
            >
              ☰
            </button>
          </div>
          <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            
            <Link to="/register" className="nav-link" onClick={toggleMenu}>
              Register
            </Link>
            <Link to="/login" className="nav-link" onClick={toggleMenu}>
              Login
            </Link>
            <Link to="/services" className="nav-link" onClick={toggleMenu}>
              Services
            </Link>
            {user && user.role === 'admin' && (
              <Link to="/AdminPage" className="nav-link" onClick={toggleMenu}>
                Admin page
              </Link>
            )}
            {user && user.status === 'active' && (
              <Link to="/Profile" className="nav-link" onClick={toggleMenu}>
                Profile
              </Link>
            )}
            <Link to="/News" className="nav-link" onClick={toggleMenu}>
              News
            </Link>
          </nav>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/AdminPage" element={<AdminPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/News" element={<News />} />
          <Route path="/services/Booking" element={<Booking />} />
          <Route path="/AdminPage/DeleteUser" element={<DeleteUser />} />
          <Route path="/AdminPage/CreateService" element={<CreateService />} />
          <Route path="/AdminPage/updateUser" element={<UpdateUser />} />
          <Route path="/AdminPage/Register_Requests" element={<Register_Requests />} />
          <Route path="/AdminPage/DeleteServiceByName" element={<DeleteServiceByName />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/AdminPage/ManageServices" element={<ManageServices />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
