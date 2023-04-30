import React , { useReducer } from 'react';
import ProductContext from './product-context';

const defaultState = {
    isShow: false,
};

// remember the previous state should not be changed 
// update the state in a immutable way
const productReducer = (state,action) => {

    if (action.type === 'OPEN_REVIEW'){
        
        let newValue = true;

        return {
            isShow: newValue
        };
    }

    if (action.type === 'CLOSE_REVIEW'){
        
        let newValue = false;

        return {
            isShow: newValue
        };
    }

    // if none of the conditions trigger
    return defaultState;
};

const ProductProvider = (props) => {

    const [productState, dispatchProductAction] = useReducer(productReducer, defaultState);

    const showReviewHandler = () => {
        dispatchProductAction({ type: 'OPEN_REVIEW' });
    };

    const hideReviewHandler = () => {
        dispatchProductAction({ type: 'CLOSE_REVIEW' });
    }
    
    const productContext = {
        isShow: productState.isShow, 
        showReview: showReviewHandler,
        hideReview: hideReviewHandler,
    };

    // basically this component decides who can use the context and sets the values for it
    return (
        <ProductContext.Provider value={productContext}>
            {props.children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;