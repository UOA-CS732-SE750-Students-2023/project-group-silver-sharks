import React from 'react'; 
import { useNavigate,useRouteLoaderData, Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import './StoreNavBar.css';

const StoreNavBar = (props) => { 

    
    // Use the useRouteLoaderData hook to retrieve data for the current user
    const data = useRouteLoaderData('username-loader');

    const user = data[0]; 

    

    const navigate = useNavigate();
    // Define a function to handle clicking the profile navigation icon
    const profileNavigationHandler = () => { 
        props.showProfileNavBar();
    };

    const sellAssetNavigationHandler = () => {
        // Use the navigate function to navigate to the sell asset page
        navigate('/store/sell-asset');
    }
    // Define a function to handle showing the cart
    const showCartHandler = () => {
        props.showCart();
    }
    // Extract the number of items in the cart from props
    const itemsincart = props.numItemsCart;

    return (
        <header className="store-navbar-container">
            <div className="store-navbar-wrapper">
                <div className="store-navbar-user-info">
                    <p>Logged in as <b>{user.username}</b></p>
                </div>
                <div className="store-navbar-action-row">
                    <div className="brand-name"><Link to={`/store/product-search`}><b>SHARKET</b>PLACE</Link></div>
                    <div className="sell-asset-wrapper"><button className="store-page-sell-asset-btn" onClick={sellAssetNavigationHandler}>Sell asset</button></div>
                    <div className="cart-icon-wrapper"><ShoppingCartIcon fontSize='large'  onClick={showCartHandler}/>
                        <div className="cart-items-number">
                                {<div className="items-number">{itemsincart}</div>}
                            </div>
                    </div>
                    <div className="menu-icon-wrapper"><MenuIcon fontSize='large' onClick={profileNavigationHandler}/></div>
                </div>

            </div>
            <hr className='store-page-navbar-line'/>
        </header>
    );
}

export default StoreNavBar;