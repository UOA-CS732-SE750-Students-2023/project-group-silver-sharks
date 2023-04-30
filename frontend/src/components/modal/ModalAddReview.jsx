import React from 'react';
import classes from './ModalAddReview.module.css';
import ReactDOM from 'react-dom';


const BackDrop = (props) => {
    return (
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

/*
    To ensure that the modal divs arent nested within the landing page DOM elements, 
    we will make use of React Portal for the modal window.
*/

const portalElement = document.getElementById('overlays_2');

const ModalAddReview = (props) => {
    return (
        <>
            {ReactDOM.createPortal(<BackDrop onClose={props.onClose}/>, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </>
    );
};

export default ModalAddReview;