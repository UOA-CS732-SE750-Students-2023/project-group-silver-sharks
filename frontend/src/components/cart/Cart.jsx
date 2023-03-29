import React from 'react'; 
import Modal from '../modal/Modal';

const Cart = (props) => { 
    
    const cartContent = 'This is the cart display';

    const closeCartHandler = () => {
        props.closeCart();
    }

    return (
        <Modal onClose={props.closeCart}>
            <h2>{cartContent}</h2>
            <button onClick={closeCartHandler}>Close</button>
        </Modal>
    );
}

export default Cart;