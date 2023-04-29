import React, { useState } from 'react';
import { useLoaderData,json } from "react-router-dom";
import { useParams } from 'react-router-dom';
import ProductLayout from '../components/ProductLayout';

const ProductPage = () => { 
    const data = useLoaderData();

    const product = data[0];
    const author = data[1]; 

    return (
        <ProductLayout product={product} author={author}/>
    );
}

export default ProductPage;

export const loader = async ({request,params}) => {
    let returnData = [];
    
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
        const product = await response.json()

        returnData.push(product);

        // using the author id also fetch the author

        const data = await fetch("http://localhost:3000/account/id/" + product.author);

        if (!data.ok){
            throw json({ message: 'Could not fetch details for author of product.'}, {
                status: 500,
            });
        } else {

            const author = await data.json();

            returnData.push(author);

        }

        return returnData;

    }
};

