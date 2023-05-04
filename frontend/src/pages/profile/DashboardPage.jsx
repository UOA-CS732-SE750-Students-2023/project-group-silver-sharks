import React from 'react'; 
import DashboardLayout from '../../components/DashboardLayout';
import { useLoaderData, redirect, json } from 'react-router-dom';

const DashBoardPage = () => {

    const user = useLoaderData();

    return ( 
        <DashboardLayout user={user}/>
    );
}

export default DashBoardPage;


export const loader = async ({ params, request }) => {
    // get the account id of the logged in user
    const userResponse = await fetch('http://localhost:3000/account/id/0');

    if (!userResponse.ok) {

        return json({ message: "Could not fetch user data from backend."}, { status: 500 });
    } 

    return userResponse;
  
}

export const action = async ({ params, request }) => {

    const response = await fetch('http://localhost:3000/account', {
        method: request.method,
    });

    if (!response.ok){
        throw json({ message: 'Could not delete account.'}, { status: 500 });
    }

    return redirect('/');
}