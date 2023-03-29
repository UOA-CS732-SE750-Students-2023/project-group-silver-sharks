import React from 'react'; 
import { NavLink, useNavigate } from 'react-router-dom';

const StoreNavBar = (props) => { 
    const navigate = useNavigate();

    const profileNavigationHandler = () => { 
        navigate('/store/profile');
    };

    const showCartHandler = () => {
        props.showCart();
    }


    return (
        <header >
            <nav>
                <ul>
                    <li>
                        <h2>SharketPlace</h2>
                    </li>
                    <li>
                        <NavLink to="">Sell asset</NavLink>
                    </li>
                </ul>
                <div>
                    <p>Logged in as XXX</p>
                </div>
                <div>
                    <button onClick={showCartHandler}>Cart</button>
                    <button onClick={profileNavigationHandler}>Profile</button>
                </div>
            </nav>
            <hr/>
        </header>
    );
}

export default StoreNavBar;