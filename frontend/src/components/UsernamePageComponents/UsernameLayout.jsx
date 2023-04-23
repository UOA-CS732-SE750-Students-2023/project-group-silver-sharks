import React from 'react';
import './UsernameLayout.css';

function UsernameLayout() {
  return (
    <>
        <div className="username-container">
            <div className="username-wrapper">
                <div className="username-prompt-wrapper">
                    Please select a username
                </div>
                <div className="username-input-wrapper">
                    <input className="username-input" placeholder="Username"/>
                </div>
                <div className="username-submit-btn-wrapper">
                    <button className="username-submit-btn">Set username</button>
                </div>
            </div>
        </div>
    
        
    </>
  );
}

export default UsernameLayout;