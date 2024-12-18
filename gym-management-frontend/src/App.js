import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Services from './components/Services';
import AdminPage from './components/AdminPage';
import DeleteUser from './components/DeleteUser';
import UpdateUser from './components/UpdateUser';
import News from './components/News';
import './styles/App.css';
import './styles/navbar.css';
import Register_Requests from './components/Register_Requests';
import CreateService from './components/CreateService';
import DeleteServiceByName from './components/DeleteServiceByName';
import Booking from './components/Booking';
import { useUser } from './context/UserContext'

//EDV EINAI TO HOME PAGE DHLADH H SELIDA POY UA EMFANIZETAI KATHE FORA POY ANOIGEI TO SITE
function HomePage() {
  const { user } = useUser(); // Access the user context
  console.log('HomePage rendered, current user:', user);
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
  const { user } = useUser(); // Access the user context
  console.log('Current user:', user);
  return (
   <Router>
      <div className="App">
        <div className="navbar">
          <Link to="/">DS_Gym</Link>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="/services">Services</Link>
            {user && user.role === 'admin' && ( // Check if user is admin
              <Link to="/AdminPage">Admin page</Link>
            )}
            <Link to="News">News</Link>
          </nav>
        </div>
      
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/AdminPage" element={<AdminPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/News" element={<News/>} />
          <Route path="/services/Booking" element={<Booking/>} />
          <Route path="/AdminPage/DeleteUser"  element={<DeleteUser/>} />
          <Route path="/AdminPage/CreateService"  element={<CreateService/>} />
          <Route path="/AdminPage/updateUser" element={<UpdateUser/>} />
          <Route path="/AdminPage/Register_Requests" element={<Register_Requests/>} />
          <Route path="/AdminPage/DeleteServiceByName" element={<DeleteServiceByName/>} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
