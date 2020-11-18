import React from "react";
import "./input.css";

class InputDropdown extends React.Component {
  escFunction = (event) => {
    if (event.keyCode === 27) {
      this.props.handleSubmit(event);
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  temp = (event) => {
    console.log(event);
  };

  render() {
    return (
      <>
        <input
          list="browsers"
          id="myBrowser"
          name="myBrowser"
          onClick={this.temp}
        />
        <input type="submit" onClick={this.props.handleSubmit}></input>
        <datalist id="browsers" onClick={this.props.handleSubmit}>
          <option value="Chrome" />
          <option value="Firefox" />
          <option value="Internet Explorer" />
          <option value="Opera" />
          <option value="Safari" />
          <option value="Microsoft Edge" />
        </datalist>
      </>
    );
  }
}

class InputBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      selectedIndex: 0,
      filteredOptions: this.props.options,
    };
  }

  handleChange = (event) => {
    const userInput = event.target.value;
    const filteredOptions = this.props.options.filter(
      (opt) => opt.alias.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    this.setState({
      value: event.target.value,
      selectedIndex: 0,
      filteredOptions: filteredOptions,
    });
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log(this.state.selectedIndex);
      this.props.handleSubmit(
        this.state.filteredOptions[this.state.selectedIndex]
      );
    }
  };

  handleKeyDown = (event) => {
    const state = this.state;
    const filteredOptions = this.state.filteredOptions;

    if (event.key === "ArrowDown") {
      this.setState({
        selectedIndex: (state.selectedIndex + 1) % filteredOptions.length,
      });
    } else if (event.key === "ArrowUp") {
      this.setState({
        selectedIndex:
          (state.selectedIndex - 1 + filteredOptions.length) %
          filteredOptions.length,
      });
    }
  };

  render() {
    return (
      <div className="inputBar">
        <input
          type="text"
          value={this.state.value}
          placeholder="Enter..."
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          onKeyDown={this.handleKeyDown}
          autoFocus={true}
        ></input>
        <div>
          {this.state.filteredOptions.map((opt, index) => {
            const className =
              index !== this.state.selectedIndex
                ? "options"
                : "options selected";
            return (
              <button
                key={opt.key}
                value={index}
                className={className}
                onClick={(event) => {
                  this.props.handleSubmit(
                    this.state.filteredOptions[event.target.value]
                  );
                }}
              >
                {opt.alias}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

export { InputDropdown, InputBar };
