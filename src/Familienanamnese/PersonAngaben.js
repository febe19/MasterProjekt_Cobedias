import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { render } from "react-dom";

import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import { StylesContext } from "@material-ui/styles/StylesProvider";

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

//Traversy: FormUserDetails
export class PersonAngaben extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;

    return (
      <div style={{ width: "100%" }}>
        <MuiThemeProvider>
          <React.Fragment>
            <AppBar
              title={
                <img
                  src={require("../components/images/logo_cobedias.png")}
                  height="42"
                  width="65"
                />
              }
            />

            <p>Bitte Nach- sowie Vornamen eingeben:</p>
            <TextField
              placeholder="Bitte geben Sie Ihren Vornamen ein"
              label="Vorname"
              onChange={handleChange("vorName")}
              defaultValue={values.vorName}
            />
            <br />
            <TextField
              placeholder="Bitte geben Sie Ihren Nachnamen ein"
              label="Nachname"
              onChange={handleChange("nachName")}
              defaultValue={values.nachName}
            />
            <br />
            <RaisedButton
              label="Weiter"
              primary={true}
              style={StylesContext.button}
              onClick={this.continue}
            />

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
              <p>
                Bitte Geschlecht auswählen:
                <br />
              </p>
              <img
                src={require("../components/images/männlich.png")}
                alt="Männlich"
                style={{ width: "5%" }}
                m={1}
                p={1}
              />
              <img
                src={require("../components/images/weiblich.png")}
                alt="Weiblich"
                style={{ width: "4.3%" }}
                m={1}
                p={1}
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
