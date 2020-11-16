import React from "react";
import "./toolbar.css";

class Toolbar extends React.Component {
  render() {
    return (
      <div className="toolbar">
        <button name="changeTheme" onClick={this.props.handleChange}>
          Change Theme
        </button>
        <button name="toggleEdit" onClick={this.props.handleChange}>
          Toggle Edit
        </button>
      </div>
    );
  }
}

export default Toolbar;
