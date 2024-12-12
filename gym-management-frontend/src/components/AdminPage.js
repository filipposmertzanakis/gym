import React, { useState } from 'react';
import { deleteUser } from '../apiService';
import { updateUser } from '../apiService';
import { createService } from '../apiService'; 
import { Link } from 'react-router-dom';
import '../styles/AdminPage.css'; 
const AdminPage = () =>  {
    const [activeTab, setActiveTab] = useState('deleteUser'); // default to DeleteUser
  
    const deletepage = () => {
      return <a href='./DeleteUser.js'></a>;
    }; 
  
    return (
      <div className="admin-page">
        <h2>Admin Dashboard</h2>
        <div className="admin-menu">
          <button><a href="createService">Create Service</a></button>
          <button><a href='deleteUser'>Delete User</a></button>
          <button><a href='UpdateUser'>Update User</a></button>
        </div>
        <div className="admin-content">
         {/* renderContent() */} 
        </div>
      </div>
    );
  }
  
  export default AdminPage;