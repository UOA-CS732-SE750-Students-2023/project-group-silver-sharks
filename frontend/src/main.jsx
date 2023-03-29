import React from 'react'
import ReactDOM from 'react-dom/client'
import CartProvider from './store/CartProvider';
import App from './App'
import './index.css'

// adding the provider here means that the whole application can make use of the context
ReactDOM.createRoot(document.getElementById('root')).render(
  <CartProvider><App /></CartProvider>
);
