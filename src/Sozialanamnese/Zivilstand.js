import React, {Component} from "react";
import TextField from '@material-ui/core/TextField';
import localStorage from 'local-storage'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';


class Zivilstand extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeLedig = this.handleChangeLedig.bind(this);
        this.handleChangeVerheiratet = this.handleChangeVerheiratet.bind(this);
        this.handleChangeVerwitwet = this.handleChangeVerwitwet.bind(this);
        this.handleChangeGeschieden = this.handleChangeGeschieden.bind(this);
        this.handleChangeAndere = this.handleChangeAndere.bind(this);

        //Define the state of this component.
        this.state = {
            ledig: false,
            verheiratet: false,
            verwitwet: false,
            geschieden: false,
            andere: false,

            andereText: '',

        };
        console.log("-  " + new Date().toLocaleTimeString() + " _Bezugspersonen_"); //muss ev. zu Zivilstand geaendert werden (aber vl okay)
    }

    //write the Change of "andere" to the state.
    handleChange = () => event => {
        this.setState({[event.target.name]: event.target.value}, () => {

            // completeness aller Textfelder wird überprüft, sobald sich ein Input ändert
            localStorage.set('ZivilstandKomplett', this.checkComponentCompleteness());
        });
    };

    //write the Change of the "ledig" Button to the state.
    handleChangeLedig = () => {
        this.setState({ledig: true}, () => {

            // da der Button "ledig" ausgewählt wurde, wir dieser auf true gesetzt. Alle anderen werden auf false gesetzt (sowohl im State als auch im Localstorage).
            localStorage.set('ledig', true);
            localStorage.set('verheiratet', false);
            localStorage.set('verwitwet', false);
            localStorage.set('geschieden', false);
            localStorage.set('andere', false);
            this.setState({verheiratet: false});
            this.setState({verwitwet: false});
            this.setState({geschieden: false});
            this.setState({andere: false});

            //nachdem alle "Zivilstände" geupdated sind, wird der Completeness-Check durchgeführt und in den localstorage geschrieben
            localStorage.set('ZivilstandKomplett', this.checkComponentCompleteness());
        });
    };

    //write the Change of the "verheiratet" Button to the state.
    handleChangeVerheiratet = () => {
        this.setState({verheiratet: true}, () => {

            // da der Button "arbeitlos" ausgewählt wurde, wir dieser auf true gesetzt. Alle anderen werden auf false gesetzt (sowohl im State als auch im Localstorage).
            localStorage.set('ledig', false);
            localStorage.set('verheiratet', true);
            localStorage.set('verwitwet', false);
            localStorage.set('geschieden', false);
            localStorage.set('andere', false);
            this.setState({ledig: false});
            this.setState({verwitwet: false});
            this.setState({geschieden: false});
            this.setState({andere: false});


            //nachdem alle "Zivilstände" geupdated sind, wird der Completeness-Check durchgeführt und in den localstorage geschrieben
            localStorage.set('ZivilstandKomplett', this.checkComponentCompleteness());
        });
    };

    //write the Change of the "verwitwet" Button to the state.
    handleChangeVerwitwet = () => {
        this.setState({verwitwet: true}, () => {

            // da der Button "verwitwet" ausgewählt wurde, wir dieser auf true gesetzt. Alle anderen werden auf false gesetzt (sowohl im State als auch im Localstorage).
            localStorage.set('ledig', false);
            localStorage.set('verheiratet', false);
            localStorage.set('verwitwet', true);
            localStorage.set('geschieden', false);
            localStorage.set('andere', false);
            this.setState({ledig: false});
            this.setState({verheiratet: false});
            this.setState({geschieden: false});
            this.setState({andere: false});

            //nachdem alle "Zivilstände" geupdated sind, wird der Completeness-Check durchgeführt und in den localstorage geschrieben
            localStorage.set('ZivilstandKomplett', this.checkComponentCompleteness());
        });
    };

    //write the Change of the "geschieden" Button to the state.
    handleChangeGeschieden = () => {
        this.setState({geschieden: true}, () => {

            // da der Button "iVRente" ausgewählt wurde, wir dieser auf true gesetzt. Alle anderen werden auf false gesetzt (sowohl im State als auch im Localstorage).
            localStorage.set('ledig', false);
            localStorage.set('verheiratet', false);
            localStorage.set('verwitwet', false);
            localStorage.set('geschieden', true);
            localStorage.set('andere', false);
            this.setState({ledig: false});
            this.setState({verheiratet: false});
            this.setState({verwitwet: false});
            this.setState({andere: false});

            //nachdem alle "Zivilstände" geupdated sind, wird der Completeness-Check durchgeführt und in den localstorage geschrieben
            localStorage.set('ZivilKomplett', this.checkComponentCompleteness());
        });
    };

    //write the Change of the "andere" Button to the state.
    handleChangeAndere = () => {
        this.setState({andere: true}, () => {

            // da der Button "andere" ausgewählt wurde, wir dieser auf true gesetzt. Alle anderen werden auf false gesetzt (sowohl im State als auch im Localstorage).
            localStorage.set('ledig', false);
            localStorage.set('verheiratet', false);
            localStorage.set('verwitwet', false);
            localStorage.set('geschieden', false);
            localStorage.set('andere', true);
            this.setState({ledig: false});
            this.setState({verheiratet: false});
            this.setState({verwitwet: false});
            this.setState({geschieden: false});

            //nachdem alle "Zivilstände" geupdated sind, wird der Completeness-Check durchgeführt und in den localstorage geschrieben
            localStorage.set('ZivilstandKomplett', this.checkComponentCompleteness());
        });
    };

    //Try to fetch the already inserted values from the localStorage
    componentDidMount() {
        this.setState({
            ledig: localStorage.get('ledig'),
            verheiratet: localStorage.get('verheiratet'),
            verwitwet: localStorage.get('verwitwet'),
            geschieden: localStorage.get('geschieden'),
            andere: localStorage.get('andere'),
            andereText: localStorage.get('andereText'),
        });

        localStorage.set('ZivilstandKomplett', this.checkComponentCompleteness());
    }

    // completeness der Textfelder (aktueller resp. gelernter Beruf) und der Arbeitszustand-Buttons wird überprüft
    // Diese Funktion prüft, ob einer der Arbeitszustands-Buttons ausgewählt ist. Je nachdem welcher Button ausgewählt
    // ist, wird zusätzlich geprüft, ob die weiteren eingeblendeten Elemente befüllt sind
    checkComponentCompleteness() {
        if (localStorage.get('ledig') || localStorage.get('verheiratet') || localStorage.get('verwitwet') || localStorage.get('geschieden')) {
            return true;
        } else if (localStorage.get('andere')) {
            if (this.state.andereText == '') {
                return false;
            } else {
                return true;
            }
        } else { //not sure if this else is needed
            // TODO: Find a way so that this alert is only executed when needed (e.g. when "Zurück" / "Weiter" Button is clicked. Otherwise the alert pops up every time anything changes on the page (Given that no Berufstätigkeit is selected yet).
            //alert("Achtung: Der Zivilstand wurde nicht ausgewählt.")
            return false;
        }
    }


    //Write everything to the localState when the Component unmounts.
    componentWillUnmount() {
        localStorage.set('ledig', this.state.ledig);
        localStorage.set('verheiratet', this.state.verheiratet);
        localStorage.set('verwitwet', this.state.verwitwet);
        localStorage.set('geschieden', this.state.geschieden);
        localStorage.set('andere', this.state.andere);
        localStorage.set('andereText', this.state.andereText);

        localStorage.set('ZivilstandKomplett', this.checkComponentCompleteness());
    }

    // zeigt "Andere" Textbox nur an, wenn "Andere" Button ausgewählt ist
    showAndereTextbox() {
        if (this.state.andere) {
            return (
                <div className="ZivilstandEingeblendetesDiv">
                    <br />
                    <br />
                    <br />
                    <p>Bitte geben Sie Ihren Zivilstand an:</p>
                    <TextField
                        label="Zivilstand"
                        margin="normal"
                        variant="outlined"
                        name="andereText"
                        value={this.state.andereText}
                        onChange={this.handleChange("andereText")}
                        fullWidth
                        placeholder="Geben Sie hier einen alternativen Zivilstand ein"
                    />
                </div>
            )
        }
    }

    render() {
        // markiert den "ledig" button blau sobald dieser angewählt wurde
        const styleLedig = (this.state.ledig) ? {background: '#BBC2E5'} : {};
        // markiert den "verheiratet" button blau sobald dieser angewählt wurde
        const styleVerheiratet = (this.state.verheiratet) ? {background: '#BBC2E5'} : {};
        // markiert den "verwitwet" button blau sobald dieser angewählt wurde
        const styleVerwitwet = (this.state.verwitwet) ? {background: '#BBC2E5'} : {};
        // markiert den "geschieden" button blau sobald dieser angewählt wurde
        const styleGeschieden = (this.state.geschieden) ? {background: '#BBC2E5'} : {};
        // markiert den "andere" button blau sobald dieser angewählt wurde
        const styleAndere = (this.state.andere) ? {background: '#BBC2E5'} : {};

        return (
            <div>
                <h2>Bezugspersonen</h2>
                <br />
                <div>

                    <div className="Berufstaetigkeit">
                        <div>Bitte wählen Sie Ihren aktuellen Zivilstand:
                        </div>
                        <div className="BerufstaetigkeitButtons">
                            <Button variant="outlined" size="small" color="primary"
                                    style={styleLedig} onClick={this.handleChangeLedig}>Ledig, Single
                            </Button>
                        </div>
                        <div className="BerufstaetigkeitButtons">
                            <Button variant="outlined" size="small" color="primary"
                                    style={styleVerheiratet} onClick={this.handleChangeVerheiratet}>Verheiratet, Partnerschaft
                            </Button>
                        </div>
                        <div className="BerufstaetigkeitButtons">
                            <Button variant="outlined" size="small" color="primary"
                                    style={styleVerwitwet} onClick={this.handleChangeVerwitwet}>Verwitwet
                            </Button>
                        </div>
                        <div className="BerufstaetigkeitButtons">
                            <Button variant="outlined" size="small" color="primary"
                                    style={styleGeschieden} onClick={this.handleChangeGeschieden}>Geschieden
                            </Button>
                        </div>
                        <div className="BerufstaetigkeitButtons">
                            <Button variant="outlined" size="small" color="primary"
                                    style={styleAndere} onClick={this.handleChangeAndere}>Andere
                            </Button>
                        </div>
                    </div>

                </div>
                <div>{this.showAndereTextbox()}</div>
            </div>
        );
    }
}

/*class Zivilstand extends Component {
    render() {
        return (
            <div>
                <h2>Bezugspersonen</h2>
                <br />
                <p>Bitte wählen Sie Ihren aktuellen Zivilstand:</p>
            </div>
        );
    }
}*/

export default Zivilstand;