import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import './LandingNavBar.css';

function LandingNavBar() {
  const navigate = useNavigate();

  const navigateLoginHandler = () => {
      navigate('/login');
  }
  return (
    <>
      <div className = 'landing-page-bg'>
        <div className="landing-page-navbar-wrapper">
          <div className="sign-in-row">
            <div className="landing-page-logo"><b>SHARKET</b>PLACE</div>
            <div className="landing-page-sign-in"><button className="sign-in-button" onClick={navigateLoginHandler}>Sign In</button></div>
          </div>
          <hr className='landing-page-navbar-line'/>
          <div className='landing-page-desc'>
            <b>The world's premier<br/><span>digital marketplace</span>.</b>
          </div>
          <div className="landing-page-search-bar-wrapper">
          <input
            className="landing-page-search-bar"
            type="search"
            placeholder="Search for a digital asset"/>
            <SearchIcon className='landing-page-search-icon'/>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingNavBar;