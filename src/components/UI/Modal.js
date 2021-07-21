import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = props => <div className={classes.backdrop} onClick={props.onClick} />;

const ModalOverlay = props => <div className={classes.modal}>
    <div className={classes.content}>{props.children}</div>
</div>

const portalElement = document.getElementById('overlays');

const Modal = props => <React.Fragment>
    {ReactDOM.createPortal(<Backdrop onClick={props.onClose} />, portalElement)}
    {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
</React.Fragment>

export default Modal;