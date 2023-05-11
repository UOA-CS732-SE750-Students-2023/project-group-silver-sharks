import React from 'react';
import { useRouteError } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import ErrorNavBar from './ErrorNavBar';
import PageContent from './PageContent';

const ErrorPage = () => { 
    // hook can be used to extract information about the error
    const error = useRouteError();

    let title = "Something went wrong";

    if (error.status === 404){
        title = "Resource Not Found";
    }

    if (error.status === 500){
        title = "Internal Server Error";
    }


    // errorpage needs its own separate nav bar
    return (
        <>  
            <ErrorNavBar />
            <PageContent title={title}>
                <p>{error.message}</p>
            </PageContent>
        </>
    );
}

export default ErrorPage;