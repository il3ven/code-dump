import React from "react";
import styled from "styled-components";

// class InputDropdown extends React.Component {
//   escFunction = (event) => {
//     if (event.keyCode === 27) {
//       this.props.handleSubmit(event);
//     }
//   };

//   componentDidMount() {
//     document.addEventListener("keydown", this.escFunction, false);
//   }

//   componentWillUnmount() {
//     document.removeEventListener("keydown", this.escFunction, false);
//   }

//   temp = (event) => {
//     console.log(event);
//   };

//   render() {
//     return (
//       <>
//         <input
//           list="browsers"
//           id="myBrowser"
//           name="myBrowser"
//           onClick={this.temp}
//         />
//         <input type="submit" onClick={this.props.handleSubmit}></input>
//         <datalist id="browsers" onClick={this.props.handleSubmit}>
//           <option value="Chrome" />
//           <option value="Firefox" />
//           <option value="Internet Explorer" />
//           <option value="Opera" />
//           <option value="Safari" />
//           <option value="Microsoft Edge" />
//         </datalist>
//       </>
//     );
//   }
// }

const InputBarStyled = styled.div`
  margin: 0 auto;
  display: flex;
  flex-flow: column nowrap;
  width: 25rem;
  max-width: 100%;

  input {
    background-color: rgb(112, 112, 112);
    height: 20pt;
    color: white;
    border: none;
    padding: 0 5pt 0;
  }

  input::placeholder {
    color: white;
  }

  input:focus {
    outline: none;
  }
`;

const OptionsDiv = styled.div`
  max-height: calc(18pt * 6);
  overflow: auto;
`;

const Button = styled.button`
  {
    display: block;
    width: 100%;
    height: 18pt;
    color: white;
    text-align: center;
    background-color: rgb(23, 23, 23);
    padding: 3pt;
    border: none;
  }

  &:focus {
    outline: none;
  }

  &.selected 
`;

const ButtonSelected = styled(Button)`
   {
    background-color: rgb(66, 58, 58);
  }
`;

class InputBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      selectedIndex: 0,
      filteredOptions: this.props.options.slice(0, InputBar.max_options),
    };
  }

  static max_options = 50; // For experiment, using a very large value

  handleChange = (event) => {
    const userInput = event.target.value;
    const filteredOptions = this.props.options.filter(
      (opt) => opt.alias.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    this.setState({
      value: event.target.value,
      selectedIndex: 0,
      filteredOptions: filteredOptions.slice(0, InputBar.max_options),
    });
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (this.state.filteredOptions.length !== 0) {
        this.props.handleSubmit(
          this.state.filteredOptions[this.state.selectedIndex]
        );
      }
    }
  };

  handleKeyDown = (event) => {
    const state = this.state;
    const filteredOptions = this.state.filteredOptions;
    let selectedIndex = 0;

    if (event.key === "ArrowDown") {
      selectedIndex = (state.selectedIndex + 1) % filteredOptions.length;
      this.setState({ selectedIndex: selectedIndex });
    } else if (event.key === "ArrowUp") {
      selectedIndex =
        (state.selectedIndex - 1 + filteredOptions.length) %
        filteredOptions.length;
      this.setState({ selectedIndex: selectedIndex });
    }
  };

  render() {
    return (
      <InputBarStyled>
        <input
          type="text"
          value={this.state.value}
          placeholder="Search..."
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          onKeyDown={this.handleKeyDown}
          autoFocus={true}
        ></input>
        <OptionsDiv>
          {this.state.filteredOptions.map((opt, index) => {
            const props = {
              key: index,
              value: index,
              onClick: (event) => {
                this.props.handleSubmit(
                  this.state.filteredOptions[event.target.value]
                );
              },
              onMouseEnter: (event) => {
                this.setState({
                  selectedIndex: parseInt(event.target.value),
                });
              },
            };

            const returnElement =
              index !== this.state.selectedIndex
                ? React.createElement(Button, props, opt.alias)
                : React.createElement(ButtonSelected, props, opt.alias);

            return returnElement;
            // return <button>{opt.alias}</button>;
          })}
        </OptionsDiv>
      </InputBarStyled>
    );
  }
}

export { InputBar };
