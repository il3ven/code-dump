import React from "react";
import "./toolbar.css";

class Toolbar extends React.Component {
  render() {
    return (
      <div className="toolbar">
        <button name="darkTheme" onClick={this.props.handleChange}>
          {this.props.darkTheme ? "Light Mode" : "Dark Mode"}
        </button>
        <button name="readOnly" onClick={this.props.handleChange}>
          {this.props.readOnly ? "Edit" : "Save"}
        </button>
      </div>
    );
  }
}

export default Toolbar;
