import React, { useState } from 'react'; 
import { Outlet } from 'react-router-dom'; 
import StoreNavBar from '../components/StoreComponents/StoreNavBar';
import Cart from '../components/cart/Cart';

const StoreRootPage = () => { 
    const [displayCart, setDisplayCart] = useState(false);

    const showCartHandler = () => { 
        setDisplayCart(true);
    }

    const hideCartHandler = () => {
        setDisplayCart(false);
    }

    return (
        <>  
            {displayCart && <Cart closeCart={hideCartHandler}/>}
            <StoreNavBar showCart={showCartHandler}/>
            STORE 
            STORE
            STORE
            <Outlet />
        </>

    );
}

export default StoreRootPage;