import React, { useState } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Services from './components/Services';
import AdminPage from './components/AdminPage';
import DeleteUser from './components/DeleteUser';
import UpdateUser from './components/UpdateUser';
import News from './components/News';
import ArticlePage from './components/ArticlePage'; 
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

// HomePage component
function HomePage() {
  const { user } = useUser(); 

  return (
    <div className='home-container'>
      <h2>
        {user ? (
          <>
            Welcome, <span style={{ color: 'var(--accent)' }}>{user.username}</span>, to the DS GYM!!
          </>
        ) : (
          'Welcome to the DS GYM!!'
        )}
      </h2>
      <p>This is your one-stop solution for your new GymLife!!</p>
      <div className="home-content">
        <h3>Features:</h3>
        <ul>
          <li>Track your workouts</li>
          <li>Manage memberships</li>
          <li>Access premium services</li>
        </ul>
       
      </div>
    </div>
  );
}

// Main App component
function App() {
  const { user, logout } = useUser(); // prosvasi se user context kai logout 
  const [isMenuOpen, setIsMenuOpen] = useState(false); //  menu toggle
  const navigate = useNavigate(); 

  // Toggle menu 
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // diaxeirisi logout kai redirect to home
  const handleLogout = () => {
    logout();
    toggleMenu();
    navigate('/'); // Redirect to home 
  };

  return (
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
          {!user && (
            <>
              <Link to="/register" className="nav-link" onClick={toggleMenu}>
                Register
              </Link>
              <Link to="/login" className="nav-link" onClick={toggleMenu}>
                Login
              </Link>
              <Link to="/News" className="nav-link" onClick={toggleMenu}>
            News
          </Link>
            </>
          )}
          {user && (
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          )}
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
          {user && user.status === 'active' && (
          <Link to="/News" className="nav-link" onClick={toggleMenu}>
            News
          </Link>
          )}
        </nav>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/News" element={<News />} />
        <Route path="/News/:articleId" element={<ArticlePage />} />
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
  );
}

export default App;
