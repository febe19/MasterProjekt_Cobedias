import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
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

//TODO: Rand bei Anklicken hinzufügen

export class PersonAngaben extends Component {
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
              <img
                src={require("../components/images/männlich.png")}
                id="i1"
                alt="Männlich"
                style={{ width: "5%" }}
                m={2}
                p={2}
              />
              <img
                src={require("../components/images/weiblich.png")}
                id="i1"
                alt="Weiblich"
                style={{ width: "4.3%" }}
                m={2}
                p={2}
              />
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
