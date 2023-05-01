import React , { useReducer } from 'react';
import ProductContext from './product-context';

const defaultState = {
    isShow: false,
    reviewButton: true,
};

// remember the previous state should not be changed 
// update the state in a immutable way
const productReducer = (state,action) => {

    if (action.type === 'OPEN_REVIEW'){
        
        let newValue = true;

        return {
            isShow: newValue, 
            closeReview: state.closeReview
        };
    }

    if (action.type === 'CLOSE_REVIEW'){
        
        let newValue = false;

        return {
            isShow: newValue, 
            closeReview: state.closeReview
        };
    }

    if (action.type === 'CLOSE_REVIEW_BUTTON'){ 
        let newValue = false; 

        return { 
            isShow: state.isShow, 
            closeReview: newValue
        }
    }

    if (action.type === 'OPEN_REVIEW_BUTTON'){ 

        let newValue = true;
        
        return { 
            isShow: state.isShow, 
            closeReview: newValue
        }
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

    const closeReviewButtonHandler = () => {
        dispatchProductAction({ type: 'CLOSE_REVIEW_BUTTON' });
    }

    const openReviewButtonHandler = () => {
        dispatchProductAction({ type: 'OPEN_REVIEW_BUTTON' });
    }
    
    const productContext = {
        isShow: productState.isShow, 
        reviewButton: productState.reviewButton,
        showReview: showReviewHandler,
        hideReview: hideReviewHandler,
        closeReviewButton: closeReviewButtonHandler, 
        openReviewButton: openReviewButtonHandler
    };

    // basically this component decides who can use the context and sets the values for it
    return (
        <ProductContext.Provider value={productContext}>
            {props.children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;