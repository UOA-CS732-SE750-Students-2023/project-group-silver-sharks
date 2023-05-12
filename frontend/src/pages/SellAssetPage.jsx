import React from 'react'; 
import { json, redirect, useLoaderData } from 'react-router-dom';
import SellAssetLayout from '../components/SellAssetLayout';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const SellAssetPage = () => { 
    const STRIPE_PUBLIC_KEY="pk_test_51N1lMJFS4UEikyYAt7Nwhaua9GihCbBx7J0Jl7MgqUzuhxfHGF5wwW10ZfoXPQep3gKpvsT9nyNVQYMy98mxrhUE00qyHLmDg1"
    const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);  

    const { userId, userStripeId} = useLoaderData();

    return (
        <Elements stripe={stripePromise}>
            <SellAssetLayout userId={userId} userStripeId={userStripeId}/>
        </Elements>
    );
}

export default SellAssetPage;

export const loader = async ({request,params}) => {

    // get the user id 
    // /account/id/:id
    const response = await fetch('http://localhost:3000/account/id/0');

    // throwing will send the data to the error page
    if (!response.ok){
        throw json({ message: 'Could not fetch details for the users account.'}, {
            status: 500,
        });
    }
    // react router will extract data from promise
    const user = await response.json();

    return {
        userId: user._id, 
        userStripeId: user.stripeId
    };
};

export const action = async ({request,params}) => {
    
    // get the user id 
    // /account/id/:id
    const response = await fetch('http://localhost:3000/account/id/0');

    // throwing will send the data to the error page
    if (!response.ok){
        throw json({ message: 'Could not fetch details for the users account.'}, {
            status: 500,
        });
    }
    // react router will extract data from promise
    const user = await response.json();

    // getting the form data from request argument 
    const formData = await request.formData();
    const sellingProductData = {
        name: formData.get('title'),
        description: formData.get('description'),
        category: formData.get("category"),
        price: +formData.get('price')
    };
    

    // getting the http method from the request argument
    const method = request.method;

    // first post request to upload the text data for the new listed product
    const textResponse = await fetch('http://localhost:3000/products/sell/' + user._id, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sellingProductData)
    });
  
    if (!textResponse.ok){
        throw json({ message: "Could not successfully submit the text data for the sell assets action."}, { status: 500 });
    }

    const newProduct = await textResponse.json()

    // second post request to submit the cover image
    const coverImageFormData = new FormData();

    // get the references 
    const coverImage = document.getElementById("cover-image");
    const files = document.getElementById("files");


    for (let i=0; i < coverImage.files.length; i++){
        coverImageFormData.append("cover-image", coverImage.files(i));
    }

    const fileResponse = await fetch('http://localhost:3000/upload-coverimage' + newProduct._id, {
        method: method,
        body: coverImageFormData
    });

    if (!fileResponse.ok){
        throw json({ message: "Could not successfully submit the cover image for the sell assets action."}, { status: 500 });
    }

    // third post request to submit the listed product files
    
    const filesFormData = new FormData();
    
    for (let i=0; i < files.files.length; i++){
        filesFormData.append("files", files.files(i));
    }

    const filesResponse = await fetch('http://localhost:3000/upload-coverimage' + newProduct._id, {
        method: method,
        body: filesFormData
    });

    if (!filesResponse.ok){
        throw json({ message: "Could not successfully submit the files for the sell assets action."}, { status: 500 });
    }
   
    return redirect('/store/product-search');
};