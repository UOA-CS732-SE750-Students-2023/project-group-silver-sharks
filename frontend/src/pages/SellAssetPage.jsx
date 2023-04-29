import React from 'react'; 
import SellAssetLayout from '../components/SellAssetLayout';

const SellAssetPage = () => { 

    return (
        <SellAssetLayout />
    );
}

export default SellAssetPage;

export const action = async ({request,params}) => {
    
    // get the user id 
    // /account/id/:id

    // getting the form data from request argument 
    const formData = await request.formData();
    const sellingProductData = {
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get("category"),
        price: +formData.get('price')
    };
  
    // getting the http method from the request argument
    //const method = request.method;

    console.log("**************************************************");
    console.log(sellingProductData);
    console.log("**************************************************");

    /*
    // NEED THE USER ID HERE
    
    // getting the form data from request argument 
    const formData = await request.formData();
    const sellingProductData = {
        title: formData.get('title'),
        image: formData.get('image'),
        date: formData.get('date'),
        description: formData.get('description'),
    };
    */
   
    return true;
};