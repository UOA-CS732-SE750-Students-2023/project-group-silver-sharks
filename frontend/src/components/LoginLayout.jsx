import React from 'react'; 
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

const LoginLayout = () => { 
    return (
        <div> 
           <h1>This is the login page</h1>
           <AuthForm operation='LOGIN'/>
           <p><Link to="/signup">Sign up</Link> for an account. </p>
        </div>
    );
}

export default LoginLayout;