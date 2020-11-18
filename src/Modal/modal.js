import React from "react";
import "./modal.css";

class Modal extends React.Component {
  render() {
    return (
      <div className="modal" onClick={this.props.handleClose}>
        {this.props.children}
      </div>
    );
  }
}

export default Modal;
