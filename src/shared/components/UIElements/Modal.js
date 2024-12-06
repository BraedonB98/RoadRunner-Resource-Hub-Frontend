import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import "./styling/Modal.css";

const ModalOverlay = React.forwardRef((props, ref) => {
  const content = (
    <div
      ref={ref}
      className={`${props.error ? "" : "modal"} ${props.className}`}
      style={props.style}
    >
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>

      <div className={`modal__content ${props.contentClass}`}>
        {props.children}
      </div>
      <footer className={`modal__footer ${props.footerClass}`}>
        {props.footer}
      </footer>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
});

const Modal = (props) => {
  const nodeRef = useRef(null);

  return (
    <React.Fragment>
      {props.show && (
        <Backdrop error={props.error ? true : false} onClick={props.onCancel} />
      )}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
        nodeRef={nodeRef}
      >
        <ModalOverlay {...props} ref={nodeRef} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
