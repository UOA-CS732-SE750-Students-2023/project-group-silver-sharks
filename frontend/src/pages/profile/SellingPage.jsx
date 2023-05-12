import React from 'react'; 
import { json, useLoaderData,redirect } from 'react-router-dom';
import SellingLayout from '../../components/profile-nav/ProfileComponents/SellingLayout';

const SellingPage = () => {

    const selling = useLoaderData();

    return (
        <SellingLayout sellingAssets={selling}/>
    );
}

export default SellingPage;


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
    const response = await fetch('http://localhost:3000/account/id/' + user._id + '/selling');

    // throwing will send the data to the error page
    if (!response.ok){
        throw json({ message: 'Could not fetch the selling products for the user'}, {
            status: 500,
        });
    } 

    const sellingProducts = await response.json(); 

    return sellingProducts.sellingProducts;
};

export const action = async ({request,params}) => {
    // getting the form data from request argument 
    const formData = await request.formData();

    const productId = formData.get("id");

    // getting the http method from the request argument
    const method = request.method;

    // check whether the request is a delete or a post

    const response = await fetch("http://localhost:3000/products/" + productId, {
        method: method,
    });

    if (!response.ok){ 
        throw json({ message: 'Could not delete product.'}, { status: 500 });
    }

    // redirect to the current page
    return redirect('.');
}