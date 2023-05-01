import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import StoreNavBar from "../components/StoreComponents/StoreNavBar";
import Cart from "../components/cart/Cart";
import ProfileNavBar from "../components/profile-nav/ProfileNavBar";

const StoreRootPage = () => {
  const [displayCart, setDisplayCart] = useState(false);
  const [displayProfileNav, setDisplayProfileNav] = useState(false);

  const showCartHandler = () => {
    setDisplayCart(true);
  };

  const hideCartHandler = () => {
    setDisplayCart(false);
  };

  const showProfileNav = () => {
    setDisplayProfileNav(true);
  };

  const hideProfileNav = () => {
    setDisplayProfileNav(false);
  };

  return (
    <>
      {displayCart && <Cart closeCart={hideCartHandler} />}
      {displayProfileNav && <ProfileNavBar closeProfileNav={hideProfileNav} />}
      <StoreNavBar
        showCart={showCartHandler}
        showProfileNavBar={showProfileNav}
      />
      <Outlet />
    </>
  );
};

export default StoreRootPage;
