import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/List";

export class Success extends Component {
  continue = e => {
    e.preventDefault();
    //Process form//
    this.props.nextStep();
  };
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Success" />
          <h1>Danke fürs teilnehmen</h1>
          <p>Weitere Email folgt</p>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default Success;
