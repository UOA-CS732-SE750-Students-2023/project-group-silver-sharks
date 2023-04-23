import React from 'react';

/*
    when adding functions to context, for the default just set an empty function 
    as a place order.

    For now just adding a test cart context to make sure that it works
*/

const ProductContext = React.createContext({
    count: 0,
    currentPage: 1,
    limit: 3,
    search: '',
    sortBy: '',
    category: '',
    updateCurrentPage: (currentPage) => {},
    updateCount: (count) => {}, 
    updateSearch: (search) => {}, 
    updateLimit: (limit) => {}, 
    updateCategory: (category) => {}, 
    updateSortBy: (sortBy) => {},
});

export default ProductContext;