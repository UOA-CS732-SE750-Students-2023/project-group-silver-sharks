import React, { useContext } from 'react'; 
import Modal from '../modal/Modal';

// remember when using value from context, useState does not need to be used 
// because when the cart data values change the component(s) that use them automatically 
// rerender

const Cart = (props) => { 

    const cartContent = 'This is the cart display';

    const closeCartHandler = () => {
        props.closeCart();
    }

    return (
        <Modal onClose={props.closeCart}>
            <h2>{cartContent}</h2>
            <div>
                <h3>The total amount from context is: </h3>
                
            </div>
            <button onClick={closeCartHandler}>Close</button>
        </Modal>
    );
}

export default Cart;