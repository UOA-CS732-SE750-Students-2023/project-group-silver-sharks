import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './UsernameLandingNavBar.css';

function LandingNavBar() {

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
          {/* <div className="landing-page-search-bar-wrapper">
          <input
            className="landing-page-search-bar"
            type="search"
            placeholder="Search for a digital asset"/>
            <SearchIcon className='landing-page-search-icon'/>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default LandingNavBar;