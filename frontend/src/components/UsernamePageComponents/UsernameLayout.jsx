import React, { useState } from "react";
import { useNavigate, json } from "react-router-dom";
import "./UsernameLayout.css";

function UsernameLayout() {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formUsername, setFormUsername] = useState("");;

  const usernameHandler = (event) => {
    setFormUsername(event.target.value);
  };

  const submitHandler = async (event) => {

    // remove the error message 
    setError(false);

    event.preventDefault();
    await redirectUserNameHandler(formUsername);
  };

  const redirectUserNameHandler = async (enteredUsername) => {
    const payload = {
      username: enteredUsername,
    };

    const response = await fetch("http://localhost:3000/account/username", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 409) {
        setError(true);
        setErrorMessage("Username invalid.");
      } else if (response.status === 410) {
        setError(true);
        setErrorMessage("Username already exists.");
      } else { 
        throw json(
            { message: "Could not post username" },
            {
              status: 404,
            }
        );
      } 
    
    } else {
      return navigate("/store/product-search");
    }
  };

  return (
    <>
      <div className="username-container">
        {error && <b>{errorMessage}</b>}
        <form onSubmit={submitHandler}>
          <div className="username-wrapper">
            <div className="username-prompt-wrapper">
              Please select a username
            </div>
            <div className="username-input-wrapper">
              <input
                className="username-input"
                placeholder="Username"
                onChange={usernameHandler}
              />
            </div>
            <div className="username-submit-btn-wrapper">
              <button className="username-submit-btn">Set username</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default UsernameLayout;
