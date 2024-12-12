import React, { useState } from 'react';
import { deleteUser } from '../apiService';
import { updateUser } from '../apiService';
const AdminPage = () =>  {
    const [activeTab, setActiveTab] = useState('deleteUser'); // default to DeleteUser
  
    const renderContent = () => {
      switch (activeTab) {
        case 'deleteUser':
          return <DeleteUser />;
        case 'updateUser':
          return <UpdateUser />;
        default:
          return <p>Select an option from the menu.</p>;
      }
    };
  
    return (
      <div className="admin-page">
        <h2>Admin Dashboard</h2>
        <div className="admin-menu">
          <button onClick={() => setActiveTab('deleteUser')}>Delete User</button>
          <button onClick={() => setActiveTab('updateUser')}>Update User</button>
        </div>
        <div className="admin-content">
          {renderContent()}
        </div>
      </div>
    );
  }
  
  export default AdminPage;