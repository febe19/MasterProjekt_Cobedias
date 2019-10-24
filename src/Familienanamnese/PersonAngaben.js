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

export class PersonAngaben extends Component {
  //Bilderobjekt
  constructor(props) {
    super(props);
    this.state = {
      Bilder: {
        Männlich: {
          title: "Männlich",
          image: require("../components/images/männlich.png"),
          selected: false
        },
        Weiblich: {
          title: "Weiblich",
          image: require("../components/images/weiblich.png"),
          selected: false
        }
      }
    };
  }

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  // Ränder hinzufügen bei anklicken
  onIconClick(event) {
    //Neues Objekt mit aktueller Stateinformation erzeugen
    let newState = Object.assign({}, this.state);
    //der Rand aller Bilder wird entfernt
    for (let selection in newState.Bilder) {
      if (selection !== event.target.id) {
        newState.Bilder[selection].selected = false;
      }
    }
    //..ausser der Rand des geclickten targets
    newState.Bilder[event.target.id].selected = true;
    //updaten des States mit aktuellen Informationen
    this.setState({
      newState
    });
  }

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

              {Object.keys(this.state.Bilder).map(icon => (
                <div
                  className={
                    this.state.Bilder[icon]["selected"]
                      ? "withBorder"
                      : "noBorder"
                  }
                >
                  <img
                    src={this.state.Bilder[icon]["image"]}
                    id={this.state.Bilder[icon]["name"]}
                    onClick={e => this.onIconClick(e)}
                  />
                  <p>{this.state.Bilder[icon]["name"]}</p>
                </div>
              ))}
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
