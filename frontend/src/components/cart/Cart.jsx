import React, { useState } from 'react'; 
import Modal from '../modal/Modal';
import { DashCircle  } from 'react-bootstrap-icons';
import './Cart.module.css';
import classes from '../modal/Modal.module.css';
import { useNavigate, useSubmit } from 'react-router-dom';


const Cart = (props) => { 
    const submit = useSubmit();
    let isCartEmpty = false;

    let currentCartItem;


    

    if (props.cartContents.length === 0){ 
        isCartEmpty = true;
    } else { 
        isCartEmpty = false;
    }


    // check if the cart is empty or not 
    // if it is empty then render a display message
    const navigate = useNavigate();

    const closeCartHandler = () => {
        props.closeCart();
    }
    // Calculate the price of all items in the shopping cart
    const totalPrice = props.cartContents.reduce((acc, item) => acc + item.price, 0);
    
    //Calculate the number of items in the shopping cart
    const totalAmount = props.cartContents.length ?? 0;
    const itemText = totalAmount > 1 ? 'items' : 'item';

    const deleteHandler = (event, productId) => {
        const proceed = window.confirm('Are you sure?');

        if (proceed){
            // trigger action programmatically using the useSubmit hook
            // params for function are data and other details like method
            submit({ id: productId }, { method: 'delete' });
        }
    }

    const checkoutClick = ()=>{
        navigate('/store/payment');
    }
    

    return (
        <Modal onClose={props.closeCart}>
            <div className={`${classes.cartcontainer}`}>
                <h2>Shopping cart</h2>
                <ul className="list-unstyled">
                    {!isCartEmpty &&props.cartContents.map((item) => (
                        <li key={item._id}>
                            <div className={`${classes.pic_d}`}>
                                <img src={`http://localhost:3000/uploads/${item.coverImage}`}/>
                            </div>
                            
                            <div className={`${classes.intro_d}`}>
                                {/* Display the name and category of the item */}
                                <p className="text-nowrap text-truncate">{item.name}</p>
                                <p className={`${classes.cate_color}`}>{item.category}</p>
                            </div>
                            {/* Add a delete icon to each item */}
                            <DashCircle className={`${classes.icon}`}
                                size={24} 
                                onClick={(event) => deleteHandler(event, item._id)}/>
                            <div className={`${classes.price}`}>
                                {/* Display the price of the item */}
                                <h1>${Math.floor(item.price)}
                                    <span>{(item.price % 1).toFixed(2).split('.')[1]}</span>
                                </h1>
                                
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="border-top border-2"></div>
                 {/* Display the subtotal and total price */}
                <div className={`d-flex justify-content-end ${classes.bottom}`}>
                    <div className={`d-flex flex-column align-items-end ${classes.c_con}`}>
                        <h3>Sub-total</h3>
                        <p>{totalAmount}&nbsp;{itemText}</p>
                    </div>
                    
                    <div className={`${classes.totalprice}`}>
                        <h1>${Math.floor(totalPrice)}
                            <span>{(totalPrice % 1).toFixed(2).split('.')[1]}</span>
                        </h1>
                        
                    </div>
                </div>
                {/* Render the checkout button */}
                <div className="d-flex justify-content-end">
                    <button onClick={checkoutClick} disabled={isCartEmpty} className={`${classes.btt} ${isCartEmpty ? classes.disabled : ''}`}>Checkout</button>
                </div>
            </div>
        </Modal>
    );
}

export default Cart;