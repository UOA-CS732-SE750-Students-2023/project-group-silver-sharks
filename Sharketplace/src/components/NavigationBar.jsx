import React from 'react'; 
import { NavLink } from 'react-router-dom';

const NavigationBar = () => { 
    return (
        <header >
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/first">Other page</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default NavigationBar;