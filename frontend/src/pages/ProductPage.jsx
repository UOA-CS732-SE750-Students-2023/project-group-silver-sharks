import React, { useState } from 'react';
import { useLoaderData,json } from "react-router-dom";
import { useParams } from 'react-router-dom';
import ProductLayout from '../components/ProductDetailComponents/ProductLayout';

const ProductPage = () => { 
    const product = useLoaderData();

    console.log(product)

    const params = useParams()
    console.log(+params.productid)  

    return (
        <ProductLayout product={product}/>
    );
}

export default ProductPage;

export const loader = async ({request,params}) => {
    const id = params.productid;

    console.log("line 24 " + id)

    const response = await fetch("http://localhost:3000/products/" + id);

    // throwing will send the data to the error page
    if (!response.ok){
        throw json({ message: 'Could not fetch details for product.'}, {
            status: 500,
        });
    } else {
          // react router will extract data from promise
        console.log(response)
        return response;
    }
};

