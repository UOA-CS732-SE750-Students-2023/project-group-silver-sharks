import React, { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import ProductContext from "../store/product-context";
import StoreNavBar from "../components/StoreComponents/StoreNavBar";
import Cart from "../components/cart/Cart";
import ProfileNavBar from "../components/profile-nav/ProfileNavBar";
import AddReview from "../components/AuthorPageComponents/AddReview";

const StoreRootPage = () => {
  const [displayCart, setDisplayCart] = useState(false);
  const [displayProfileNav, setDisplayProfileNav] = useState(false);
  const [showReviewWindow, setShowReviewWindow] = useState(false);

  const productCtx = useContext(ProductContext);

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

  // close the modal window for adding reviews
  const closeReviewWindowHandler = () => {
    productCtx.hideReview()
  };

  return (
    <>
      {productCtx.isShow && (
        <AddReview closeReviewWindow={closeReviewWindowHandler} />
      )}
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
