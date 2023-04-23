import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProductNavBar from "../components/ProductNavBar";
import StoreDisplayLayout from "../components/StoreDisplayLayout";
import PaginationBar from "../components/PaginationBar";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const grayBackgroundStyle = {
  backgroundColor: "#F1F1F1",
};

const ITEMS_PER_PAGE = 3;

const ProductSearchPage = () => {
  // fetching all products from the backend
  const { products, count } = useLoaderData();

  const [displayedProducts, setDisplayedProducts] = useState(products);
  const [displayCount, setDisplayCount] = useState(count);
  const [filter, setFilter] = useState("default"); 
  const [category, setCategory] = useState('Images');
  const [pageNumber, setPageNumber] = useState(1);


  const categoryHandler = async (category) => {
    setCategory(category);

    // make request to backend with the latest info
    handleItemsChange.then((error) => {
      console.log(error);
    })
  };

  const filterHandler = (filter) => {
    setFilter(filter);

    // make request to backend with the latest info
    handleItemsChange.then((error) => {
      console.log(error);
    })
  };

  const pageNumberHandler = (currentPageNumber) => {
    setPageNumber(currentPageNumber);

    // make request to backend with the latest info
    handleItemsChange().catch((error) => {
      console.log(error);
    })
  }

  const handleItemsChange = async () => {

    console.log("page number " + pageNumber)
    console.log("sortBy " + filter)
    console.log("category " + category)

    // using the items per page constant and the current page number make request to backend for the products
    const response = await fetch(
      "http://localhost:3000/products/filter?" +
        new URLSearchParams({
          page: pageNumber,
          limit: ITEMS_PER_PAGE,
          sortBy: filter, 
          category: category
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
  };

  return (
    <>
      <div style={grayBackgroundStyle}>
        <ProductNavBar
          setSearchCategory={categoryHandler}
          setFilter={filterHandler}
        />
        <StoreDisplayLayout items={displayedProducts} />
        <PaginationBar
          itemsPerPage={ITEMS_PER_PAGE}
          onItemsChange={pageNumberHandler}
          itemsLength={displayCount}
          initialPage={pageNumber}
        />
      </div>
    </>
  );
};

// loader function to fetch all the products in the store and display them initially

// instead of bloating app.js with loader functions, write it here and then export to app.js

// by default: the images category will be loaded
export const loader = async () => {
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

    console.log("the count is: " + count);

    return {
      products,
      count,
    };
  }
};

export default ProductSearchPage;
