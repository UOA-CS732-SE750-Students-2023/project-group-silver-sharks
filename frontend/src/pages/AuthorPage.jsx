import React from 'react';
import { useLoaderData, json } from 'react-router-dom';
import AuthorLayout from '../components/AuthorLayout';

const AuthorPage = () => { 
    const authorData = useLoaderData();

    return (
        <AuthorLayout author={authorData}/>
    );
}

export default AuthorPage;

export const loader = async ({request,params}) => {
    const authorId = params.aid;

    const response = await fetch('http://localhost:3000/account/id/' + authorId);

    // throwing will send the data to the error page
    if (!response.ok){
        throw json({ message: 'Could not fetch details for this account.'}, {
            status: 500,
        });
    } else {
          // react router will extract data from promise
        const author = await response.json();
        console.log(author)
        return author;
    }
};