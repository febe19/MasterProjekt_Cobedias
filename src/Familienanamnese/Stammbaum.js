import React, { Component } from "react";
import "../App.css";
import Box from "@material-ui/core/Box";
import FamilyTree from "./FamilyTreeComponent";
import styles from "./FamilyTree.module.css";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import Toggle, { Tutorial_1 } from "./Tutorial_1";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import { StylesContext } from "@material-ui/styles/StylesProvider";

import Popup from "reactjs-popup";
import { makeStyles } from "@material-ui/core/styles";

const classes = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  button: {
    marginRight: theme.spacing(1)
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

export class Stammbaum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "white",
      showComponent: false,
      panels: [],
      style: {
        width: "0%"
      }
    };
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
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

  componentDidMount() {
    document.addEventListener("click", this.closeNav);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.closeNav);
  }

  openNav() {
    const style = { width: "100%" };
    this.setState({ style });
    document.body.style.backgroundColor = "rgba(0,0,0,0.3)";
    document.addEventListener("click", this.closeNav);
  }

  closeNav() {
    document.removeEventListener("click", this.closeNav);
    const style = { width: 0 };
    this.setState({ style });
    document.body.style.backgroundColor = "#F3F3F3";
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        <div className="Titel">
          <h1 style={{ display: "inline-block" }}>
            Cobedias 2.0 - Familienanamnese
          </h1>

          <NavLink exact to="/" style={{ "text-decoration": "none" }}>
            <Button
              variant="outlined"
              style={{
                float: "right",
                marginRight: "5%",
                color: "white",
                borderColor: "white"
              }}
            >
              Startseite
            </Button>
          </NavLink>

          <NavLink
            exact
            to="/Sozialanamnese"
            style={{ "text-decoration": "none" }}
          >
            <Button
              variant="outlined"
              style={{
                float: "right",
                marginRight: "1%",
                color: "white",
                borderColor: "white"
              }}
            >
              Sozialanamnese
            </Button>
          </NavLink>
        </div>

        <div>
          <MuiThemeProvider>
            <React.Fragment>
              <div
                className="App"
                style={{ backgroundColor: this.state.color }}
              >
                <Box display="flex" justifyContent="flex-start" m={1} p={1}>
                  <Box p={1}>
                    <div className="Stammbaum">
                      <FamilyTree />
                    </div>
                  </Box>
                </Box>

                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  m={1}
                  p={1}
                >
                  <span //Im span wird das Overlay eingeführt mit schliessenden und öffnenden navs
                    style={{ fontSize: 30, cursor: "pointer" }}
                    onClick={this.openNav}
                  >
                    <img
                      src={require("../components/images/help.PNG")}
                      width="70px"
                      height="70px"
                      m={2}
                      p={2}
                      onClick={this._onButtonClick}
                    />
                  </span>
                  <div ref="snav" className="overlay" style={this.state.style}>
                    <div className="sidenav-container">
                      <div className="text-center"></div>
                      <a
                        href="javascript:void(0)"
                        className="closebtn"
                        onClick={this.closeNav}
                      >
                        ×
                      </a>
                      <div className="list-group">
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyItems="center"
                          m={2}
                          p={2}
                        >
                          {
                            <p style={{ color: "white" }}>
                              <br />
                              In diesem Familienstammbaum können sämtliche
                              Familienmitglieder erfasst werden. Weibliche
                              Familienmitglieder werden rosa angezeigt,
                              männliche hellblau.
                              <br /> Die Verwandschaftsverhältnisse sind über
                              Linien dargestellt. Ziel ist es soviele Personen,
                              wie möglich zu erwähnen, um ein möglichst
                              komplettes Bild zu bekommen.
                              <br />
                              Darüber hinaus können bestehende Personen
                              bearbeitet oder gelöscht werden.
                            </p>
                          }
                          {this.props.children}
                        </Box>
                      </div>
                    </div>
                  </div>
                </Box>
                <Box
                  display="flex"
                  alignItems="flex-end"
                  alignContent="flex-end"
                  j
                  justifyContent="center"
                  m={2}
                  p={2}
                >
                  <Popup
                    trigger={<button className="button"> Abschliessen</button>}
                    position="top center"
                    closeOnDocumentClick
                  >
                    <div>
                      Wollen sie den Familienstammbaum nun exportieren und zum
                      Hauptmenü zurückkehren?
                      <NavLink
                        exact
                        to="/"
                        style={{ "text-decoration": "none" }}
                      >
                        <Button className={classes.button}>Ja</Button>
                      </NavLink>
                    </div>
                  </Popup>
                </Box>
              </div>
            </React.Fragment>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default Stammbaum;
