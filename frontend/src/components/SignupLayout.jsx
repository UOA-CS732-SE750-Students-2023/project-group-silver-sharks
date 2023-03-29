import React from 'react'; 
import AuthForm from '../components/AuthForm';

const SignupLayout = () => { 
    return (
        <div> 
           <h1>This is the sign up page</h1>
           <AuthForm operation='SIGNUP'/>
        </div>
    );
}

export default SignupLayout;