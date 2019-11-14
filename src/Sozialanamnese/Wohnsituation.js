import React, { Component } from "react";
import localStorage from "local-storage";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Wohnsituation extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeHaus = this.handleChangeHaus.bind(this);
        this.handleChangeWohnung = this.handleChangeWohnung.bind(this);
        this.handleChangeAltersheim = this.handleChangeAltersheim.bind(this);
        this.handleChangePflegeheim = this.handleChangePflegeheim.bind(this);
        this.handleChangeAndere = this.handleChangeAndere.bind(this);

        //Define the state of this component.
        this.state = {
            wohnsituation: '',
            haus: false,
            wohnung: false,
            altersheim: false,
            pflegeheim: false,
            andere: false,
            andereWohnText: '',
        };
        console.log("-  " + new Date().toLocaleTimeString() + " _Wohnsituation_");
    }

    //write the Change of "andere" to the state.
    handleChange = () => event => {
        this.setState({[event.target.name]: event.target.value}, () => {

            // completeness aller Angaben wird überprüft, sobald sich ein Input ändert
            localStorage.set('WohnsituationKomplett', this.checkComponentCompleteness());
        });
    };

    //write the Change of the "Haus" Button to the state.
    handleChangeHaus = () => {
        this.setState({haus: true}, () => {

            // da der Button "Haus" ausgewählt wurde, wir dieser auf true gesetzt. Alle anderen werden auf false gesetzt (sowohl im State als auch im Localstorage).
            localStorage.set('wohnsituation', 'Haus');
            localStorage.set('haus', true);
            localStorage.set('wohnung', false);
            localStorage.set('altersheim', false);
            localStorage.set('pflegeheim', false);
            localStorage.set('andere', false);
            this.setState({wohnung: false});
            this.setState({altersheim: false});
            this.setState({pflegeheim: false});
            this.setState({andere: false});

            //nachdem alle "Wohnsituationen" geupdated sind, wird der Completeness-Check durchgeführt und in den localstorage geschrieben
            localStorage.set('WohnsituationKomplett', this.checkComponentCompleteness());
        });
    };

    //write the Change of the "Wohnung" Button to the state.
    handleChangeWohnung = () => {
        this.setState({wohnung: true}, () => {

            // da der Button "Wohnung" ausgewählt wurde, wir dieser auf true gesetzt. Alle anderen werden auf false gesetzt (sowohl im State als auch im Localstorage).
            localStorage.set('wohnsituation', 'Wohnung');
            localStorage.set('haus', false);
            localStorage.set('wohnung', true);
            localStorage.set('altersheim', false);
            localStorage.set('pflegeheim', false);
            localStorage.set('andere', false);
            this.setState({haus: false});
            this.setState({altersheim: false});
            this.setState({pflegeheim: false});
            this.setState({andere: false});


            //nachdem alle "Wohnsituationen" geupdated sind, wird der Completeness-Check durchgeführt und in den localstorage geschrieben
            localStorage.set('WohnsituationKomplett', this.checkComponentCompleteness());
        });
    };

    //write the Change of the "Altersheim" Button to the state.
    handleChangeAltersheim = () => {
        this.setState({altersheim: true}, () => {

            // da der Button "Altersheim" ausgewählt wurde, wir dieser auf true gesetzt. Alle anderen werden auf false gesetzt (sowohl im State als auch im Localstorage).
            localStorage.set('wohnsituation', 'Altersheim');
            localStorage.set('haus', false);
            localStorage.set('wohnung', false);
            localStorage.set('altersheim', true);
            localStorage.set('pflegeheim', false);
            localStorage.set('andere', false);
            this.setState({haus: false});
            this.setState({wohnung: false});
            this.setState({pflegeheim: false});
            this.setState({andere: false});

            //nachdem alle "Wohnsituationen" geupdated sind, wird der Completeness-Check durchgeführt und in den localstorage geschrieben
            localStorage.set('WohnsituationKomplett', this.checkComponentCompleteness());
        });
    };

    //write the Change of the "Pflegeheim" Button to the state.
    handleChangePflegeheim = () => {
        this.setState({pflegeheim: true}, () => {

            // da der Button "Pflegeheim" ausgewählt wurde, wir dieser auf true gesetzt. Alle anderen werden auf false gesetzt (sowohl im State als auch im Localstorage).
            localStorage.set('wohnsituation', 'Pflegeheim');
            localStorage.set('haus', false);
            localStorage.set('wohnung', false);
            localStorage.set('altersheim', false);
            localStorage.set('pflegeheim', true);
            localStorage.set('andere', false);
            this.setState({haus: false});
            this.setState({wohnung: false});
            this.setState({altersheim: false});
            this.setState({andere: false});

            //nachdem alle "Wohnsituationen" geupdated sind, wird der Completeness-Check durchgeführt und in den localstorage geschrieben
            localStorage.set('WohnsituationKomplett', this.checkComponentCompleteness());
        });
    };

    //write the Change of the "andere" Button to the state.
    handleChangeAndere = () => {
        this.setState({andere: true}, () => {

            // da der Button "andere" ausgewählt wurde, wir dieser auf true gesetzt. Alle anderen werden auf false gesetzt (sowohl im State als auch im Localstorage).
            localStorage.set('wohnsituation', 'Andere (weder Haus, Wohnung, Altersheim oder Pflegeheim)');
            localStorage.set('haus', false);
            localStorage.set('wohnung', false);
            localStorage.set('altersheim', false);
            localStorage.set('pflegeheim', false);
            localStorage.set('andere', true);
            this.setState({haus: false});
            this.setState({wohnung: false});
            this.setState({altersheim: false});
            this.setState({pflegeheim: false});

            //nachdem alle "Wohnsituationen" geupdated sind, wird der Completeness-Check durchgeführt und in den localstorage geschrieben
            localStorage.set('WohnsituationKomplett', this.checkComponentCompleteness());
        });
    };

    //Try to fetch the already inserted values from the localStorage
    componentDidMount() {
        this.setState({
            haus: localStorage.get('haus'),
            wohnung: localStorage.get('wohnung'),
            altersheim: localStorage.get('altersheim'),
            pflegeheim: localStorage.get('pflegeheim'),
            andere: localStorage.get('andere'),
            andereWohnText: localStorage.get('andereWohnText'),
        });

        localStorage.set('WohnsituationKomplett', this.checkComponentCompleteness());
    }

    // Completeness der Wohnsituation-Buttons wird überprüft. Je nachdem welcher Button ausgewählt ist, wird zusätzlich geprüft,
    // ob die weiteren eingeblendeten Elemente befüllt sind.
    checkComponentCompleteness() {
        if (localStorage.get('haus') || localStorage.get('wohnung') || localStorage.get('altersheim') || localStorage.get('pflegeheim')) {
            return true;
        } else if (localStorage.get('andere')) {
            if (this.state.andereWohnText == '' || this.state.andereWohnText == null) {
                return false;
            } else {
                return true;
            }
        } else { //not sure if this else is needed
            // TODO: Find a way so that this alert is only executed when needed (e.g. when "Zurück" / "Weiter" Button is clicked. Otherwise the alert pops up every time anything changes on the page (Given that no Berufstätigkeit is selected yet).
            //alert("Achtung: Ein Feld wurde nicht ausgewählt.")
            return false;
        }
    }


    //Write everything to the localState when the Component unmounts.
    componentWillUnmount() {
        localStorage.set('haus', this.state.haus);
        localStorage.set('wohnung', this.state.wohnung);
        localStorage.set('altersheim', this.state.altersheim);
        localStorage.set('pflegeheim', this.state.pflegeheim);
        localStorage.set('andere', this.state.andere);
        localStorage.set('andereWohnText', this.state.andereWohnText);

        localStorage.set('WohnsituationKomplett', this.checkComponentCompleteness());
    }

    // zeigt "Andere" Textbox nur an, wenn "Andere" Button ausgewählt ist
    showAndereWohnTextbox() {
        if (this.state.andere) {
            return (
                <div className="WohnsituationEingeblendetesDiv">
                    <br />
                    <p>Bitte geben Sie Ihre Wohnsituation an:</p>
                    <TextField
                        label="Wohnsituation"
                        margin="normal"
                        variant="outlined"
                        name="andereWohnText"
                        value={this.state.andereWohnText}
                        onChange={this.handleChange("andereWohnText")}
                        fullWidth
                        placeholder="Geben Sie hier eine alternative Wohnsituation ein"
                    />
                </div>
            )
        }
    }

    render() {
        // markiert den "Haus" button blau sobald dieser angewählt wurde
        const styleHaus = (this.state.haus) ? {background: '#BBC2E5'} : {};
        // markiert den "Wohnung" button blau sobald dieser angewählt wurde
        const styleWohnung = (this.state.wohnung) ? {background: '#BBC2E5'} : {};
        // markiert den "Altersheim" button blau sobald dieser angewählt wurde
        const styleAltersheim = (this.state.altersheim) ? {background: '#BBC2E5'} : {};
        // markiert den "Pflegeheim" button blau sobald dieser angewählt wurde
        const stylePflegeheim = (this.state.pflegeheim) ? {background: '#BBC2E5'} : {};
        // markiert den "andere" button blau sobald dieser angewählt wurde
        const styleAndere = (this.state.andere) ? {background: '#BBC2E5'} : {};

        return (
            <div>
                <h2>Wohnsituation</h2>
                <br />
                <div>
                    <div className="Berufstaetigkeit">
                        <div>Bitte wählen Sie Ihre aktuelle Wohnsituation:
                        </div>
                        <div className="BerufstaetigkeitButtons">
                            <Button variant="outlined" size="small" color="primary"
                                    style={styleHaus} onClick={this.handleChangeHaus}>Haus
                            </Button>
                        </div>
                        <div className="BerufstaetigkeitButtons">
                            <Button variant="outlined" size="small" color="primary"
                                    style={styleWohnung} onClick={this.handleChangeWohnung}>Wohnung
                            </Button>
                        </div>
                        <div className="BerufstaetigkeitButtons">
                            <Button variant="outlined" size="small" color="primary"
                                    style={styleAltersheim} onClick={this.handleChangeAltersheim}>Altersheim
                            </Button>
                        </div>
                        <div className="BerufstaetigkeitButtons">
                            <Button variant="outlined" size="small" color="primary"
                                    style={stylePflegeheim} onClick={this.handleChangePflegeheim}>Pflegeheim
                            </Button>
                        </div>
                        <div className="BerufstaetigkeitButtons">
                            <Button variant="outlined" size="small" color="primary"
                                    style={styleAndere} onClick={this.handleChangeAndere}>Andere
                            </Button>
                        </div>
                    </div>
                    <br /><br />
                    <div>{this.showAndereWohnTextbox()}</div>
                </div>
            </div>
        );
    }
}

export default Wohnsituation;