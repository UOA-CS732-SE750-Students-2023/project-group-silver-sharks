import React from 'react'; 
import { redirect } from 'react-router-dom';
import PreLoginBar from '../components/PreLoginBar';
import SignupLayout from '../components/SignupLayout';


const SignupPage = () => { 

    return (
        <>
            <PreLoginBar />
            <SignupLayout />
        </>
    );
}

export default SignupPage;

export const action = async ({params, request}) => {


    const data = await request.formData();
    console.log("form data: " + data.get('username'));
    console.log("form data: " + data.get('password'));

    // submit to backend...

    return redirect('/login');

};