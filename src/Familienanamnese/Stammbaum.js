import React, { Component } from "react";
import "../App.css";
import Box from "@material-ui/core/Box";
import FamilyTree from "./FamilyTreeComponent";
import styles from "./FamilyTree.module.css";
import Toggle, { Tutorial_1 } from "./Tutorial_1";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import { StylesContext } from "@material-ui/styles/StylesProvider";

export class Stammbaum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "white",
      showComponent: false,
      panels: []
    };
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  _onButtonClick() {
    const nextId = this.state.panels.length + 1;
    this.setState({
      showComponent: true,
      panels: this.state.panels.concat([nextId])
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <div className="App" style={{ backgroundColor: this.state.color }}>
            {this.state.showComponent ? <Tutorial_1 /> : null}
            <Box display="flex" justifyContent="flex-start" m={1} p={1}>
              <Box p={1}>
                <img
                  src={require("../components/images/logo_cobedias.png")}
                  style={{ width: "40%" }}
                  m={1}
                  p={1}
                />
                <FamilyTree />
              </Box>
            </Box>

            <Box
              display="flex"
              justifyContent="flex-start"
              flexDirection="column"
              alignItems="flex-start"
              m={1}
              p={1}
            >
              <img
                src={require("../components/images/question.png")}
                m={2}
                p={2}
                onClick={this._onButtonClick}
              />
            </Box>
            <Box display="flex" justifyContent="center">
              <RaisedButton
                p={2}
                m={2}
                label="Weiter"
                primary={true}
                style={StylesContext.button}
                onClick={this.continue}
              />

              <RaisedButton
                p={2}
                m={2}
                label="Zurück"
                primary={true}
                style={StylesContext.button}
                onClick={this.back}
              />
            </Box>
          </div>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default Stammbaum;
