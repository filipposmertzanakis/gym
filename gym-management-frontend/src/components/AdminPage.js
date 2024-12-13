import React, { useState } from 'react';
import DeleteUser from './DeleteUser';
import UpdateUser from './UpdateUser';
import { BrowserRouter as Router, Route, Routes, Link, } from 'react-router-dom';
const AdminPage = () =>  {
    return (
      <div className="admin-page">
        <h2>Admin Dashboard</h2>
        <div className="admin-menu">
          <button><Link to='DeleteUser'>Delete User</Link></button>
          <button><Link to='UpdateUser'>Update User</Link></button>
          <button><Link to='Register_Requests'>Register_Requests</Link></button>
        </div>
      </div>
    );
  }
  
  export default AdminPage;