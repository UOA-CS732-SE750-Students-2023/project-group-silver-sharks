import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProductNavBar from "../components/ProductNavBar";
import StoreDisplayLayout from "../components/StoreDisplayLayout";
import PaginationBar from "../components/PaginationBar"; // 引入 PaginationBar 组件

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const grayBackgroundStyle = {
  backgroundColor: "#F1F1F1",
};

const ITEMS_PER_PAGE = 2;

const ProductSearchPage = () => {
  const sourcedProducts = useLoaderData();

  const [displayedProducts, setDisplayedProducts] = useState(sourcedProducts);

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

        setDisplayedProducts(data);
      } catch (error) {
        console.log(error)
      }

  };

  return (
    <>
      <div style={grayBackgroundStyle}>
        <ProductNavBar />
        <StoreDisplayLayout items={displayedProducts} />
        <PaginationBar
          itemsPerPage={ITEMS_PER_PAGE}
          onItemsChange={handleItemsChange}
          itemsLength={sourcedProducts.length}
        />
      </div>
    </>
  );
};

// loader function to fetch all the products in the store and display them initially

// instead of bloating app.js with loader functions, write it here and then export to app.js
export const loader = async () => {
  const response = await fetch("http://localhost:3000" + "/products");

  if (!response.ok) {
    // automatically converts to json for us
    return json({ message: "Could not fetch data." }, { status: 500 });
  } else {
    const data = await response.json();
    // returned data will be made available to the component being rendered as well as any other component
    // that needs it.
    return data;
  }
};

export default ProductSearchPage;
