import React from 'react';

/*
    when adding functions to context, for the default just set an empty function 
    as a place order.

    For now just adding a test cart context to make sure that it works
*/

const CartContext = React.createContext({
    totalAmount: 0,
    incrementTotalAmount: () => {},
    decrementTotalAmount: () => {}
});

export default CartContext;