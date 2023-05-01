import React, { useState, useContext } from 'react';
import { useLoaderData,json,redirect } from "react-router-dom";
import { useParams } from 'react-router-dom';
import ProductLayout from '../components/ProductDetailComponents/ProductLayout';
import ProductContext from '../store/product-context';


const ProductPage = () => { 
    const productCtx = useContext(ProductContext);

    const data = useLoaderData();
    const params = useParams();

    const productId = params.productid;

    const product = data[0];
    const author = data[1];
    const reviews = data[2]; 
    const loggedInUser = data[3];

    console.log(loggedInUser, 22)

    console.log(author, 24)

    console.log(reviews, 26)
    
    let userType = "normal";

    // determine whether the user is admin or normal and whether the user is the author for the product
    if (author._id === loggedInUser._id || loggedInUser.accountType === "admin"){
        userType = "admin";
    }

    console.log("user type: " + userType)

    return (
        <>
            <ProductLayout product={product} author={author} reviews={reviews} userType={userType}/>
        </>
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

        console.log("line 80", 80)

        // fetching the reviews for the product

        const reviewsData = await fetch("http://localhost:3000/products/pid/" + id + "/reviews");

        if (!reviewsData.ok){
            throw json({ message: 'Could not fetch reviews for product.'}, {
                status: 500,
            });
        } else {

            const reviews = await reviewsData.json();

            console.log("----------------------------------------------------");
            console.log("reviews inside loader", 103)
            console.log(reviews);
            console.log("----------------------------------------------------");

            returnData.push(reviews);
        }

        console.log("line 101", 101)


        // fetching the current logged in users details

        // using the user id also fetch the user
        const userData = await fetch("http://localhost:3000/account/id/0");

        if (!userData.ok){
            throw json({ message: 'Could not fetch details for user.'}, {
                status: 500,
            });
        } else {
            const user = await userData.json();
            returnData.push(user);
        }

        console.log("line 101", 101)
    }

    return returnData;
};

export const action = async ({request,params}) => {
    // getting the form data from request argument 
    const formData = await request.formData();

    // get the id of the product 
    const productId = params.productid;

    // getting the http method from the request argument
    const method = request.method;

    // check whether the request is a delete or a post

    if (method === 'DELETE'){ 

        console.log("inside the delete part of the action", 110)

        const response = await fetch("http://localhost:3000/products/" + productId, {
            method: method,
        });

        if (!response.ok){ 
            throw json({ message: 'Could not delete product.'}, { status: 500 });
        }

        console.log("product deleted action", 118)

        // redirect to the product search page
        return redirect('/store/product-search');
    }

    console.log("----------------------------------------------------")
    console.log("The product id is: ");
    console.log(productId)
    console.log("----------------------------------------------------")
    
    const reviewData = {
        text: formData.get('review'), 
        rating: +formData.get('rating')
    };

    console.log("----------------------------------------------------")
    console.log("this is the review object being posted to backend");
    console.log(reviewData);
    console.log("----------------------------------------------------")
    
    const url = "http://localhost:3000/products/pid/" + productId + "/review";
    console.log(url)

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
    });
  
    if (!response.ok){
        // backend throws 422 when data entered in form is invalid
        if (response.status === 422){
            return response;
        }
  
        throw json({ message: "Could not save review."}, { status: 500 });
    }
  
    // redirect the user after submitting 
    return { 
        outcome: "success", 
        message: "review added successfully"
    };
};

