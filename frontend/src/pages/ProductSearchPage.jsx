import React, { useState } from "react";
import { useLoaderData, json } from "react-router-dom";
import ProductNavBar from "../components/ProductNavBar";
import StoreDisplayLayout from "../components/StoreDisplayLayout";
import ReactPaginate from 'react-paginate';
import "../components/PaginationBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";


const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const grayBackgroundStyle = {
  backgroundColor: "#F1F1F1",
};

const ITEMS_PER_PAGE = 6;

const ProductSearchPage = () => {
  // fetching all products from the backend
  const { products, count } = useLoaderData();

  const [displayedProducts, setDisplayedProducts] = useState(products);
  const [displayCount, setDisplayCount] = useState(count);
  const [filter, setFilter] = useState("default"); 
  const [category, setCategory] = useState('Images');
  const [pageNumber, setPageNumber] = useState(1);
  const [notFound, setNotFound] = useState(false);
  const [storedSearchTerm, setStoredSearchTerm] = useState('');
  const [isSearchStore, setIsSearchStore] = useState(false);
  const [changeState, setChangeState] = useState(false);

  const categoryHandler = async (category) => {
    setIsSearchStore(false);
    setCategory(category);
    setPageNumber(1); 
    const response = await handleItemsChange(1, category, undefined, false, undefined);
    
    setChangeState((previous => !previous));
  };

  const filterHandler = async (filter) => {
    setIsSearchStore(false);
    setFilter(filter);
    setPageNumber(1);
    const response = await handleItemsChange(1, undefined, filter, false, undefined)

    setChangeState((previous => !previous));
  };

  const pageNumberHandler = async (currentPageNumber, searchTerm, isSearch) => {
    setPageNumber(currentPageNumber);
    const response = await handleItemsChange(currentPageNumber, undefined, undefined, isSearch, searchTerm);
  }

  const searchByPhraseHandler = async (searchTerm) => {
    setStoredSearchTerm(searchTerm)
    setIsSearchStore(true);

    setPageNumber(1);

    const response = await handleItemsChange(pageNumber, undefined, undefined, true, searchTerm);

    setChangeState((previous => !previous));
  }

  const handleItemsChange = async (currentPageNumber, specifiedCategory, specifiedFilter, isSearch, enteredSearchTerm) => {
    setNotFound(false);
    
    const currentFilter = specifiedFilter || filter; 
    const currentCategory = specifiedCategory || category;
    const searchTerm = enteredSearchTerm || '';

    console.log("handleItemsChange")
    console.log("page number " + currentPageNumber)
    console.log("sortBy " + currentFilter)
    console.log("category " + currentCategory)
    console.log("search " + searchTerm)
    console.log("is search" + isSearch)
  
    if (!isSearch){
      const response = await navigateHandler(currentPageNumber, currentCategory, currentFilter)
    } else {
      if (searchTerm.length !== 0){
        const response = await searchHandler(currentPageNumber, searchTerm);
      } else {
        // when the search bar is empty then go back to displaying the first page of images
        setIsSearchStore(false);
        setCategory('Images'); // Update the category state here
        const response = await navigateHandler(1, "Images", currentFilter)
      }
    }
  };
  

  const searchHandler = async (currentPageNumber, searchTerm) => {
    const response = await fetch(
      "http://localhost:3000/products/search?" +
        new URLSearchParams({
          page: currentPageNumber,
          limit: ITEMS_PER_PAGE,
          search: searchTerm
        })
    );
    
    if (response.status === 404){
      setNotFound(true);
      return;
    }

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();
    console.log(data);
    
    const products = data[0];
    const count = data[1];

    setDisplayedProducts(products);
    setDisplayCount(count);
  }

  const navigateHandler = async (currentPageNumber, currentCategory, currentFilter) => {

    console.log("------------------------------------")
    console.log("currentPageNumber: " + currentPageNumber)
    console.log("category: " + currentCategory)
    console.log("currentFilter: " + currentFilter)
    console.log("------------------------------------")

    // using the items per page constant and the current page number make request to backend for the products
    const response = await fetch(
      "http://localhost:3000/products/filter?" +
        new URLSearchParams({
          page: currentPageNumber,
          limit: ITEMS_PER_PAGE,
          sortBy: currentFilter, 
          category: currentCategory
        })
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();

    console.log(data);

    // 0th index includes -> products
    // 1st index has the count

    const products = data[0];
    const count = data[1];

    setDisplayedProducts(products);
    setDisplayCount(count);
    /*
    if (searchFieldEmpty){
      console.log("search field is empty");
      setChangeState((prev) => !prev);
    }
    */
  }

  return (
    <>
      <div style={grayBackgroundStyle}>
        <ProductNavBar
          setSearchCategory={categoryHandler}
          setFilter={filterHandler}
          setSearchTerm={searchByPhraseHandler}
          notFound={notFound}
          displayCount={displayCount}
          category={category}
        />
        <StoreDisplayLayout items={displayedProducts} notFound={notFound}/>
        <div className="pagination-container" style={grayBackgroundStyle}>
          <div className="pagination-wrapper">
            <ReactPaginate
              breakLabel="..."
              nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
              onPageChange={(data) =>
                pageNumberHandler(data.selected + 1, storedSearchTerm, isSearchStore)
              }
              pageCount={Math.ceil(displayCount / ITEMS_PER_PAGE)}
              marginPagesDisplayed={1}
              pageRangeDisplayed={5}
              previousLabel={<FontAwesomeIcon icon={faChevronLeft} />} 
              renderOnZeroPageCount={null}
              initialPage={0}
              forcePage={pageNumber - 1}
              containerClassName="pagination"
              activeClassName="active"
              disabledClassName="disabled"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              nextClassName="page-item"
              previousLinkClassName="page-link previous-label"
              nextLinkClassName="page-link next-label"
              breakClassName="page-item"
              breakLinkClassName="page-link"
            />
          </div>
        </div>
      </div>
    </>
  );  
};

// loader function to fetch all the products in the store and display them initially
// instead of bloating app.js with loader functions, write it here and then export to app.js
// by default: the images category will be loaded
export const loader = async () => {

  console.log("loader")


  const response = await fetch(
    "http://localhost:3000/products/filter?" +
      new URLSearchParams(
        {
          page: 1,
          limit: ITEMS_PER_PAGE, 
          category: 'Images', 
          sortBy: 'default'
        }
      )
  );

  if (!response.ok) {
    // automatically converts to json for us
    return json({ message: "Could not fetch data." }, { status: 500 });
  } else {
    const data = await response.json();

    console.log(data);

    // 0th index includes -> products
    // 1st index has the count

    const products = data[0];
    const count = data[1];

    console.log(products)

    return {
      products,
      count,
    };
  }
};

export default ProductSearchPage;