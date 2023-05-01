import React from 'react';

/*
    when adding functions to context, for the default just set an empty function 
    as a place order.

    For now just adding a test cart context to make sure that it works
*/

const ProductContext = React.createContext({
    isShow: false,
    reviewButton: true,
    showReview: () => {},
    hideReview: () => {},
    closeReviewButton: () => {},
    openReviewButton: () => {}
});

export default ProductContext;