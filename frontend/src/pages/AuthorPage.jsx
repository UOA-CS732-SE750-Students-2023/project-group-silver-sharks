import React, { useState } from 'react';
import { useParams, useLoaderData, json, redirect } from 'react-router-dom';
import AuthorLayout from '../components/AuthorLayout';
import AuthorLayoutUserview from '../components/AuthorLayoutUserview';

const AuthorPage = () => {
    const params = useParams();
    const data = useLoaderData();

    const authorData = data[1]; 
    const userAccountType = data[0].accountType;
    const userId = data[0]._id;
    const authorPageId = params.aid;

    console.log("author id from the url: ", params.aid, 13); 

    let isOwnAccount = false; 

    // if it is the authors own page then dont render the message 
    if (userId === authorPageId){
        isOwnAccount = true;
    }

    // determing if the logged in user is admin or not


    /*
    const whovisit=()=>{
        if(current_aid===authorpage_aid){
            setRole('admin')
        }
        else{
            setRole('user')
        }

    }
    */

    /*
        {role === 'admin' && <AuthorLayout author={authorData}/>}
        {role === 'user' && <AuthorLayoutUserview author={authorData}/>}
    */
    
    return (
        <div>
            <AuthorLayout author={authorData} userAccountType={userAccountType} authorPageId={authorPageId} userId={userId} isOwnAccount={isOwnAccount} />
        </div>
    );
}

export default AuthorPage;

export const loader = async ({request,params}) => {

    let accountsData = []

    // get the account type of the currently logged in user
    const userResponse = await fetch('http://localhost:3000/account/id/0');

    if (!userResponse.ok) {

        return json({ message: "Could not fetch user data from backend."}, { status: 500 });
    } 

    const user = await userResponse.json();

    accountsData.push(user);

    const authorId = params.aid;

    const response = await fetch('http://localhost:3000/account/id/' + authorId);

    // throwing will send the data to the error page
    if (!response.ok){
        throw json({ message: 'Could not fetch details for this account.'}, {
            status: 500,
        });
    } 

        // react router will extract data from promise
    const author = await response.json();

    accountsData.push(author);

    return accountsData;
    
};

export const action = async ({ params, request }) => {

    // logic for determining the redirect following the deletion of the account in question
    const formData = await request.formData();

    let redirectLandingPage = false;  

    const isAdmin =  formData.get('isAdmin'); 
    const isOwnAccount = formData.get('isOwnAccount');

    if (isAdmin && isOwnAccount){
        console.log("redirect to the landing page", 112);
        redirectLandingPage = true;
    }

    if (isAdmin && !isOwnAccount){
        console.log("redirect to the product search page", 117);
        redirectLandingPage = false;
    }

    if (!isAdmin && isOwnAccount){
        console.log("redirect to the landing page", 121);
        redirectLandingPage = true;
    }

    // get the account id of the account to be deleted from the url
    const authorId = params.aid;

    // delete the account
    const response = await fetch('http://localhost:3000/account/id/' + authorId, {
        method: request.method,
    });

    if (!response.ok){
        throw json({ message: 'Could not delete this account.'}, { status: 500 });
    }

    console.log("account successfully deleted", 100);


    if (redirectLandingPage){
        return redirect('/');
    }

    return redirect('/store/product-search');
}