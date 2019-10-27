import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import TextField from "@material-ui/core/TextField";

import Box from "@material-ui/core/Box";
import { render } from "react-dom";

import "../App.css";
import RaisedButton from "material-ui/RaisedButton";
import { StylesContext } from "@material-ui/styles/StylesProvider";

//Verschiedene Elemente Styles
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  }
}));

// Farben der Umrandungen
const Borderstyles = {
  border: {
    border: "2px solid red"
  },
  noBorder: {
    border: "2px solid transparent"
  }
};

export class PersonAngaben extends Component {
  constructor(props) {
    super(props);
    this.applyBorder = this.applyBorder.bind(this);
    this.applyBorder2 = this.applyBorder2.bind(this);
    this.state = {
      showBorder: false,
      showBorder2: false
    };
  }

  // 2 gleiche Funktionen, um Umrandungen hinzuzufügen
  applyBorder() {
    this.setState(state => ({ showBorder: !state.showBorder }));
  }
  applyBorder2() {
    this.setState(state => ({ showBorder2: !state.showBorder2 }));
  }

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;

    return (
      <div className="App" style={{ width: "100%" }}>
        <MuiThemeProvider>
          <React.Fragment>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
              p={1}
              m={1}
            >
              <img
                style={{ width: "10%" }}
                src={require("../components/images/logo_cobedias.png")}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
              m={2}
              p={2}
            >
              <div className="col-md-6">
                <h2>Bitte Vor- sowie Nachname eingeben:</h2>
                <TextField
                  p={1}
                  m={1}
                  placeholder="Bitte geben Sie Ihren Vornamen ein"
                  label="Vorname"
                  onChange={handleChange("vorName")}
                  defaultValue={values.vorName}
                />
                <br />
                <TextField
                  p={1}
                  m={1}
                  placeholder="Bitte geben Sie Ihren Nachnamen ein"
                  label="Nachname"
                  onChange={handleChange("nachName")}
                  defaultValue={values.nachName}
                />
              </div>
              <br />
            </Box>

            <Box
              display="flex"
              justifyContent="flex-start"
              flexDirection="row"
              alignItems="flex-start"
              m={1}
              p={1}
            >
              <Box
                display="flex"
                justifyContent="flex-start"
                flexDirection="column"
                alignItems="flex-start"
                m={1}
                p={1}
              >
                {" "}
              </Box>
              <h3>
                Bitte Geschlecht auswählen:
                <br />
              </h3>

              <div id="root">
                <img
                  src={require("../components/images/weiblich.png")}
                  onClick={this.applyBorder}
                  style={
                    this.state.showBorder
                      ? Borderstyles.border
                      : Borderstyles.noBorder
                  }
                />

                <img
                  src={require("../components/images/männlich.png")}
                  onClick={this.applyBorder2}
                  style={
                    this.state.showBorder2
                      ? Borderstyles.border
                      : Borderstyles.noBorder
                  }
                />
              </div>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="flex-end">
              <RaisedButton
                label="Weiter"
                primary={true}
                style={StylesContext.button}
                onClick={this.continue}
              />
            </Box>
          </React.Fragment>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default PersonAngaben;

const styles = {
  button: {
    margin: 15
  }
};
