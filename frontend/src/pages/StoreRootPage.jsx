import React, { useState } from 'react'; 
import { Outlet } from 'react-router-dom'; 
import StoreNavBar from '../components/StoreNavBar';
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
            <Outlet />
        </>

    );
}

export default StoreRootPage;