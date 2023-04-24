import React , { useReducer } from 'react';
import ProductContext from './product-context';

const defaultState = {
    count: 0,
    currentPage: 1,
    limit: 3,
    search: '',
    sortBy: '',
    category: '',
    firstLoad: true,
    isFilter: false, 
    isSearch: false,
};

// remember the previous state should not be changed 
// update the state in a immutable way
const productReducer = (state,action) => {

    if (action.type === 'CURRENT_PAGE'){
        
        let updatedCurrentPage = action.currentPage

        return {
            count: state.count,
            currentPage: updatedCurrentPage,
            limit: state.limit,
            search: state.search,
            sortBy: state.sortBy,
            category: state.category,
            firstLoad: state.firstLoad,
            isFilter: state.isFilter, 
            isSearch: state.isSearch,
        };
    }

    if (action.type === 'COUNT'){ 
        let newCount = action.count;

        return {
            count: newCount,
            currentPage: state.currentPage,
            limit: state.limit,
            search: state.search,
            sortBy: state.sortBy,
            category: state.category,
            firstLoad: state.firstLoad,
            isFilter: state.isFilter, 
            isSearch: state.isSearch,
        };
    }

    if (action.type === 'LIMIT'){ 
        let newLimit = action.LIMIT;

        return {
            count: state.count,
            currentPage: state.currentPage,
            limit: newLimit,
            search: state.search,
            sortBy: state.sortBy,
            category: state.category,
            firstLoad: state.firstLoad,
            isFilter: state.isFilter, 
            isSearch: state.isSearch,
        };
    }

    if (action.type === 'SEARCH'){ 
        let updatedSearch = action.search;

        return {
            count: state.count,
            currentPage: state.currentPage,
            limit: state.limit,
            search: updatedSearch,
            sortBy: state.sortBy,
            category: state.category,
            firstLoad: state.firstLoad,
            isFilter: state.isFilter, 
            isSearch: state.isSearch,
        };
    }

    if (action.type === 'SORT_BY'){ 
        let updatedSortBy = action.sortBy;

        return {
            count: state.count,
            currentPage: state.currentPage,
            limit: state.limit,
            search: state.search,
            sortBy: updatedSortBy,
            category: state.category,
            firstLoad: state.firstLoad,
            isFilter: state.isFilter, 
            isSearch: state.isSearch,
        };
    }

    if (action.type === 'CATEGORY'){ 
        let updatedCategory = action.category;

        return {
            count: state.count,
            currentPage: state.currentPage,
            limit: state.limit,
            search: state.search,
            sortBy: state.sortBy,
            category: updatedCategory,
            firstLoad: state.firstLoad,
            isFilter: state.isFilter, 
            isSearch: state.isSearch,
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

const ProductProvider = (props) => {

    const [productState, dispatchProductAction] = useReducer(productReducer, defaultState);

    const countHandler = (count) => {
        dispatchProductAction({ type: 'COUNT', count: count });
    };

    const currentPageHandler = (currentPage) => {
        dispatchProductAction({ type: 'CURRENT_PAGE', currentPage: currentPage });
    };

    const limitHandler = (limit) => {
        dispatchProductAction({ type: 'LIMIT', limit: limit });
    };

    const sortByHandler = (sortBy) => {
        dispatchProductAction({ type: 'SORT_BY', sortBy: sortBy });
    }

    const searchHandler = (search) => {
        dispatchProductAction({ type: 'SEARCH', search: search });
    }

    const categoryHandler = (category) => {
        dispatchProductAction({ type: 'CATEGORY', category: category });
    }

    const productContext = {
        category: productState.category, 
        count: productState.count,
        currentPage: productState.currentPage,
        limit: productState.limit,
        search: productState.search,
        sortBy: productState.sortBy,
        category: productState.category,
        firstLoad: productState.firstLoad,
        isFilter: productState.isFilter, 
        isSearch: productState.isSearch,
        updateCurrentPage: currentPageHandler,
        updateCount: countHandler, 
        updateSearch: searchHandler, 
        updateLimit: limitHandler, 
        updateCategory: categoryHandler, 
        updateSortBy: sortByHandler
    };

    // basically this component decides who can use the context and sets the values for it
    return (
        <ProductContext.Provider value={productContext}>
            {props.children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;