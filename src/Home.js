import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@material-ui/core";
import localStorage from "local-storage";
<<<<<<< HEAD
import TextField from "@material-ui/core/TextField";

// Umrandungen für Bilder
const Borderstyles = {
  border: {
    border: "2px solid red"
  },
  noBorder: {
    border: "2px solid transparent"
  }
};
=======
import {
  PDFDownloadLink,
  Page,
  Text,
  Document,
  StyleSheet
} from "@react-pdf/renderer";
>>>>>>> master

class Home extends Component {
  constructor(props) {
    super(props);
<<<<<<< HEAD

    this.deleteLocalStorage = this.deleteLocalStorage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkDisabledButtons = this.checkDisabledButtons.bind(this);
    this.applyBorder = this.applyBorder.bind(this);
    this.applyBorder2 = this.applyBorder2.bind(this);

    this.state = {
      Vorname: "",
      Nachname: "",
      disableButtons: true,
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

  //Deleting the Local Storage by Button --> Probably not needed in the future.
=======
    this.deleteLocalStorage = this.deleteLocalStorage.bind(this);
  }

  //Deleting the Local Storage by Button --> Probably not needed in hte future.
>>>>>>> master
  deleteLocalStorage() {
    console.log(
      "-  " + new Date().toLocaleTimeString() + " _Home_ Local Storage Cleared"
    );
    localStorage.clear();
  }

<<<<<<< HEAD
  //Log when the User comes to HOME
  componentDidMount() {
    console.log("-  " + new Date().toLocaleTimeString() + " _Home_ ");

    this.setState(
      {
        Vorname: localStorage.get("Vorname"),
        Nachname: localStorage.get("Nachname"),
        showBorder: localStorage.get("showBorder"),
        showBorder2: localStorage.get("showBorder2")
      },
      () => {
        // Completeness aller Textfelder wird überprüft, sobald sich ein Input ändert
        this.checkDisabledButtons();
      }
    );
  }

  handleChange = () => event => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      localStorage.set("Vorname", this.state.Vorname);
      localStorage.set("Nachname", this.state.Nachname);
      localStorage.set("showBorder", this.state.showBorder);
      localStorage.set("showBorder", this.state.showBorder2);
      this.checkDisabledButtons();
    });
  };

  checkDisabledButtons() {
    if (
      this.state.Vorname === "" ||
      this.state.Vorname === null ||
      this.state.Nachname === "" ||
      this.state.Nachname === null ||
      //geht noch nicht,bei beiden Kombis sollte man nicht weiterkommen
      (this.state.showBorder === false && this.state.showBorder2 === false) ||
      (this.state.showBorder === true && this.state.showBorder2 === true)
    ) {
      this.setState({
        disableButtons: true
      });
    } else {
      this.setState({
        disableButtons: false
      });
    }
=======
  //Log when the User comes to HOME.git
  componentDidMount() {
    console.log("-  " + new Date().toLocaleTimeString() + " _Home_ ");
>>>>>>> master
  }

  render() {
    return (
      <div>
        <div className="Titel">
          <h1>Cobedias 2.0 - Willkommen</h1>
        </div>

<<<<<<< HEAD
        <div className="ChangingContent">
          <h2>
            Vielen Dank, dass Sie sich Zeit nehmen, unseren Prototypen zu
            testen.
          </h2>
          <p>
            Bitte geben Sie hier unten Ihren Vorname sowie Ihren Nachname ein.{" "}
          </p>

          <div>
            <TextField
              label="Vorname"
              margin="normal"
              variant="outlined"
              name="Vorname"
              value={this.state.Vorname}
              onChange={this.handleChange("Vorname")}
              fullWidth
              placeholder="Geben Sie hier Ihren Vornamen ein"
            />
            <TextField
              label="Nachname"
              margin="normal"
              variant="outlined"
              name="Nachname"
              value={this.state.Nachname}
              onChange={this.handleChange("Nachname")}
              fullWidth
              placeholder="Geben Sie hier Ihren Nachnamen ein"
            />
          </div>

=======
        <div>
          <p>
            Vielen Dank, dass Sie sich Zeit nehmen, unseren Prototypen zu
            testen.
          </p>
>>>>>>> master
          <p>
            Um zu beginnen, können Sie entweder auf "Sozialanamnese" oder auf
            "Familienanamnese" drücken.
          </p>
<<<<<<< HEAD
          <br />
          <div id="root">
            <p>Bitte wählen Sie ihr Geschlecht aus:</p>
            <img
              height="50px"
              width="50px"
              value={this.state.showBorder}
              onChange={this.handleChange("showBorder")}
              src={require("./images/028-man.svg")}
              onClick={this.applyBorder}
              style={
                this.state.showBorder
                  ? Borderstyles.border
                  : Borderstyles.noBorder
              }
            />

            <img
              height="50px"
              width="50px"
              value={this.state.showBorder2}
              onChange={this.handleChange("showBorder2")}
              src={require("./images/003-woman.svg")}
              onClick={this.applyBorder2}
              style={
                this.state.showBorder2
                  ? Borderstyles.border
                  : Borderstyles.noBorder
              }
            />
          </div>

          <div className="StartButtonDiv">
            <NavLink
              exact
              to={this.state.disableButtons === false ? "/Sozialanamnese" : "#"}
              style={{
                "text-decoration": "none",
                margin: "3px",
                background: "transparent"
              }}
            >
              <Button
                color="Primary"
                disabled={this.state.disableButtons}
                variant="contained"
              >
                Sozialanamnese
              </Button>
            </NavLink>
            <NavLink
              exact
              to={
                this.state.disableButtons === false ? "/Familienanamnese" : "#"
              }
              style={{
                "text-decoration": "none",
                margin: "3px",
                background: "transparent"
              }}
            >
              <Button
                color="Primary"
                disabled={this.state.disableButtons}
                variant="contained"
              >
                Familienanamnese
              </Button>
            </NavLink>
          </div>

          <Button
            style={{ position: "absolute", bottom: "10px" }}
            onClick={this.deleteLocalStorage}
          >
            Clear Local Storage
          </Button>
        </div>
=======

          <NavLink exact to="/Sozialanamnese">
            <Button>Sozialanamnese</Button>
          </NavLink>
          <NavLink exact to="/Familienanamnese">
            <Button>Familienanamnese</Button>
          </NavLink>

          <Button onClick={this.deleteLocalStorage}>Clear Local Storage</Button>
        </div>

        <div>Currently using React {React.version}</div>
>>>>>>> master
      </div>
    );
  }
}

export default Home;
