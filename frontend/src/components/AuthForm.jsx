import React from 'react'; 
import { Button } from 'react-bootstrap';
import { Form, redirect } from 'react-router-dom';

const AuthForm = ({ operation }) => { 
    
    // testing that bootstrap is configured correctly

    return (
        <Form method="POST">
        {/* Create a form and specify the form submission method as POST */}
            <p>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" name="username" required />
            </p>
            <p>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" required />
            </p>
            <div>
                
                <Button variant="dark" type="submit">Submit</Button>
                <Button variant="dark">Cancel</Button>
            </div>
        </Form>
    );
}

export default AuthForm;


