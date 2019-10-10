import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";

import RaisedButton from "material-ui/RaisedButton";
import { StylesContext } from "@material-ui/styles/StylesProvider";
import { makeStyles } from "@material-ui/core/styles";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

// Container element for button and text
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import PersonAngaben from "./PersonAngaben";

//Include button and colors

export class FA_anfang extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    return (
      <MuiThemeProvider>
        <div style={{ width: "100%" }}>
          <Box p={1}>
            <img
              src={require("../components/images/logo_cobedias.png")}
              style={{ width: "10%" }}
              m={1}
              p={1}
            />
          </Box>

          <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xs">
              <p>
                Bitte erstellen Sie mit dieser Anwendung einen Stammbaum Ihrer
                direkten Verwandten. Es spielen nur blutsverwandten Personen
                sowie allfällige PartnerinInnen mit denen Sie gemeinsame Kinder
                haben eine Rolle.
                <br /> <br /> Der Sinn hinter dieser Familienanamnese ist das
                Abklären von allfälligen Erbkrankheiten. <br />
                <br />
                Bitte füllen Sie die Angaben möglichst wahrheitsgetreu aus.
              </p>
              <RaisedButton
                label="Alles klar,los geht's"
                primary={true}
                style={StylesContext.button}
                onClick={this.continue}
              />
            </Container>
          </React.Fragment>
        </div>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  button: {
    margin: 15
  }
};
export default FA_anfang;
