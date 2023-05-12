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

    let isOwnAccount = false; 

    console.log("user Id" + userId, 19); 
    console.log("author id" + params.aid, 20)

    // if it is the authors own page then dont render the message 
    if (userId === authorPageId){
        isOwnAccount = true;
    }
    
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

    const authorId = params.aid;

    const data = await request.formData();

    const isAdmin = data.get("isAdmin") === 'true';
    const isOwnAccount = data.get("isOwnAccount") === 'true';   

    let navigateLandingPage = true;

    if (isAdmin && !isOwnAccount){
        navigateLandingPage = false;
    }

    const response = await fetch('http://localhost:3000/account/id/' + authorId, {
        method: request.method,
    });

    if (!response.ok){
        throw json({ message: 'Could not delete this account.'}, { status: 500 });
    }


    if (navigateLandingPage){
        return redirect('/');
    } 
        
    return redirect('/store/product-search');
}