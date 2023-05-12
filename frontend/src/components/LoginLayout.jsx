import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import "bootstrap/dist/css/bootstrap.min.css";


const LoginLayout = () => {
  
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigateSigninHandler = () => {
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Sign in</h1>
          <form className="d-flex flex-column align-items-center">
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Email or username"
                style={{
                  borderRadius: "20px",
                  height: "45px",
                  width: 350,
                  borderWidth: "2px",
                  borderColor: "black",
                }}
              />
            </div>
            <div className="form-group position-relative mb-3">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="Password"
                style={{
                  borderRadius: "20px",
                  height: "45px",
                  width: 350,
                  borderWidth: "2px",
                  borderColor: "black",
                }}
              />
              <span
                className="position-absolute"
                style={{
                  bottom: "10px",
                  right: "-25px",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
                onClick={handlePasswordVisibility}
              >
                <i
                  className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"}
                ></i>
              </span>
            </div>
            <Link to="/forgotpassword" className="text-muted" style={{ alignSelf: 'flex-end', marginRight: '10%', marginBottom: '0' }}>
              Forgot password?
            </Link>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-success mb-3"
                style={{ borderRadius: "20px", backgroundColor: "#00897B" }}
                onClick={navigateSigninHandler}
              >
                Sign in
              </button>
            </div>
            <p className="text-center text-muted">
              Don't have an account?
              <br />
              <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
