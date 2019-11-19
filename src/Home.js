import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {Button, createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import localStorage from "local-storage";
import TextField from "@material-ui/core/TextField";
import Zoom from "@material-ui/core/Zoom";
import Tooltip from "@material-ui/core/Tooltip";


const theme = createMuiTheme({
    overrides: {
        MuiTooltip: {
            tooltip: {
                fontSize: "20px",
                color: "white",
                //backgroundColor: "#A9A9A9",
                backgroundColor: "rgba(99, 90, 121, 0.9)",
                maxWidth: '1000px'
            }
        }
    }
});

// Umrandungen für Bilder
const Borderstyles = {
    border: {
        border: "4px solid rgba(255, 0, 0, 0.6)",
        borderRadius: "10px 10px",
        margin: "5px",
        padding: "5px"
    },
    noBorder: {
        border: "4px solid rgba(0, 0, 0, 0.2)",
        borderRadius: "10px 10px",
        margin: "5px",
        padding: "5px"
    }
};

class Home extends Component {
    constructor(props) {
        super(props);

        this.deleteLocalStorage = this.deleteLocalStorage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkDisabledButtons = this.checkDisabledButtons.bind(this);
        this.applyBorder1 = this.applyBorder1.bind(this);
        this.applyBorder2 = this.applyBorder2.bind(this);
        this.applyBorder3 = this.applyBorder3.bind(this);

        this.state = {
            Vorname: "",
            Nachname: "",
            disableButtons: true,
            showBorder1: false,
            showBorder2: false,
            showBorder3: false,
        };

        if (localStorage.get("FamilyData") === null) {
            localStorage.set("FamilyData", []);
        }

        if (localStorage.get("TutorialDone") === null) {
            localStorage.set("TutorialDone", false);
        }
    }

    // 2 gleiche Funktionen, um Umrandungen für gender-picture hinzuzufügen
    applyBorder1() {
        this.setState(
            state => ({showBorder1: true, showBorder2: false, showBorder3: false}),
            () => {
                localStorage.set("me_gender", "male");
                localStorage.set("showBorder1", this.state.showBorder1);
                localStorage.set("showBorder2", this.state.showBorder2);
                localStorage.set("showBorder3", this.state.showBorder3);
                this.checkDisabledButtons();
            }
        );
    }

    applyBorder2() {
        this.setState(
            state => ({showBorder2: true, showBorder1: false, showBorder3: false}),
            () => {
                localStorage.set("me_gender", "female");
                localStorage.set("showBorder1", this.state.showBorder1);
                localStorage.set("showBorder2", this.state.showBorder2);
                localStorage.set("showBorder3", this.state.showBorder3);
                this.checkDisabledButtons();
            }
        );
    }

    applyBorder3() {
        this.setState(
            state => ({showBorder3: true, showBorder1: false, showBorder2: false}),
            () => {
                localStorage.set("me_gender", "other");
                localStorage.set("showBorder1", this.state.showBorder1);
                localStorage.set("showBorder2", this.state.showBorder2);
                localStorage.set("showBorder3", this.state.showBorder3);
                this.checkDisabledButtons();
            }
        );
    }

    //Deleting the Local Storage by Button --> Probably not needed in the future.
    deleteLocalStorage() {
        console.log(
            "-  " + new Date().toLocaleTimeString() + " _Home_ Local Storage Cleared"
        );
        localStorage.clear();
    }

    //Try to fetch the gender of me from the localStorage
    componentWillMount() {
        if (localStorage.get("me_gender")) {
            if (localStorage.get("me_gender") === "male") {
                this.setState({
                    showBorder1: true,
                    showBorder2: false,
                    showBorder3: false
                });
            }
            if (localStorage.get("me_gender") === "female") {
                this.setState({
                    showBorder1: false,
                    showBorder2: true,
                    showBorder3: false
                });
            }

            if (localStorage.get("me_gender") === "other") {
                this.setState({
                    showBorder1: false,
                    showBorder2: false,
                    showBorder3: true
                });
            }
        }
        this.checkDisabledButtons();
    }

    //Log when the User comes to HOME
    componentDidMount() {
        console.log("-  " + new Date().toLocaleTimeString() + " _Home_ ");

        this.setState(
            {
                Vorname: localStorage.get("Vorname"),
                Nachname: localStorage.get("Nachname")
            },
            () => {
                // Completeness aller Textfelder wird überprüft, sobald sich ein Input ändert
                this.checkDisabledButtons();
            }
        );
    }

    handleChange = () => event => {
        this.setState({[event.target.name]: event.target.value}, () => {
            localStorage.set("Vorname", this.state.Vorname);
            localStorage.set("Nachname", this.state.Nachname);
            localStorage.set("showBorder1", this.state.showBorder1);
            localStorage.set("showBorder2", this.state.showBorder2);
            localStorage.set("showBorder3", this.state.showBorder3);
            this.checkDisabledButtons();
        });
    };

    checkDisabledButtons() {
        if (
            this.state.Vorname === "" ||
            this.state.Vorname === null ||
            this.state.Nachname === "" ||
            this.state.Nachname === null ||
            (this.state.showBorder1 === false && this.state.showBorder2 === false && this.state.showBorder3 === false) ||
            (this.state.showBorder1 === true && this.state.showBorder2 === true && this.state.showBorder3 === true)
        ) {
            this.setState({
                disableButtons: true
            });
        } else {
            this.setState({
                disableButtons: false
            });
        }
    }

    //displays the "Sozialanamnese" Button AND the tooltip if the button is disabled
    getSozialanamneseButton() {
        if (this.state.disableButtons) {
            return (
                <MuiThemeProvider theme={theme}>
                    <Tooltip TransitionComponent={Zoom} title="Bitte geben Sie Vorname, Name und Geschlecht an.">
                <span>
                <Button
                    color="Primary"
                    disabled={this.state.disableButtons}
                    variant="contained"
                >
                  Sozialanamnese
                </Button>
                </span>
                    </Tooltip>
                </MuiThemeProvider>
            )
        } else {
            return (
                <Button
                    color="Primary"
                    disabled={this.state.disableButtons}
                    variant="contained"
                >
                    Sozialanamnese
                </Button>
            )
        }
    }

    //displays the "Familienanamnese" Button AND the tooltip if the button is disabled
    getFamilienanamneseButton() {
        if (this.state.disableButtons) {
            return (
                <MuiThemeProvider theme={theme}>
                    <Tooltip TransitionComponent={Zoom} title="Bitte geben Sie Vorname, Name und Geschlecht an.">
                <span>
              <Button
                  color="Primary"
                  disabled={this.state.disableButtons}
                  variant="contained"
              >
                Familienanamnese
              </Button>
                </span>
                    </Tooltip>
                </MuiThemeProvider>
            )
        } else {
            return (
                <Button
                    color="Primary"
                    disabled={this.state.disableButtons}
                    variant="contained"
                >
                    Familienanamnese
                </Button>
            )
        }
    }


    render() {
        return (
            <div>
                <div className="Titel">
                    <h1>Cobedias 2.0 - Willkommen</h1>
                </div>

                <div className="ChangingContent">
                    <h2>
                        Vielen Dank, dass Sie sich Zeit nehmen, unseren Prototypen zu
                        testen.
                    </h2>
                    <p>
                        Bitte geben Sie hier unten Ihren Vornamen sowie Ihren Nachnamen ein.{" "}
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

                    <br/>
                    <div id="root">
                        <p>Bitte wählen Sie ihr Geschlecht aus:</p>
                        <div className="genderSelectionDiv">
                            <img
                                height="91px"
                                width="91px"
                                value={this.state.showBorder1}
                                onChange={this.handleChange("showBorder1")}
                                src={require("./images/028-man.svg")}
                                onClick={this.applyBorder1}
                                style={
                                    this.state.showBorder1
                                        ? Borderstyles.border
                                        : Borderstyles.noBorder
                                }
                            />
                            <p className="genderSelection">Mann</p>
                        </div>
                        <div className="genderSelectionDiv">
                            <img
                                height="91px"
                                width="91px"
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
                            <p className="genderSelection">Frau</p>
                        </div>
                        <div className="genderSelectionDiv">
                            <img
                                height="91px"
                                width="91px"
                                value={this.state.showBorder3}
                                onChange={this.handleChange("showBorder3")}
                                src={require("./images/OtherIcon.svg")}
                                onClick={this.applyBorder3}
                                style={
                                    this.state.showBorder3
                                        ? Borderstyles.border
                                        : Borderstyles.noBorder
                                }
                            />
                            <p className="genderSelection">Andere</p>
                        </div>
                    </div>

                    <div style={{clear: "both"}}>
                        <p>
                            Um zu beginnen, können Sie entweder auf "Sozialanamnese" oder auf
                            "Familienanamnese" drücken.
                        </p>
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


                            {this.getSozialanamneseButton()}


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
                            {this.getFamilienanamneseButton()}
                        </NavLink>
                    </div>

                    <Button
                        style={{position: "absolute", bottom: "10px"}}
                        onClick={this.deleteLocalStorage}
                    >
                        Clear Local Storage
                    </Button>
                </div>
            </div>
        );
    }
}

export default Home;
