import React from 'react'; 
import LandingLayout from '../components/LandingPageComponents/LandingLayout';
import { useLoaderData } from 'react-router-dom';

const LandingPage = () => { 

    const data = useLoaderData();

    return (
        <>
            <LandingLayout popularMediaList={data} />
        </>    
    );
}

export default LandingPage;

export const loader = async ({request, params}) => {
    
    // Get popular media response
    const popularResponse = await fetch('http://localhost:3000/products/landing-page');
              
    if (!popularResponse.ok) {
        throw new Error(`HTTP error! cannot get data: ${popularResponse.status}`);
    }
  
    const data = await popularResponse.json();
    console.log("LANDING PAGE DATA:");

    return data;
  };
