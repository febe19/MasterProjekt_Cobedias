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


class Berufstaetigkeit extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeNormalArbeitsfaehig = this.handleChangeNormalArbeitsfaehig.bind(this);
        this.handleChangeArbeitslos = this.handleChangeArbeitslos.bind(this);
        this.handleChangePensioniert = this.handleChangePensioniert.bind(this);
        this.handleChangeIVRente = this.handleChangeIVRente.bind(this);
        this.handleChangeArbeitsunfaehig = this.handleChangeArbeitsunfaehig.bind(this);

        //Define the state of this component.
        this.state = {
            gelernterBeruf: '',
            aktuellerBeruf: '',

            normalArbeitsfaehig: false,
            arbeitlos: false,
            pensioniert: false,
            iVRente: false,
            arbeitsunfaehig: false,

            arbeitspensum: 100,
            dateArbeitslosigkeit: new Date('2019-11-01T01:01:01'),
            datePensioniert: new Date('2019-11-01T01:01:01'),
            dateIVRente: new Date('2019-11-01T01:01:01'),
            dateArbeitsunfaehigkeitVon: new Date('2019-11-01T01:01:01'),
            dateArbeitsunfaehigkeitBis: new Date('2019-11-01T01:01:01'),
            erkrankung: '',
            arbeitsunfaehigkeitInProzent: 0,

        };
        console.log("-  " + new Date().toLocaleTimeString() + " _Berufstätigkeiten_");
    }

    //write the Change of "aktueller Beruf" / "gelernter beruf" / "Art der Erkrankung" to the state.
    handleChange = () => event => {
        this.setState({[event.target.name]: event.target.value}, () => {

            // completeness aller textfelder wird überprüft, sobald sich ein input ändert
            localStorage.set('BerufstaetigkeitKomplett', this.checkComponentCompleteness());
        });
    };

    //write the Change of "arbeitslosigkeit date picker" to the state.
    handleChangeArbeitlosigkeitDate = () => event => {
        this.setState({["dateArbeitslosigkeit"]: event}, () => {

            // completeness aller textfelder wird überprüft, sobald sich ein input ändert
            localStorage.set('dateArbeitslosigkeit', this.state.dateArbeitslosigkeit);
            localStorage.set('BerufstaetigkeitKomplett', this.checkComponentCompleteness());
        });
    };

    //write the Change of "pensioniert date picker" to the state.
    handleChangePensioniertDate = () => event => {
        this.setState({["datePensioniert"]: event}, () => {

            // completeness aller textfelder wird überprüft, sobald sich ein input ändert
            localStorage.set('datePensioniert', this.state.datePensioniert);
            localStorage.set('BerufstaetigkeitKomplett', this.checkComponentCompleteness());
        });
    };

    //write the Change of "IV Rente date picker" to the state.
    handleChangeIVRenteDate = () => event => {
        this.setState({["dateIVRente"]: event}, () => {

            // completeness aller textfelder wird überprüft, sobald sich ein input ändert
            localStorage.set('dateIVRente', this.state.dateIVRente);
            localStorage.set('BerufstaetigkeitKomplett', this.checkComponentCompleteness());
        });
    };

    //write the Change of "arbeitslosigkeit date picker" to the state.
    handleChangeArbeitsunfaehigkeitVonDate = () => event => {
        this.setState({["dateArbeitsunfaehigkeitVon"]: event}, () => {

            // completeness aller textfelder wird überprüft, sobald sich ein input ändert
            localStorage.set('dateArbeitsunfaehigkeitVon', this.state.dateArbeitsunfaehigkeitVon);
            localStorage.set('BerufstaetigkeitKomplett', this.checkComponentCompleteness());
        });
    };

    //write the Change of "arbeitslosigkeit date picker" to the state.
    handleChangeArbeitsunfaehigkeitBisDate = () => event => {
        this.setState({["dateArbeitsunfaehigkeitBis"]: event}, () => {

            // completeness aller textfelder wird überprüft, sobald sich ein input ändert
            localStorage.set('dateArbeitsunfaehigkeitBis', this.state.dateArbeitsunfaehigkeitBis);
            localStorage.set('BerufstaetigkeitKomplett', this.checkComponentCompleteness());
        });
    };

    //write the "Arbeitspensum Slider Change"to the state.
    handleChangeSliderArbeitspensum(event, value) {
        this.setState({["arbeitspensum"]: value}, () => {
            localStorage.set('arbeitspensum', this.state.arbeitspensum);
        });
    };

    //write the "Arbeitsunfaehigkeit Slider Change" to the state.
    handleChangeSliderArbeitsunfaehigkeit(event, value) {
        this.setState({["arbeitsunfaehigkeitInProzent"]: value}, () => {
            localStorage.set('arbeitsunfaehigkeitInProzent', this.state.arbeitsunfaehigkeitInProzent);
        });
    };

    //write the Change of the "normalArbeitsfaehig" Button to the state.
    handleChangeNormalArbeitsfaehig = () => {
        this.setState({normalArbeitsfaehig: true}, () => {

            // da der Button "normalArbeitsfaehig" ausgewählt wurde, wir dieser auf true gesetzt. Alle anderen werden auf false gesetzt (sowohl im State als auch im Localstorage).
            localStorage.set('normalArbeitsfaehig', true);
            localStorage.set('arbeitlos', false);
            localStorage.set('pensioniert', false);
            localStorage.set('iVRente', false);
            localStorage.set('arbeitsunfaehig', false);
            this.setState({arbeitlos: false});
            this.setState({pensioniert: false});
            this.setState({iVRente: false});
            this.setState({arbeitsunfaehig: false});
            /* falls der User "normal arbeitsfähig" zum ersten Mal anwählt und den slider nicht verschiebt
               (weil er bspw. den defaultvon 100% belassen will) so bleibt der state auf null. Dieser Fall wird in der
               folgenden IF-Schleife abgefangen, sodass die 100% in den localstorage geschrieben werden.  */
            if (this.state.arbeitspensum == null) {
                localStorage.set('arbeitspensum', 100);
            }

            //nachdem alle "Arbeitszustände" geupdated sind, wird der Completeness-Check durchgeführt und in den localstorage geschrieben
            localStorage.set('BerufstaetigkeitKomplett', this.checkComponentCompleteness());
        });
    };

    //write the Change of the "arbeitlos" Button to the state.
    handleChangeArbeitslos = () => {
        this.setState({arbeitlos: true}, () => {

            // da der Button "arbeitlos" ausgewählt wurde, wir dieser auf true gesetzt. Alle anderen werden auf false gesetzt (sowohl im State als auch im Localstorage).
            localStorage.set('normalArbeitsfaehig', false);
            localStorage.set('arbeitlos', true);
            localStorage.set('pensioniert', false);
            localStorage.set('iVRente', false);
            localStorage.set('arbeitsunfaehig', false);
            this.setState({normalArbeitsfaehig: false});
            this.setState({pensioniert: false});
            this.setState({iVRente: false});
            this.setState({arbeitsunfaehig: false});


            //nachdem alle "Arbeitszustände" geupdated sind, wird der Completeness-Check durchgeführt und in den localstorage geschrieben
            console.log("nochmals ein check: " + this.checkComponentCompleteness());
            console.log("check finito");
            localStorage.set('BerufstaetigkeitKomplett', this.checkComponentCompleteness());
        });
    };

    //write the Change of the "pensioniert" Button to the state.
    handleChangePensioniert = () => {
        this.setState({pensioniert: true}, () => {

            // da der Button "pensioniert" ausgewählt wurde, wir dieser auf true gesetzt. Alle anderen werden auf false gesetzt (sowohl im State als auch im Localstorage).
            localStorage.set('normalArbeitsfaehig', false);
            localStorage.set('arbeitlos', false);
            localStorage.set('pensioniert', true);
            localStorage.set('iVRente', false);
            localStorage.set('arbeitsunfaehig', false);
            this.setState({normalArbeitsfaehig: false});
            this.setState({arbeitlos: false});
            this.setState({iVRente: false});
            this.setState({arbeitsunfaehig: false});

            //nachdem alle "Arbeitszustände" geupdated sind, wird der Completeness-Check durchgeführt und in den localstorage geschrieben
            localStorage.set('BerufstaetigkeitKomplett', this.checkComponentCompleteness());
        });
    };

    //write the Change of the "iVRente" Button to the state.
    handleChangeIVRente = () => {
        this.setState({iVRente: true}, () => {

            // da der Button "iVRente" ausgewählt wurde, wir dieser auf true gesetzt. Alle anderen werden auf false gesetzt (sowohl im State als auch im Localstorage).
            localStorage.set('normalArbeitsfaehig', false);
            localStorage.set('arbeitlos', false);
            localStorage.set('pensioniert', false);
            localStorage.set('iVRente', true);
            localStorage.set('arbeitsunfaehig', false);
            this.setState({normalArbeitsfaehig: false});
            this.setState({arbeitlos: false});
            this.setState({pensioniert: false});
            this.setState({arbeitsunfaehig: false});

            //nachdem alle "Arbeitszustände" geupdated sind, wird der Completeness-Check durchgeführt und in den localstorage geschrieben
            localStorage.set('BerufstaetigkeitKomplett', this.checkComponentCompleteness());
        });
    };

    //write the Change of the "arbeitsunfaehig" Button to the state.
    handleChangeArbeitsunfaehig = () => {
        this.setState({arbeitsunfaehig: true}, () => {

            // da der Button "arbeitsunfaehig" ausgewählt wurde, wir dieser auf true gesetzt. Alle anderen werden auf false gesetzt (sowohl im State als auch im Localstorage).
            localStorage.set('normalArbeitsfaehig', false);
            localStorage.set('arbeitlos', false);
            localStorage.set('pensioniert', false);
            localStorage.set('iVRente', false);
            localStorage.set('arbeitsunfaehig', true);
            this.setState({normalArbeitsfaehig: false});
            this.setState({arbeitlos: false});
            this.setState({pensioniert: false});
            this.setState({iVRente: false});
            /*  falls der User "arbeitsunfähig" zum ersten Mal anwählt und den Slider nicht verschiebt so bleibt
                der state auf null. Dieser Fall wird in der folgenden IF-Schleife abgefangen, sodass die 0% in den
                localstorage geschrieben werden.  */
            if (this.state.arbeitsunfaehigkeitInProzent == null) {
                localStorage.set('arbeitsunfaehigkeitInProzent', 0);
            }

            //nachdem alle "Arbeitszustände" geupdated sind, wird der Completeness-Check durchgeführt und in den localstorage geschrieben
            localStorage.set('BerufstaetigkeitKomplett', this.checkComponentCompleteness());
        });
    };

    //Try to fetch the already inserted values from the localStorage
    componentDidMount() {
        this.setState({
            gelernterBeruf: localStorage.get('gelernterBeruf'),
            aktuellerBeruf: localStorage.get('aktuellerBeruf'),
            normalArbeitsfaehig: localStorage.get('normalArbeitsfaehig'),
            arbeitlos: localStorage.get('arbeitlos'),
            pensioniert: localStorage.get('pensioniert'),
            iVRente: localStorage.get('iVRente'),
            arbeitsunfaehig: localStorage.get('arbeitsunfaehig'),
            arbeitspensum: localStorage.get('arbeitspensum'),
            erkrankung: localStorage.get('erkrankung'),
            arbeitsunfaehigkeitInProzent: localStorage.get('arbeitsunfaehigkeitInProzent'),
        });
        if (localStorage.get('dateArbeitslosigkeit') !== null) {
            this.setState({
                dateArbeitslosigkeit: localStorage.get('dateArbeitslosigkeit'),
            });
        }
        if (localStorage.get('datePensioniert') !== null) {
            this.setState({
                datePensioniert: localStorage.get('datePensioniert'),
            });
        }
        if (localStorage.get('dateIVRente') !== null) {
            this.setState({
                dateIVRente: localStorage.get('dateIVRente'),
            });
        }
        if (localStorage.get('dateArbeitsunfaehigkeitVon') !== null) {
            this.setState({
                dateArbeitsunfaehigkeitVon: localStorage.get('dateArbeitsunfaehigkeitVon'),
            });
        }
        if (localStorage.get('dateArbeitsunfaehigkeitBis') !== null) {
            this.setState({
                dateArbeitsunfaehigkeitBis: localStorage.get('dateArbeitsunfaehigkeitBis'),
            });
        }
        localStorage.set('BerufstaetigkeitKomplett', this.checkComponentCompleteness());
    }

    // completeness der textfelder (aktueller resp. gelernter Beruf) und der Arbeitszustand-Buttons wird überprüft
    checkComponentCompleteness() {
        return (this.state.gelernterBeruf !== '' && this.state.aktuellerBeruf !== '' && this.state.gelernterBeruf !== null && this.state.aktuellerBeruf !== null && this.arbeitszustandGewaehltUndAusgefuellt());
    }

    // Diese Funktion prüft, ob einer der Arbeitszustands-Buttons ausgewählt ist. Je nachdem welcher Button ausgewählt
    // ist, wird zusätzlich geprüft ob die weiteren Eingeblendeten Elemente befüllt sind
    arbeitszustandGewaehltUndAusgefuellt() {
        console.log("arbeitslos: " + localStorage.get('arbeitlos'));
        if (localStorage.get('normalArbeitsfaehig')) {
            console.log("test1");
            //default Pensum von 100% ist sehr gut möglich, aus diesem Grund wird hier nicht extra geprüft, ob der Slider verschoben wurde
            return true;
        } else if (localStorage.get('arbeitlos')) {
            // prüft, ob ein Datum eingegeben wurde, das heisst: wenn das Default Datum eingegeben ist, gilt es als nicht ausgefüllt.
            if (localStorage.get('dateArbeitslosigkeit') == null || new Date(localStorage.get('dateArbeitslosigkeit')) == "Fri Nov 01 2019 01:01:01 GMT+0100 (Mitteleuropäische Normalzeit)" || new Date(localStorage.get('dateArbeitslosigkeit')) == "Thu Jan 01 1970 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)") {
                //alert("Sie haben kein Datum eingegeben!");
                return false;
            } else {
                return true;
            }
        } else if (localStorage.get('pensioniert')) {
            // prüft, ob ein Datum eingegeben wurde, das heisst: wenn das Default Datum eingegeben ist, gilt es als nicht ausgefüllt.
            if (localStorage.get('datePensioniert') == null || new Date(localStorage.get('datePensioniert')) == "Fri Nov 01 2019 01:01:01 GMT+0100 (Mitteleuropäische Normalzeit)" || new Date(localStorage.get('datePensioniert')) == "Thu Jan 01 1970 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)") {
                //alert("Sie haben kein Datum eingegeben!");
                return false;
            } else {
                return true;
            }
        } else if (localStorage.get('iVRente')) {
            // prüft, ob ein Datum eingegeben wurde, das heisst: wenn das Default Datum eingegeben ist, gilt es als nicht ausgefüllt.
            if (localStorage.get('dateIVRente') == null || new Date(localStorage.get('dateIVRente')) == "Fri Nov 01 2019 01:01:01 GMT+0100 (Mitteleuropäische Normalzeit)" || new Date(localStorage.get('dateIVRente')) == "Thu Jan 01 1970 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)") {
                //alert("Sie haben kein Datum eingegeben!");
                return false;
            } else {
                return true;
            }
        } else if (localStorage.get('arbeitsunfaehig')) {
            // prüft, ob das Feld "Art der Erkrankung" ausgefüllt wurde, ob ein "Von" und ein "Bis" Date angegeben wurden.
            // Der Slider wird nicht geprüft
            if (this.state.erkrankung == '' || this.state.erkrankung == null || localStorage.get('dateArbeitsunfaehigkeitVon') == null || new Date(localStorage.get('dateArbeitsunfaehigkeitVon')) == "Fri Nov 01 2019 01:01:01 GMT+0100 (Mitteleuropäische Normalzeit)" || new Date(localStorage.get('dateArbeitsunfaehigkeitVon')) == "Thu Jan 01 1970 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)" || localStorage.get('dateArbeitsunfaehigkeitBis') == null || new Date(localStorage.get('dateArbeitsunfaehigkeitBis')) == "Fri Nov 01 2019 01:01:01 GMT+0100 (Mitteleuropäische Normalzeit)" || new Date(localStorage.get('dateArbeitsunfaehigkeitBis')) == "Thu Jan 01 1970 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)") {
                return false;
            } else {
                return true;
            }
        } else {
            // TODO: Find a way so that this alert is only executed, when needed (e.g. when "Zurück" / "Weiter" Button is clicked. Otherwise the alert pops up everytime anything changes on the page (Given that no Berufstätigkeit is selected yet).
            //alert("Achtung: Der Arbeitszustand wurde nicht ausgewählt")
            return false;
        }
    }

    //Write everything to the localState when the Component unmounts.
    componentWillUnmount() {
        localStorage.set('gelernterBeruf', this.state.gelernterBeruf);
        localStorage.set('aktuellerBeruf', this.state.aktuellerBeruf);
        localStorage.set('normalArbeitsfaehig', this.state.normalArbeitsfaehig);
        localStorage.set('arbeitlos', this.state.arbeitlos);
        localStorage.set('pensioniert', this.state.pensioniert);
        localStorage.set('iVRente', this.state.iVRente);
        localStorage.set('arbeitsunfaehig', this.state.arbeitsunfaehig);
        localStorage.set('dateArbeitslosigkeit', this.state.dateArbeitslosigkeit);
        localStorage.set('datePensioniert', this.state.datePensioniert);
        localStorage.set('dateIVRente', this.state.dateIVRente);
        localStorage.set('erkrankung', this.state.erkrankung);
        localStorage.set('dateArbeitsunfaehigkeitVon', this.state.dateArbeitsunfaehigkeitVon);
        localStorage.set('dateArbeitsunfaehigkeitBis', this.state.dateArbeitsunfaehigkeitBis);

        if (this.state.arbeitspensum !== null) {
            localStorage.set('arbeitspensum', this.state.arbeitspensum);
        }
        if (this.state.arbeitsunfaehigkeitInProzent !== null) {
            localStorage.set('arbeitsunfaehigkeitInProzent', this.state.arbeitsunfaehigkeitInProzent);
        }

        localStorage.set('BerufstaetigkeitKomplett', this.checkComponentCompleteness());
    }

    // zeigt "Arbeitspensum" Textbox nur an, wenn "normal arbeitsfähig" Button ausgewählt ist
    showNormalArbeitsfaehig() {
        if (this.state.normalArbeitsfaehig) {
            return (
                <div className="ArbeitszustandEingeblendetesDiv">
                    <p>Bitte geben Sie Ihr aktuelles Arbeitspensum an:</p>
                    <div className="ArbeitspensumSlider">
                        <Typography id="discrete-slider-always" gutterBottom>
                        </Typography>
                        <Slider
                            defaultValue={100}
                            name="arbeitspensum"
                            value={this.state.arbeitspensum}
                            onChange={(event, value) => this.handleChangeSliderArbeitspensum(event, value)}
                            aria-labelledby="discrete-slider-always"
                            step={5}
                            marks={[
                                {value: 0, label: '0%',},
                                {value: 20, label: '20%',},
                                {value: 50, label: '50%',},
                                {value: 80, label: '80%',},
                                {value: 100, label: '100%',},
                            ]}
                            valueLabelDisplay="on"
                        />
                    </div>
                </div>
            )
        }
    }

    // zeigt "Arbeitslos" Textbox nur an, wenn "arbeitslos" Button ausgewählt ist
    showArbeitslos() {
        if (this.state.arbeitlos) {
            return (
                <div className="ArbeitszustandEingeblendetesDiv">
                    <p>Bitte geben Sie an seit wann Sie arbeitslos sind:</p>
                    <div className="DatePicker">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid>
                                <KeyboardDatePicker
                                    disableToolbar
                                    format="MM/yyyy"
                                    margin="normal"
                                    id="dateArbeitslosigkeit"
                                    name="dateArbeitslosigkeit"
                                    label="Datum auswählen"
                                    value={this.state.dateArbeitslosigkeit}
                                    onChange={this.handleChangeArbeitlosigkeitDate("dateArbeitslosigkeit")}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </div>
                </div>
            )
        }
    }

    // zeigt "Pensioniert" Textbox nur an, wenn "pensioniert" Button ausgewählt ist
    showPensioniert() {
        if (this.state.pensioniert) {
            return (
                <div className="ArbeitszustandEingeblendetesDiv">
                    <p>Bitte geben Sie an seit wann Sie pensioniert sind:</p>
                    <div className="DatePicker">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid>
                                <KeyboardDatePicker
                                    disableToolbar
                                    format="MM/yyyy"
                                    margin="normal"
                                    id="datePensioniert"
                                    name="datePensioniert"
                                    label="Datum auswählen"
                                    value={this.state.datePensioniert}
                                    onChange={this.handleChangePensioniertDate("datePensioniert")}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </div>
                </div>)
        }
    }

    // zeigt "IV Rente" Textbox nur an, wenn "IV Rente" Button ausgewählt ist
    showIVRente() {
        if (this.state.iVRente) {
            return (
                <div className="ArbeitszustandEingeblendetesDiv">
                    <p>Bitte geben Sie an seit wann Sie eine IV-Rente beziehen:</p>
                    <div className="DatePicker">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid>
                                <KeyboardDatePicker
                                    disableToolbar
                                    format="MM/yyyy"
                                    margin="normal"
                                    id="dateIVRente"
                                    name="dateIVRente"
                                    label="Datum auswählen"
                                    value={this.state.dateIVRente}
                                    onChange={this.handleChangeIVRenteDate("dateIVRente")}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </div>
                </div>)
        }
    }

    // zeigt "Arbeitsunfähig" Textbox nur an, wenn "krankheitshalber arbeitsunfähig" Button ausgewählt ist
    showArbeitsunfaehig() {
        if (this.state.arbeitsunfaehig) {
            return (
                <div className="ArbeitszustandEingeblendetesDiv">
                    <p>Bitte geben Sie die Art Ihrer Arbeitsunfähigkeit an:</p>
                    <TextField
                        label="Art der Erkrankung"
                        margin="normal"
                        variant="outlined"
                        name="erkrankung"
                        value={this.state.erkrankung}
                        onChange={this.handleChange("erkrankung")}
                        fullWidth
                        placeholder="Geben Sie hier die Art Ihrer Erkrankung ein"
                    />
                    <div className="ArbeitszustandEingeblendetesDiv">
                        <p>Bitte geben Sie den Zeitraum an, in welchem Sie arbeitsunfähig sind:</p>
                        <div className="DatePickerArbeitsunfaehigkeit">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        format="MM/yyyy"
                                        margin="normal"
                                        id="dateArbeitsunfaehigkeitVon"
                                        name="dateArbeitsunfaehigkeitVon"
                                        label="Von: "
                                        value={this.state.dateArbeitsunfaehigkeitVon}
                                        onChange={this.handleChangeArbeitsunfaehigkeitVonDate("dateArbeitsunfaehigkeitVon")}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </div>
                        <div className="DatePickerArbeitsunfaehigkeit2">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        format="MM/yyyy"
                                        margin="normal"
                                        id="dateArbeitsunfaehigkeitBis"
                                        name="dateArbeitsunfaehigkeitBis"
                                        label="Bis:"
                                        value={this.state.dateArbeitsunfaehigkeitBis}
                                        onChange={this.handleChangeArbeitsunfaehigkeitBisDate("dateArbeitsunfaehigkeitBis")}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </div>
                    </div>
                    <div className="ArbeitsunfaehigkeitInProzent">
                        <p>Bitte geben Sie Ihre Arbeitsunfähigkeit (in %) an:</p>
                    </div>
                    <div className="ArbeitsunfähigkeitSlider">
                        <Typography id="discrete-slider-always" gutterBottom>
                        </Typography>
                        <Slider
                            defaultValue={100}
                            name="arbeitsunfaehigkeitInProzent"
                            value={this.state.arbeitsunfaehigkeitInProzent}
                            onChange={(event, value) => this.handleChangeSliderArbeitsunfaehigkeit(event, value)}
                            aria-labelledby="discrete-slider-always"
                            step={5}
                            marks={[
                                {value: 0, label: '0%',},
                                {value: 20, label: '20%'},
                                {value: 50, label: '50%',},
                                {value: 80, label: '80%',},
                                {value: 100, label: '100%',},
                            ]}
                            valueLabelDisplay="on"
                        />
                    </div>
                </div>)
        }
    }

    render() {
        // markiert den "normalArbeitsfaehig" button blau sobald dieser angewählt wurde
        const styleNormalArbeitsfaehig = (this.state.normalArbeitsfaehig) ? {background: '#BBC2E5'} : {};
        // markiert den "arbeitslos" button blau sobald dieser angewählt wurde
        const styleArbeitlos = (this.state.arbeitlos) ? {background: '#BBC2E5'} : {};
        // markiert den "pensioniert" button blau sobald dieser angewählt wurde
        const stylePensioniert = (this.state.pensioniert) ? {background: '#BBC2E5'} : {};
        // markiert den "iV-Rente" button blau sobald dieser angewählt wurde
        const styleIVRente = (this.state.iVRente) ? {background: '#BBC2E5'} : {};
        // markiert den "arbeitsunfaehig" button blau sobald dieser angewählt wurde
        const styleArbeitsunfaehig = (this.state.arbeitsunfaehig) ? {background: '#BBC2E5'} : {};

        return (
            <div>
                <div>

                    <TextField
                        label="Gelernter Beruf"
                        margin="normal"
                        variant="outlined"
                        name="gelernterBeruf"
                        value={this.state.gelernterBeruf}
                        onChange={this.handleChange("gelernterBeruf")}
                        fullWidth
                        placeholder="Geben Sie hier Ihren gelernten Beruf ein"
                    />

                    <TextField
                        label="Aktueller Beruf"
                        margin="normal"
                        variant="outlined"
                        name="aktuellerBeruf"
                        value={this.state.aktuellerBeruf}
                        onChange={this.handleChange("aktuellerBeruf")}
                        fullWidth
                        placeholder="Geben Sie hier Ihren aktuellen Beruf ein"
                    />

                </div>
                <div className="Berufstaetigkeit">
                    <div>Bitte wählen sie Ihren aktuellen Arbeitszustand:
                    </div>
                    <div className="BerufstaetigkeitButtonsLeft">
                        <Button variant="outlined" size="small" color="primary"
                                style={styleNormalArbeitsfaehig} onClick={this.handleChangeNormalArbeitsfaehig}>normal
                            arbeitsfähig</Button>
                    </div>
                    <div className="BerufstaetigkeitButtonsLeft">
                        <Button variant="outlined" size="small" color="primary"
                                style={styleArbeitlos} onClick={this.handleChangeArbeitslos}>arbeitslos</Button>
                    </div>
                    <div className="BerufstaetigkeitButtonsLeft">
                        <Button variant="outlined" size="small" color="primary"
                                style={stylePensioniert} onClick={this.handleChangePensioniert}>pensioniert</Button>
                    </div>
                    <div className="BerufstaetigkeitButtonsLeft">
                        <Button variant="outlined" size="small" color="primary"
                                style={styleIVRente} onClick={this.handleChangeIVRente}>IV-Rente</Button>
                    </div>
                    <div className="BerufstaetigkeitButtonRight">
                        <Button variant="outlined" size="small" color="primary" style={styleArbeitsunfaehig}
                                onClick={this.handleChangeArbeitsunfaehig}>
                            krankheits-halber
                            <br></br>arbeitsunfähig
                        </Button>
                    </div>
                </div>
                <div>{this.showNormalArbeitsfaehig()}</div>
                <div>{this.showArbeitslos()}</div>
                <div>{this.showPensioniert()}</div>
                <div>{this.showIVRente()}</div>
                <div>{this.showArbeitsunfaehig()}</div>
            </div>
        );
    }
}

export default Berufstaetigkeit;