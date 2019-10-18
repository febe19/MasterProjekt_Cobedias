import React, { Component } from "react";

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggle: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({ isToggle: !this.state.isToggle });
  }

  render() {
    return (
      <div
        style={{ display: this.state.isToggle ? "block" : "none" }}
        className="container"
      >
        <h1 className="text-xs-center">List of items:</h1>
        <button className="btn btn-primary" onClick={this.handleClick}>
          Toggle
        </button>
        <div>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
        </div>
      </div>
    );
  }
}

export default Toggle;
