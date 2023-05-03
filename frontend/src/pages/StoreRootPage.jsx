import React, { useState } from "react";
import { Outlet, useLoaderData, json, redirect } from "react-router-dom";
import StoreNavBar from "../components/StoreComponents/StoreNavBar";
import Cart from "../components/cart/Cart";
import ProfileNavBar from "../components/profile-nav/ProfileNavBar";

const StoreRootPage = () => {

  const data = useLoaderData();

  const cartContents = data[1];

  console.log(Array.isArray(cartContents), 13);

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
      {displayCart && <Cart closeCart={hideCartHandler} cartContents={cartContents} />}
      {displayProfileNav && <ProfileNavBar closeProfileNav={hideProfileNav} />}
      <StoreNavBar
        showCart={showCartHandler}
        showProfileNavBar={showProfileNav}
        numItemsCart={cartContents.length}
      />
      <Outlet />
    </>
  );
};

export default StoreRootPage;

export const loader = async () => {

  let responseData = [];

  const userResponse = await fetch('http://localhost:3000/account/id/0');

  if (!userResponse.ok) {
     
      if (userResponse.status === 401){
          console.log("Not Authorized."); 
          return redirect("/");
      } 

      // 428 is returned if username is not set
      if (userResponse.status === 428){ 
          return redirect("/username");
      }

      return json({ message: "Could not fetch data from backend."}, { status: 500 });
  } 

  const user = await userResponse.json();
  
  localStorage.setItem('userId', userResponse._id);
  
  responseData.push(user);

  // fetch the cart contents
  const cartData = await fetch('http://localhost:3000/account/cart');

  // response will send the data to the error page
  if (!cartData.ok){
      throw json({ message: 'Could not get the users cart contents'}, {
          status: 500,
      });
  }
  // react router will extract data from promise
  const cartContents = await cartData.json();


  console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
  console.log("The users cart contents fetched in the loader are: "); 
  console.log(cartContents, 90);
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");

  responseData.push(cartContents.cartContents);

  return responseData;
}
