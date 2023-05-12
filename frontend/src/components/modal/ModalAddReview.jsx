import React from 'react';
import classes from './ModalAddReview.module.css';
import ReactDOM from 'react-dom';


// This is a functional component that renders a backdrop for a modal
const BackDrop = (props) => {
    return (
        <div className={classes.backdrop} onClick={props.onClose}></div>
    );
};
// This is a functional component that renders the content of a modal
const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
}


const portalElement = document.getElementById('overlays_2');
// This is a functional component that renders a modal for adding a review
const ModalAddReview = (props) => {
    return (
        <>
            {ReactDOM.createPortal(<BackDrop onClose={props.onClose}/>, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </>
    );
};

export default ModalAddReview;