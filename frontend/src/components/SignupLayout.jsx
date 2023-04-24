import React from 'react'; 
import AuthForm from './AuthForm';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const SignupLayout = () => {
  return (
    <div className="container" >
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Sign up</h1>
          <Form method="POST" className='d-flex flex-column align-items-center'>
            <div className="form-group mb-3">
              <input
                id="username"
                type="text"
                name="username"
                className="form-control"
                required
                placeholder="Username"
              style={{ borderRadius: '20px', height: '45px', width: 350, borderWidth: '2px', borderColor: 'black' }}
              />
            </div>
            <div className="form-group mb-3">
              <input
                id="email"
                type="email"
                name="email"
                className="form-control"
                required
                placeholder="Email"
              style={{ borderRadius: '20px', height: '45px', width: 350, borderWidth: '2px', borderColor: 'black' }}
              />
            </div>
            <div className="form-group mb-3">
              <input
                id="password"
                type="password"
                name="password"
                className="form-control"
                required
                placeholder="Password"
              style={{ borderRadius: '20px', height: '45px', width: 350, borderWidth: '2px', borderColor: 'black' }}
              />
            </div>
            <div className="d-flex justify-content-center">
              <Button
                variant="success"
                type="submit"
                style={{ borderRadius: '20px', backgroundColor: '#00897B', color: 'white' }}
              >
                Sign up
              </Button>
            </div>
            <p className="text-center text-muted mt-3">
              Already have an account?
              <br />
              <Link to="/login">Sign in</Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};


export default SignupLayout;