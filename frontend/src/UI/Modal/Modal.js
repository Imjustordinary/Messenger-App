import React from "react";
import "./Modal.css";
import Dropbox from "../Dropbox/Dropbox";
const Modal = (props) => (
  <React.Fragment>
    <Dropbox show={props.show} onCancel={props.clearError} />
    <div
      className={props.idenClass?'Modal':'Modal'}
      style={{
        transform: props.show ? "translateY(-5vh)" : "translateY(100vh)",
        opacity: props.show ? "1" : "0",
      }}
    >
      {props.children}
    </div>
  </React.Fragment>
);

export default Modal;
