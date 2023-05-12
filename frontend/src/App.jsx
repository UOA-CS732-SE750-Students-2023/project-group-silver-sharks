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
import ProductPage, { action } from './pages/ProductPage';
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
import { action as sellAssetAction } from './pages/SellAssetPage';
import { loader as usernameLoader } from './pages/StoreRootPage';
import { loader as authorLoader } from './pages/AuthorPage';
import { action as productAction } from './pages/ProductPage';
import { loader as sellAssetLoader } from './pages/SellAssetPage';
import { loader as StripeCartLoader } from './pages/StripePage';
import { action as deleteAccountAction } from './pages/profile/DashboardPage';
import { action as deleteOtherAccountAction } from './pages/AuthorPage';
import { loader as dashboardLoader } from './pages/profile/DashboardPage';
import { action as removeCartItem } from './pages/StoreRootPage';
import { loader as purchaseAssetsLoader } from './pages/profile/PurchasePage';
import { loader as sellingAssetsLoader } from './pages/profile/SellingPage';
import { action as sellingPageAction } from './pages/profile/SellingPage';
import { action as ClearCartAction } from './pages/StripePage';
import { loader as MessagesLoader } from './pages/profile/MessagesPage';

const router = createBrowserRouter([
  {path:'/', element: <RootPage />, errorElement: <ErrorPage />,children: [
    {index: true, element: <LandingPage/>},
    {path: 'username', element: <UsernamePage />},
    {path: 'login', element: <LoginPage />, action: loginAction},
    {path: 'signup', element: <SignupPage />, action: signupAction},
    {path:'store', element: <StoreRootPage />, loader: usernameLoader, id: 'username-loader', action: removeCartItem , children: [
      {path:'product-search', element: <ProductSearchPage />, loader: allProductsLoader},
      {path: 'product/:productid', element: <ProductPage />, loader: productLoader, action: productAction},
      {path: 'payment', element: <StripePage />, loader: StripeCartLoader, action: ClearCartAction},
      {path: 'author/:aid', element: <AuthorPage />, loader: authorLoader, action: deleteOtherAccountAction},
      {path: 'profile', element: <ProfileRoot />, children: [
        {index: true, element: <DashBoardPage />, loader: dashboardLoader, action: deleteAccountAction},
        {path: 'messages', element: <MessagesPage />, loader: MessagesLoader},
        {path: 'purchase', element: <PurchasePage />, loader: purchaseAssetsLoader},
        {path: 'selling', element: <SellingPage />, loader: sellingAssetsLoader, action: sellingPageAction},
      ]},
      {path: 'sell-asset', element: <SellAssetPage />, loader: sellAssetLoader, action: sellAssetAction}
    ]}, 
  ]},
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
