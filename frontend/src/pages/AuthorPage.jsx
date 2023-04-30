import React, { useState } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
import AuthorLayout from '../components/AuthorLayout';
import AuthorLayoutUserview from '../components/AuthorLayoutUserview';

const AuthorPage = () => {

    const authorData = useLoaderData();
    
    const [role,setRole] = useState('user');
    
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
            <AuthorLayout author={authorData}/>
        </div>
    );
}

export default AuthorPage;

export const loader = async ({request,params}) => {
    const authorId = params.aid;

    console.log("################################################")
    console.log("From inside the Author Page loader - the id from url: ")
    console.log(authorId);

    const response = await fetch('http://localhost:3000/account/id/' + authorId);

    // throwing will send the data to the error page
    if (!response.ok){
        throw json({ message: 'Could not fetch details for this account.'}, {
            status: 500,
        });
    } else {
          // react router will extract data from promise
        const author = await response.json();

        console.log("################################################")
        console.log("from inside the author page loader: ")
        console.log(author)
        console.log("################################################")
        return author;
    }
};