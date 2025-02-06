import React, { useState } from 'react';
import '../styles/AdminPage.css';
import { BrowserRouter as Router, Route, Routes, Link, } from 'react-router-dom';
const AdminPage = () =>  {
    return (
      <div className="admin-page">
        <h2>Admin Dashboard</h2>
        <div className="admin-menu">
          <Link to='DeleteUser' className='link'>Delete User</Link>
          <Link to='Register_Requests' className='link'>Register Requests</Link>
          <Link to='CreateService' className='link'>Create_Service</Link>
          <Link to='DeleteServiceByName' className='link'>deleteServiceByName</Link>
          <Link to='ManageServices' className='link'>ManageServices</Link>
        </div>
      </div>
    );
  }
  
  export default AdminPage