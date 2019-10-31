import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {Button} from '@material-ui/core';
import localStorage from 'local-storage'
import TextField from "@material-ui/core/TextField";

class Home extends Component {
    constructor(props) {
        super(props);

        this.deleteLocalStorage = this.deleteLocalStorage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkDisabledButtons = this.checkDisabledButtons.bind(this);

        this.state = {
            Vorname: '',
            Nachname: '',
            disableButtons: true
        };
    }

    //Deleting the Local Storage by Button --> Probably not needed in hte future.
    deleteLocalStorage() {
        console.log("-  " + new Date().toLocaleTimeString() + " _Home_ Local Storage Cleared");
        localStorage.clear();
    }

    //Log when the User comes to HOME
    componentDidMount() {
        console.log("-  " + new Date().toLocaleTimeString() + " _Home_ ");

        this.setState({
            Vorname: localStorage.get('Vorname'),
            Nachname: localStorage.get('Nachname')
        }, () => {
            // Completeness aller Textfelder wird überprüft, sobald sich ein Input ändert
            this.checkDisabledButtons();
        });
    }

    handleChange = () => event => {
        this.setState({[event.target.name]: event.target.value}, () => {
            localStorage.set('Vorname', this.state.Vorname);
            localStorage.set('Nachname', this.state.Nachname);
            this.checkDisabledButtons();
        });
    };

    checkDisabledButtons() {
        if (this.state.Vorname === '' || this.state.Vorname === null || this.state.Nachname === '' || this.state.Nachname === null) {
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

                <div className='ChangingContent'>
                    <h2>Vielen Dank, dass Sie sich Zeit nehmen, unseren Prototypen zu testen.</h2>
                    <p>Bitte geben Sie hier unten Ihren Vorname sowie Ihren Nachname ein. </p>

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

                    <p>Um zu beginnen, können Sie entweder auf "Sozialanamnese" oder auf "Familienanamnese" drücken.</p>

                    <div>
                        TODO: In this div the gender selection should happen.
                    </div>

                    <div className='StartButtonDiv'>
                        <NavLink exact to={this.state.disableButtons === false ? "/Sozialanamnese" : "#"}
                                 style={{"text-decoration": "none", margin: '3px', background: 'transparent'}}>
                            <Button color="Primary" disabled={this.state.disableButtons}
                                    variant="contained">Sozialanamnese</Button>
                        </NavLink>
                        <NavLink exact to={this.state.disableButtons === false ? "/Familienanamnese" : "#"}
                                 style={{"text-decoration": "none", margin: '3px', background: 'transparent'}}>
                            <Button color="Primary" disabled={this.state.disableButtons}
                                    variant="contained">Familienanamnese</Button>
                        </NavLink>

                    </div>



                    <Button style={{position: 'absolute', bottom: '10px'}} onClick={this.deleteLocalStorage}>
                        Clear Local Storage
                    </Button>
                </div>

            </div>
        );
    }
}

export default Home;
