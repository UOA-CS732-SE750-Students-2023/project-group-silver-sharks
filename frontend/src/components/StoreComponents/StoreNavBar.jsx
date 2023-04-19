import React from 'react'; 
import { NavLink, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import './StoreNavBar.css';

const StoreNavBar = (props) => { 
    const navigate = useNavigate();

    const profileNavigationHandler = () => { 
        navigate('/store/profile');
    };

    const showCartHandler = () => {
        props.showCart();
    }


    return (
        <header className="store-navbar-container">
            <div className="store-navbar-wrapper">
                <div className="store-navbar-user-info">
                    <p>Logged in as <b>XXX</b></p>
                </div>
                <div className="store-navbar-action-row">
                    <div className="brand-name"><b>SHARKET</b>PLACE</div>
                    <div className="sell-asset-wrapper"><button className="store-page-sell-asset-btn" onClick={profileNavigationHandler}>Sell Assets</button></div>
                    <div className="cart-icon-wrapper"><ShoppingCartIcon fontSize='large'  onClick={showCartHandler}/></div>
                    <div className="menu-icon-wrapper"><MenuIcon fontSize='large' onClick={profileNavigationHandler}/></div>
                </div>
                
            </div>
            <hr className='store-page-navbar-line'/>
        </header>
    );
}

export default StoreNavBar;