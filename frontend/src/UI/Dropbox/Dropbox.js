import React from "react";
import "./Dropbox.css";
const Dropbox = (props) =>
  props.show ? <div className="Dropbox" onClick={props.onCancel}></div> : null;

export default Dropbox;
