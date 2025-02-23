import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './context/UserContext'; // Import UserProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider> {/* Wrap App with UserProvider */}
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
