import React, { useCallback } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './LandingNavBar.css';

function LandingNavBar() {
  // This is an event handler function that redirects the user to the sign-in page
  function signInHandler() {
    window.location.href = "http://localhost:3000/account/sign-in";
  }

  return (
    <>
      <div className = 'landing-page-bg'>
        <div className="landing-page-navbar-wrapper">
          <div className="sign-in-row">
            <div className="landing-page-logo"><b>SHARKET</b>PLACE</div>
            <div className="landing-page-sign-in"><button className="sign-in-button" onClick={signInHandler}>Sign In</button></div>
          </div>
          <hr className='landing-page-navbar-line'/>
          <div className='landing-page-desc'>
            <b>The world's premier<br/><span>digital marketplace</span>.</b>
          </div>
          <div className="landing-page-search-bar-wrapper">
          </div>
        </div>
        
      </div>
    </>
  );
}

export default LandingNavBar;