import React from 'react'; 
import { NavLink } from 'react-router-dom';

const LandingNavBar = () => { 
    return (
        <header >
            <nav>
                <ul>
                    <li>
                        <h2>SharketPlace</h2>
                    </li>
                    <li>
                        <NavLink to="/login">Sign in</NavLink>
                    </li>
                </ul>
            </nav>
            <hr/>
            <div>
                <p>The worlds premier digital marketplace</p>
                <input type="text" placeholder="search for a digital asset..."/>
            </div>
        </header>
    );
}

export default LandingNavBar;