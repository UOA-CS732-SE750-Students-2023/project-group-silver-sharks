import React from 'react'; 
import { redirect } from 'react-router-dom';
import PreLoginBar from '../components/PreLoginBar';
import LoginLayout from '../components/LoginLayout';

const LoginPage = () => { 

    return (
        <>
            <PreLoginBar />
            <LoginLayout />
        </>
    );
}

export default LoginPage;

export const action = async ({params, request}) => {

    const data = await request.formData();

    // submit to backend...
    return redirect('/store/product-search');

};