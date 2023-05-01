import React, { useState } from 'react';
import { useParams, useLoaderData, json, redirect } from 'react-router-dom';
import AuthorLayout from '../components/AuthorLayout';
import AuthorLayoutUserview from '../components/AuthorLayoutUserview';

const AuthorPage = () => {

    const data = useLoaderData();

    const authorData = data[1]; 
    const userAccountType = data[0].accountType;

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
            <AuthorLayout author={authorData} userAccountType={userAccountType}/>
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

    console.log("################################################")
    console.log("from inside the author page loader: ")
    console.log(author)
    console.log("################################################")

    accountsData.push(author);

    return accountsData;
    
};

export const action = async ({ params, request }) => {

    const authorId = params.aid;

    // deleting other accounts as a admin from the author page

    const response = await fetch('http://localhost:3000/account/id/' + authorId, {
        method: request.method,
    });

    if (!response.ok){
        throw json({ message: 'Could not delete this account.'}, { status: 500 });
    }

    console.log("account successfully deleted", 100);

    return redirect('/');
}