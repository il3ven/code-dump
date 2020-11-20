import React from "react";
import Modal from "./modal";
import { InputBar } from "./input";
import ToolbarButton from "./toolbarButton";

class ToolbarButtonWithModal extends React.Component {
  state = {
    showModal: false,
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = (event) => {
    if (event.target.id === "modal") {
      this.setState({ showModal: false });
    }
  };

  render() {
    const state = this.state;
    return (
      <>
        {state.showModal && (
          <Modal handleClose={this.closeModal}>
            <InputBar
              handleSubmit={(selectedOption) => {
                this.setState({ showModal: false });
                this.props.onSubmit(selectedOption);
              }}
              options={this.props.options}
            ></InputBar>
          </Modal>
        )}
        <ToolbarButton onClick={this.openModal}>
          {this.props.children}
        </ToolbarButton>
      </>
    );
  }
}

export default ToolbarButtonWithModal;
