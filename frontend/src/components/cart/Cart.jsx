import React, { useContext } from 'react'; 
import Modal from '../modal/Modal';
import { DashCircle  } from 'react-bootstrap-icons';
import './Cart.module.css';
import classes from '../modal/Modal.module.css';


// remember when using value from context, useState does not need to be used 
// because when the cart data values change the component(s) that use them automatically 
// rerender

const Cart = (props) => { 
    

    const DUMMY_DATA = [
        {   
            pid: 1,
            aid: 2,
            name: 'goku',
            price:80.00,
            sold:414,
            like:4.8,
            category:'Image',
            url: 'https://www.cartonionline.com/wordpress/wp-content/uploads/2023/02/goku-814x1024.jpg',
            author: 'steve',
            intro:'This is a brief introduction to the product.',
            description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        {   
            pid: 3,
            aid: 4,
            name: 'naruto',
            price:5.50,
            sold:8545,
            like:3.2,
            category:'Image',
            url: 'https://animecorner.me/wp-content/uploads/2022/10/naruto.png',
            author: 'herobrine',
            intro:'This is a brief introduction to the product.',
            description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        {   
            pid: 5,
            aid: 6,
            name: 'sasuke',
            price:11.99,
            sold:23,
            like:5.0,
            category:'Image',
            url: 'https://www.looper.com/img/gallery/every-power-sasuke-has-on-naruto-explained/intro-1663193400.jpg',
            author: 'bob',
            intro:'This is a brief introduction to the product.',
            description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        {   
            pid: 8,
            aid: 11,
            name: 'goku',
            price:80.00,
            sold:414,
            like:4.8,
            category:'Image',
            url: 'https://www.cartonionline.com/wordpress/wp-content/uploads/2023/02/goku-814x1024.jpg',
            author: 'steve',
            intro:'This is a brief introduction to the product.',
            description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        {   
            pid: 9,
            aid: 55,
            name: 'naruto',
            price:5.50,
            sold:8545,
            like:3.2,
            category:'Image',
            url: 'https://animecorner.me/wp-content/uploads/2022/10/naruto.png',
            author: 'herobrine',
            intro:'This is a brief introduction to the product.',
            description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        {   
            pid: 57,
            aid: 67,
            name: 'sasuke',
            price:11.99,
            sold:23,
            like:5.0,
            category:'Image',
            url: 'https://www.looper.com/img/gallery/every-power-sasuke-has-on-naruto-explained/intro-1663193400.jpg',
            author: 'bob',
            intro:'This is a brief introduction to the product.',
            description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        
    ];

    const closeCartHandler = () => {
        props.closeCart();
    }
    // Calculate the price of all items in the shopping cart
    const totalPrice = DUMMY_DATA.reduce((acc, item) => acc + item.price, 0);
    
    //Calculate the number of items in the shopping cart
    const totalAmount=DUMMY_DATA.length;
    const itemText = totalAmount > 1 ? 'items' : 'item';

    const handleClick = ()=>{
        window.alert("Remove the product from cart.");
    }

    const checkoutClick = ()=>{
        window.alert("checkout");
    }
    

    return (
        <Modal onClose={props.closeCart}>
            <div>
                <h2>Shopping cart</h2>
                <ul className="list-unstyled">
                    {DUMMY_DATA.map((item) => (
                        <li key={item.pid}>
                            <div className={`${classes.pic_d}`}>
                                <img src={item.url}/>
                            </div>
                            
                            <div className={`${classes.intro_d}`}>
                                <p className="text-nowrap text-truncate">{item.intro}</p>
                                <p className={`${classes.cate_color}`}>{item.category}</p>
                            </div>
                            
                            <DashCircle className={`${classes.icon}`}
                                size={24} 
                                onClick={handleClick}/>

                            
                            <div className={`d-flex justify-content-end ${classes.price}`}  >
                                <span className="fs-4 text-white">${Math.floor(item.price)}</span>
                                <span className={`${classes.number}`}>{(item.price % 1).toFixed(2).split('.')[1]}</span>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="border-top border-2"></div>

                <div className={`d-flex justify-content-end ${classes.bottom}`}>
                    <div className="d-flex flex-column align-items-end">
                        <h3>Sub-total</h3>
                        <p>{totalAmount}&nbsp;{itemText}</p>
                    </div>
                    
                    <div className={`${classes.totalprice}`}>
                        <span className="fs-2 text-white">${Math.floor(totalPrice)}</span>
                        <span className="fs-7 text-white">{(totalPrice % 1).toFixed(2).split('.')[1]}</span>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <button onClick={checkoutClick}>Checkout</button>
                </div>
                
                    
                

            </div>
            {/* <h2>Shopping cart</h2>
            <h2>{cartContent}</h2>
            <h2>{DUMMY_DATA.pid}</h2>
            <div>
                <h3>The total amount from context is: </h3>
                <p>{totalAmount}</p>
            </div>
            <button onClick={closeCartHandler}>Close</button> */}
        </Modal>
    );
}

export default Cart;