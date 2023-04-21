import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProductNavBar from "../components/ProductNavBar";
import StoreDisplayLayout from "../components/StoreDisplayLayout";
import PaginationBar from "../components/PaginationBar"; // 引入 PaginationBar 组件

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const grayBackgroundStyle = {
  backgroundColor: "#F1F1F1",
};

const ITEMS_PER_PAGE = 3;

const ProductSearchPage = () => {
    // fetching all products from the backend
  const { products, count } = useLoaderData();

  const [displayedProducts, setDisplayedProducts] = useState(products);

  // images, music, videos, services
  const [category, setCategoryHandler] = useState('Images'); 
  //popularity, newest, Price: Low to High, Price: High to Low
  const [filter, setFilterHandler] = useState('');

  const handleItemsChange = async (currentPageNumber) => {
    // using the items per page constant and the current page number make request to backend for the products
    try {
        const response = await fetch(
          "http://localhost:3000/products?" +
            new URLSearchParams({
              page: currentPageNumber,
              limit: ITEMS_PER_PAGE,
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
      } catch (error) {
        console.log(error)
      }
  };

  return (
    <>
      <div style={grayBackgroundStyle}>
        <ProductNavBar setSearchCategory={setCategoryHandler} setFilter={setFilterHandler}/>
        <StoreDisplayLayout items={displayedProducts} />
        <PaginationBar
          itemsPerPage={ITEMS_PER_PAGE}
          onItemsChange={handleItemsChange}
          itemsLength={count}
        />
      </div>
    </>
  );
};

// loader function to fetch all the products in the store and display them initially

// instead of bloating app.js with loader functions, write it here and then export to app.js
export const loader = async () => {
    const response = await fetch(
        "http://localhost:3000/products?" +
          new URLSearchParams({
            page: 1,
            limit: ITEMS_PER_PAGE,
          }, {

          })
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

    console.log("the count is: " + count)

    return {
        products, 
        count
    }
  }
};

export default ProductSearchPage;
