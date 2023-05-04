import React from 'react'; 
import { useNavigate, useLoaderData, useRouteLoaderData,json, redirect } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import './StoreNavBar.css';

const StoreNavBar = (props) => { 
    const cart = useLoaderData();
    const user = useRouteLoaderData('username-loader');

    const navigate = useNavigate();

    const profileNavigationHandler = () => { 
        props.showProfileNavBar();
    };

    const sellAssetNavigationHandler = () => {
        navigate('/store/sell-asset');
    }

    const storePageNavigationHandler = () => {
        navigate('/store/product-search');
    }

    const showCartHandler = () => {
        props.showCart();
    }
    const itemsincart=Object.keys(cart).length;

    return (
        <header className="store-navbar-container">
            <div className="store-navbar-wrapper">
                <div className="store-navbar-user-info">
                    <p>Logged in as <b>{user.username}</b></p>
                </div>
                <div className="store-navbar-action-row">
                    <div className="brand-name" onClick={storePageNavigationHandler}><p className="brand"><b>SHARKET</b>PLACE</p></div>
                    <div className="sell-asset-wrapper"><button className="store-page-sell-asset-btn" onClick={sellAssetNavigationHandler}>Sell asset</button></div>
                    <div className="cart-icon-wrapper"><ShoppingCartIcon fontSize='large'  onClick={showCartHandler}/>
                        <div className="cart-items-number">
                                {itemsincart > 0 && <div className="items-number">{itemsincart}</div>}
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

export const loader = async () => {

    const accountResponse = await fetch('http://localhost:3000/account/id/0');

    if (!accountResponse.ok) {
       
        if (accountResponse.status === 401){
            console.log("Not Authorized."); 
            return redirect("/");
        } 

        // 428 is returned if username is not set
        if (accountResponse.status === 428){ 
            return redirect("/username");
        }

        return json({ message: "Could not fetch data from backend."}, { status: 500 });
    }

    const cartResponse = await fetch ('http://localhost:3000/account/cart');

    if (!cartResponse.ok) {
        if (accountResponse.status === 404) {
            console.log("Cart not found.")
        }
        if (accountResponse.error) {
            console.log("Error in fetching cart.")
        }
    }

    console.log('--------------------------------------------');
    console.log('Account response:');
    console.log(accountResponse.username);
    console.log('--------------------------------------------');
    console.log('Cart response:');
    console.log(cartResponse);
    console.log('--------------------------------------------');

    return {
        accountResponse: accountResponse,
        cartResponse: cartResponse
    }
}