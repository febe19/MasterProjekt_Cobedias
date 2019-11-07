import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {Button} from "@material-ui/core";
import localStorage from "local-storage";
import TextField from "@material-ui/core/TextField";

// Umrandungen für Bilder
const Borderstyles = {
    border: {
        border: "2px solid red",
        borderRadius: "10px 10px",
        margin: "5px",
        padding: "5px"
    },
    noBorder: {
        border: "2px solid rgba(0, 0, 0, 0.2)",
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
        this.applyBorder = this.applyBorder.bind(this);
        this.applyBorder2 = this.applyBorder2.bind(this);

        this.state = {
            Vorname: "",
            Nachname: "",
            disableButtons: true,
            showBorder1: false,
            showBorder2: false
        };

        if ( localStorage.get('FamilyData') === null) {
            localStorage.set('FamilyData', []);
        }
    }

    // 2 gleiche Funktionen, um Umrandungen für gender-picture hinzuzufügen
    applyBorder() {
        this.setState(state => ({showBorder1: true, showBorder2: false}), () => {
            localStorage.set("me_gender", "male");
            localStorage.set("showBorder1", this.state.showBorder1);
            localStorage.set("showBorder2", this.state.showBorder2);
            this.checkDisabledButtons();
        });
    }

    applyBorder2() {
        this.setState(state => ({showBorder2: true, showBorder1: false}), () => {
            localStorage.set("me_gender", "female");
            localStorage.set("showBorder1", this.state.showBorder1);
            localStorage.set("showBorder2", this.state.showBorder2);
            this.checkDisabledButtons();
        });
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
        console.log("willmount");
        console.log(localStorage.get('me_gender'));
        if (localStorage.get('me_gender')) {
            if (localStorage.get('me_gender') === 'male') {
                this.setState({
                    showBorder1: true,
                    showBorder2: false
                });
            }
            if (localStorage.get('me_gender') === 'female') {
                this.setState({
                    showBorder1: false,
                    showBorder2: true
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
            this.checkDisabledButtons();
        });
    };

    checkDisabledButtons() {
        if (
            this.state.Vorname === "" ||
            this.state.Vorname === null ||
            this.state.Nachname === "" ||
            this.state.Nachname === null ||
            (this.state.showBorder1 === false && this.state.showBorder2 === false) ||
            (this.state.showBorder1 === true && this.state.showBorder2 === true)
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

                    <br/>
                    <div id="root">
                        <p>Bitte wählen Sie ihr Geschlecht aus:</p>
                        <div className="genderSelectionDiv" >
                            <img
                                height="91px"
                                width="91px"
                                value={this.state.showBorder1}
                                onChange={this.handleChange("showBorder1")}
                                src={require("./images/028-man.svg")}
                                onClick={this.applyBorder}
                                style={
                                    this.state.showBorder1
                                        ? Borderstyles.border
                                        : Borderstyles.noBorder
                                }
                            />
                            <p className="genderSelection">Mann</p>
                        </div>
                        <div className="genderSelectionDiv" >
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
