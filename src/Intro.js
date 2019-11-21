import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

export class Intro extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div style={{width: "100%"}}>
                    <div className="Titel">
                        <h1 style={{display: 'inline-block'}}>Cobedias 2.0 - Intro</h1>
                    </div>
                </div>
                <div>
                    <div className="ChangingContent">
                        <h1>Herzlich Willkommen</h1>
                        <br/>
                        <p>Vielen Dank, dass Sie sich Zeit nehmen heute unseren Prototyp zu testen.</p>
                        <br/>
                        <h3>Generell</h3>
                        <p>In diesem Prototyp sollten Sie Angaben zu Ihnen sowie Ihrere Familie machen. Diese zwei
                            Untersuche heissen "Sozialanamnese" sowie "Familienanamnese" und sind Teil der Cobedias
                            Untersuchung von Prof. Dr. Barbara Biedermann.</p>
                        <br/>
                        <h3>Einige wichtige Hinweise:</h3>
                        <ul>
                            <li>Bitte beide Untersuche ausfüllen.</li>
                            <li>Daten bitte möglichst wahrheitsgetreu angeben.</li>
                            <li>Wenn beide Anamnesen abgeschlossen werden, wird je ein PDF-Dokument heruntergeladen.</li>
                        </ul>
                    </div>
                    <div className="StartButtonDiv">
                        <NavLink exact to="/Home" style={{"text-decoration": "none"}}>
                            <Button variant="contained" color="primary">Alles Klar. Los Gehts!</Button>
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }
}

export default Intro;
