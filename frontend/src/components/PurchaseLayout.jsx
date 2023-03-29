import React, { useContext } from 'react';
import CartContext from '../store/cart-context';

const PurchaseLayout = () => { 
    const cartContext = useContext(CartContext);

    const incrementCartTotalAmountHandler = () => {
        cartContext.incrementTotalAmount();
    };   

    const decrementCartTotalAmountHandler = () => {
        cartContext.decrementTotalAmount();
    };


    return (
        <>
            <div> 
                <h1>This is the purchase layout</h1>
            </div>
            <div>
                <button onClick={incrementCartTotalAmountHandler}>+</button>
                <button onClick={decrementCartTotalAmountHandler}>-</button>
            </div>
        </>
    );
}

export default PurchaseLayout;