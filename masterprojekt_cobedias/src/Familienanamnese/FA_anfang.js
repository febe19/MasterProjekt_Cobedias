import React, { Component } from "react";
import Box from "@material-ui/core/Box";

// Container element for button and text
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

//Include button and colors
import Button from "@material-ui/core/Button";

export class FA_anfang extends Component {
  render() {
    return (
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
              direkten Verwandten. Es spielen nur blutsverwandten Personen sowie
              allfällige PartnerinInnen mit denen Sie gemeinsame Kinder haben
              eine Rolle.
              <br /> <br /> Der Sinn hinter dieser Familienanamnese ist das
              Abklären von allfälligen Erbkrankheiten. <br />
              <br />
              Bitte füllen Sie die Angaben möglichst wahrheitsgetreu aus.
            </p>
            <Button variant="outlined" color="primary">
              Alles klar, los geht's!
            </Button>
          </Container>
        </React.Fragment>
      </div>
    );
  }
}

export default FA_anfang;
