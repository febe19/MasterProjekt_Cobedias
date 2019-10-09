import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

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

export default function FilledTextFields() {
  const classes = useStyles();

  return (
    <div style={{ width: "100%" }}>
      <Box p={1} m={1}>
        <img
          src={require("../components/images/logo_cobedias.png")}
          style={{ width: "10%" }}
          m={1}
          p={1}
        />
      </Box>

      <Box
        display="flex"
        justifyContent="flex-start"
        flexDirection="row"
        alignItems="flex-start"
        m={1}
        p={1}
      >
        <p>Bitte Nach- sowie Vornamen eingeben:</p>
        <Box
          display="flex"
          justifyContent="flex-start"
          flexDirection="column"
          alignItems="flex-start"
          m={1}
          p={1}
        >
          <TextField
            id="Nachname"
            label="Nachame"
            className={classes.textField}
            margin="normal"
            variant="filled"
          />
          <TextField
            id="Vorname"
            label="Vorname"
            className={classes.textField}
            margin="normal"
            variant="filled"
          />{" "}
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
    </div>
  );
}
