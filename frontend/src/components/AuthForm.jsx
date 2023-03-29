import React from 'react'; 
import { Form, redirect } from 'react-router-dom';

const AuthForm = ({ operation }) => { 
    
    return (
        <Form method="POST">
            <p>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" name="username" required />
            </p>
            <p>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" required />
            </p>
            <div>
                <button>Submit</button>
                <button type="button">Cancel</button>
            </div>
        </Form>
    );
}

export default AuthForm;


