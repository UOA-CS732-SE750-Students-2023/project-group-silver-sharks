import React from 'react'; 
import { useNavigate,useRouteLoaderData,json, redirect } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import './StoreNavBar.css';

const StoreNavBar = (props) => { 

    const user = useRouteLoaderData('username-loader');

    const navigate = useNavigate();

    const profileNavigationHandler = () => { 
        props.showProfileNavBar();
    };

    const sellAssetNavigationHandler = () => {
        navigate('/store/sell-asset');
    }

    const showCartHandler = () => {
        props.showCart();
    }

    return (
        <header className="store-navbar-container">
            <div className="store-navbar-wrapper">
                <div className="store-navbar-user-info">
                    <p>Logged in as <b>{user.username}</b></p>
                </div>
                <div className="store-navbar-action-row">
                    <div className="brand-name"><b>SHARKET</b>PLACE</div>
                    <div className="sell-asset-wrapper"><button className="store-page-sell-asset-btn" onClick={sellAssetNavigationHandler}>Sell Assets</button></div>
                    <div className="cart-icon-wrapper"><ShoppingCartIcon fontSize='large'  onClick={showCartHandler}/></div>
                    <div className="menu-icon-wrapper"><MenuIcon fontSize='large' onClick={profileNavigationHandler}/></div>
                </div>

            </div>
            <hr className='store-page-navbar-line'/>
        </header>
    );
}

export default StoreNavBar;

export const loader = async () => {

    const response = await fetch('http://localhost:3000/account/id/0');

    if (!response.ok) {
       
        if (response.status === 401){
            console.log("Not Authorized."); 
            return redirect("/");
        } 

        // 428 is returned if username is not set
        if (response.status === 428){ 
            return redirect("/username");
        }

        return json({ message: "Could not fetch data from backend."}, { status: 500 });
    } else {
        return response;
    }
}