import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './PreLoginBar.css';

function PreLoginBar() {
  return (
    <>
      <div className = 'auth-page-bg'>
        <div className="auth-page-navbar-wrapper">
            <div className="auth-page-navbar-row">
                <div className="auth-page-logo"><b>SHARKET</b>PLACE</div>          
            </div>
            <hr className='auth-page-navbar-line'/>
            </div>
      </div>
    </>
  );
}

export default PreLoginBar;