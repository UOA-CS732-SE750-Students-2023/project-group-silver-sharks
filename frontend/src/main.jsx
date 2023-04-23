import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductProvider from './store/ProductProvider';
import App from './App'

// adding the provider here means that the whole application can make use of the context
ReactDOM.createRoot(document.getElementById('root')).render(
  <ProductProvider><App /></ProductProvider>
);
