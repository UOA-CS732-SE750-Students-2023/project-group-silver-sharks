import React from 'react'; 
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import './App.css';
import RootPage from './pages/Root';
import LandingPage from './pages/LandingPage';
import LoginPage, {action as loginAction } from './pages/LoginPage';
import SignupPage, {action as signupAction } from './pages/SignupPage';
import ErrorPage from './pages/misc/ErrorPage';
import StoreRootPage from './pages/StoreRootPage';
import ProductSearchPage from './pages/ProductSearchPage';
import ProductPage from './pages/ProductPage';
import AuthorPage from './pages/AuthorPage';
import PurchasePage from './pages/profile/PurchasePage';
import MessagesPage from './pages/profile/MessagesPage';
import SellingPage from './pages/profile/SellingPage';
import DashBoardPage from './pages/profile/DashboardPage';
import ProfileRoot from './pages/profile/ProfileRoot';
import SellAssetPage from './pages/SellAssetPage';

const router = createBrowserRouter([
  {path:'/', element: <RootPage />, errorElement: <ErrorPage />, children: [
    {index: true, element: <LandingPage />},
    {path: 'login', element: <LoginPage />, action: loginAction},
    {path: 'signup', element: <SignupPage />, action: signupAction},
    {path:'store', element: <StoreRootPage />, children: [
      {path:'product-search', element: <ProductSearchPage />},
      {path: 'product/:productid', element: <ProductPage />},
      {path: 'author/:aid', element: <AuthorPage />},
      {path: 'profile', element: <ProfileRoot />, children: [
        {index: true, element: <DashBoardPage />},
        {path: 'messages', element: <MessagesPage />},
        {path: 'purchase', element: <PurchasePage />},
        {path: 'selling', element: <SellingPage />},
      ]},
      {path: 'sell-asset', element: <SellAssetPage />}
    ]}, 
  ]},
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
