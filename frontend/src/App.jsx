import React from 'react'; 
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import './App.css';
import RootPage from './pages/Root';
import LandingPage from './pages/LandingPage';
import UsernamePage from './pages/UsernamePage';
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
import StripePage from './pages/StripePage';
import { loader as allProductsLoader } from './pages/ProductSearchPage';
import { loader as productLoader } from './pages/ProductPage';
import { action as sellAssetAction } from './components/SellAssetLayout';
import { loader as usernameLoader } from './components/StoreComponents/StoreNavBar';

const router = createBrowserRouter([
  {path:'/', element: <RootPage />, children: [
    {index: true, element: <LandingPage />},
    {path: 'username', element: <UsernamePage />},
    {path: 'login', element: <LoginPage />, action: loginAction},
    {path: 'signup', element: <SignupPage />, action: signupAction},
    {path:'store', element: <StoreRootPage />, loader: usernameLoader, id: 'username-loader', children: [
      {path:'product-search', element: <ProductSearchPage />, loader: allProductsLoader},
      {path: 'product/:productid', element: <ProductPage />, loader: productLoader},
      {path: 'author/:aid', element: <AuthorPage />},
      {path: 'payment', element: <StripePage />},
      {path: 'profile', element: <ProfileRoot />, children: [
        {index: true, element: <DashBoardPage />},
        {path: 'messages', element: <MessagesPage />},
        {path: 'purchase', element: <PurchasePage />},
        {path: 'selling', element: <SellingPage />},
      ]},
      {path: 'sell-asset', element: <SellAssetPage />, action: sellAssetAction}
    ]}, 
  ]},
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
