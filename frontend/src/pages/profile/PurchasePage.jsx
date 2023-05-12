import React from 'react';
import { useLoaderData, json } from 'react-router-dom';
import PurchaseLayout from '../../components/profile-nav/ProfileComponents/PurchaseLayout';

const PurchasePage = () => {

    const purchasedProducts = useLoaderData();

    return (
        <PurchaseLayout purchasedAssets={purchasedProducts} />
    );
}

export default PurchasePage;

export const loader = async ({request,params}) => {
    
    // get the account id of the logged in user
    const userResponse = await fetch('http://localhost:3000/account/id/0');

    if (!userResponse.ok) {
        
        if (userResponse.status === 401){
            return redirect("/");
        } 

        // 428 is returned if username is not set
        if (userResponse.status === 428){ 
            return redirect("/username");
        }

        return json({ message: "Could not fetch user details."}, { status: 500 });
    } 

    const user = await userResponse.json();
  

    // get the array of products that are purchased by the user
    const response = await fetch('http://localhost:3000/account/id/' + user._id + '/purchased');

    // throwing will send the data to the error page
    if (!response.ok){
        throw json({ message: 'Could not fetch the purchased products for the user'}, {
            status: 500,
        });
    } 

    const purchasedProducts = await response.json(); 

    return purchasedProducts.purchasedProducts;
};