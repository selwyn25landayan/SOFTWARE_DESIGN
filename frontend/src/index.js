import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { OrderDetailContextProvider } from './context/OrderDetailContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <OrderDetailContextProvider>
      <App />
    </OrderDetailContextProvider>
    
  </React.StrictMode>
);