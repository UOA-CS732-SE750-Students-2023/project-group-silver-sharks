import React , { Fragment } from 'react';
import classes from './Modal.module.css';
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


const overlayElement = document.getElementById('overlays');

const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<BackDrop onClose={props.onClose}/>, overlayElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, overlayElement)}
        </Fragment>
    );
};

export default Modal;