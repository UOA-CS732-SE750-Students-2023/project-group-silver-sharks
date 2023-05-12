import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './UsernameLandingNavBar.css';

function LandingNavBar() {

  // Function to handle the sign-in button click
  function signInHandler() {
    window.location.href = "http://localhost:3000/account/sign-in";
  }

  return (
    <>
      <div className = 'landing-page-bg'>
        <div className="landing-page-navbar-wrapper">
          <div className="sign-in-row">
            <div className="u-landing-page-logo"><b>SHARKET</b>PLACE</div>
            <div className="landing-page-sign-in"><button className="sign-in-button" onClick={signInHandler}>Sign In</button></div>
          </div>
          <hr className='landing-page-navbar-line'/>
          <div className='u-landing-page-desc'>
            <b>The world's premier<br/><span>digital marketplace</span>.</b>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingNavBar;