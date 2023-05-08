import React from 'react'; 
import { json, redirect, useLoaderData } from 'react-router-dom';
import SellAssetLayout from '../components/SellAssetLayout';

const SellAssetPage = () => { 

    const { userId, userStripeId} = useLoaderData();
    console.log("Stripe User ID on page jsx file: " + userStripeId);

    return (
        <SellAssetLayout userId={userId} userStripeId={userStripeId}/>
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

    console.log("################################################")
    console.log("this is the username and userid fetched from the backend")
    console.log(user.username + " " + user._id + " Stripe: " + user.stripeId);
    console.log("################################################")

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

    console.log("################################################")
    console.log("this is the username and userid fetched from the backend")
    console.log(user.username + " " + user._id);
    console.log("################################################")


    // getting the form data from request argument 
    const formData = await request.formData();
    const sellingProductData = {
        name: formData.get('title'),
        description: formData.get('description'),
        category: formData.get("category"),
        price: +formData.get('price')
    };

    console.log("**************************************************");
    console.log(sellingProductData);
    console.log("**************************************************");
    

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

    console.log("***************************************************")
    console.log(newProduct._id);
    console.log(newProduct.name);
    console.log("***************************************************")

    // second post request to submit the cover image
    const coverImageFormData = new FormData();

    // get the references 
    const coverImage = document.getElementById("cover-image");
    const files = document.getElementById("files");

    console.log(files)


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
    
    console.log("Progressing past the cover image file upload !!!");

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

    console.log("Progressing past the multiple files upload !!!");
   
    return redirect('/store/product-search');
};