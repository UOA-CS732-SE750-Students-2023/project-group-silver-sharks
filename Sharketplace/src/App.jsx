import React from 'react'; 
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import HomePage from './pages/HomePage';
import OtherPage from './pages/OtherPage';


const router = createBrowserRouter([
  {path:'/', element: <MainPage />, children: [
    {index: true, element: <HomePage />}, 
    {path: 'first', element: <OtherPage/>}, 
  ]},
]);



function App() {
  return <RouterProvider router={router} />
}

export default App;
