import React from "react";
import styles from "./toolbar.module.css";

class Toolbar extends React.Component {
  render() {
    return (
      <div className={styles.toolbar}>
        <button
          className={styles.toolbarButton}
          name="darkTheme"
          onClick={this.props.handleChange}
        >
          {this.props.darkTheme ? "Light Mode" : "Dark Mode"}
        </button>
        <button
          className={styles.toolbarButton}
          name="readOnly"
          onClick={this.props.handleChange}
        >
          {this.props.readOnly ? "Edit" : "Save"}
        </button>
      </div>
    );
  }
}

export default Toolbar;
