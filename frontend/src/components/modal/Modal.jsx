import React , { Fragment } from 'react';
import classes from './Modal.module.css';
import ReactDOM from 'react-dom';


const BackDrop = (props) => {
    return (
        // When the backdrop is clicked, call the onClose function passed in as a prop
        <div className={classes.backdrop} onClick={props.onClose}></div>
    );
};

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
}

// Get the DOM element with the ID 'overlays' to use for rendering the modal outside of the component hierarchy
const overlayElement = document.getElementById('overlays');

// This component is the parent component for the modal and renders both the backdrop and modal overlay
const Modal = (props) => {
    return (
        <Fragment>
            
            {ReactDOM.createPortal(<BackDrop onClose={props.onClose}/>, overlayElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, overlayElement)}
        </Fragment>
    );
};

export default Modal;