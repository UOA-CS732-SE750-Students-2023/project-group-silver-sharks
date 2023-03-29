import React , { useReducer } from 'react';
import CartContext from './cart-context';

const defaultState = {
    totalAmount: 0,
};

// remember the previous state should not be changed 
// update the state in a immutable way
const cartReducer = (state,action) => {
    
    if (action.type === 'INCREMENT'){
        let currentAmount = state.totalAmount; 
        currentAmount++; 

        return { 
            totalAmount: currentAmount
        };
    }

    if (action.type === 'DECREMENT'){
        let currentAmount = state.totalAmount; 
        currentAmount--; 

        return { 
            totalAmount: currentAmount
        };
    }

    // if none of the conditions trigger
    return defaultState;
};


/*
    goal of this component is to manage the cart context data and provide 
    that data to all other components that want access to it.
    
    Every component that will need to make use of this context, 
    will need to be wrapped by CartContext.Provider, in order to be able to use 
    it.
*/

const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultState);

    const incrementHandler = () => {
        dispatchCartAction({type: 'INCREMENT'});
    };

    const decrementHandler = () => {
        dispatchCartAction({type: 'DECREMENT'});
    };

    const cartContext = {
        totalAmount: cartState.totalAmount, 
        incrementTotalAmount: incrementHandler,
        decrementTotalAmount: decrementHandler,
    };

    // basically this component decides who can use the context and sets the values for it
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;