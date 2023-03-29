import React from 'react'; 
import { NavLink } from 'react-router-dom';

const ProfileNavBar = () => { 
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/store/profile">Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to="/store/profile/purchase">Purchase</NavLink>
                </li>
                <li>
                    <NavLink to="/store/profile/selling">Selling</NavLink>
                </li>
                <li>
                    <NavLink to="/store/profile/messages">Messages</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default ProfileNavBar;