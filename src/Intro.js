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
                        <p>Vielen Dank, dass Sie sich Zeit nehmen, heute unseren Prototyp zu testen.</p>
                        <br/>
                        <h3>Generell</h3>
                        <p>In diesem Prototyp sollten Sie Angaben zu Ihnen sowie Ihrer Familie (zur Berechnung des
                            eigenen Krankheitsrisikos) machen. Diese Aufgaben sind in zwei Teile unterteilt -
                            "Sozialanamnese" und "Familienanamnese". Sie sind Teil der regulären Cobedias-Untersuchung
                            von Prof. Dr. Barbara Biedermann.</p>
                        <br/>
                        <h3>Einige wichtige Hinweise:</h3>
                        <ul>
                            <li>Bitte füllen Sie beide Teile (Sozialanamnese und Familienanamnese) aus.</li>
                            <li>Bitte geben Sie möglichst wahrheitsgetreue und vollständige Daten an. Sie können
                            jedoch Fantasienamen oder nur die Initialen Ihrer Familienmitglieder verwenden, um deren
                            Identitäten zu schützen. Alle Daten werden jedoch selbstverständlich vertraulich
                            behandelt.</li>
                            <li>Pro abgeschlossener Anamnese wird je ein PDF-Dokument heruntergeladen. Dieses können
                            Sie einfach an der vorgeschlagenen Stelle speichern.</li>
                        </ul>
                    </div>
                    <div className="StartButtonDiv">
                        <NavLink exact to="/Home" style={{"text-decoration": "none"}}>
                            <Button variant="contained" color="primary">Alles klar. Los gehts!</Button>
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }
}

export default Intro;
