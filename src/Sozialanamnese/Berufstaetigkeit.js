import React, {Component} from "react";
import TextField from '@material-ui/core/TextField';
import localStorage from 'local-storage'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';


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

            arbeitsfaehigkeit: '',
            normalArbeitsfaehig: false,
            arbeitlos: false,
            pensioniert: false,
            iVRente: false,
            arbeitsunfaehig: false,

            arbeitspensum: 100,
            dateArbeitslosigkeit: null,
            datePensioniert: null,
            dateIVRente: null,
            dateArbeitsunfaehigkeitVon: null,
            dateArbeitsunfaehigkeitBis: null,
            erkrankung: '',
            arbeitsunfaehigkeitInProzent: 100,

        };
        console.log("-  " + new Date().toLocaleTimeString() + " _Berufstätigkeiten_");
    }

    //write the Change of "aktueller Beruf" / "gelernter beruf" / "Art der Erkrankung" to the state.
    handleChange = () => event => {
        this.setState({[event.target.name]: event.target.value}, () => {

            // completeness aller Textfelder wird überprüft, sobald sich ein Input ändert
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
            localStorage.set('BerufstaetigkeitKomplett', this.checkComponentCompleteness());
        });
    };

    //write the Change of the "normalArbeitsfaehig" Button to the state.
    handleChangeNormalArbeitsfaehig = () => {
        this.setState({normalArbeitsfaehig: true}, () => {

            // da der Button "normalArbeitsfaehig" ausgewählt wurde, wir dieser auf true gesetzt. Alle anderen werden auf false gesetzt (sowohl im State als auch im Localstorage).
            localStorage.set('arbeitsfaehigkeit', 'normal arbeitsfähig');
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
            localStorage.set('arbeitsfaehigkeit', 'arbeitslos');
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
            localStorage.set('BerufstaetigkeitKomplett', this.checkComponentCompleteness());
        });
    };

    //write the Change of the "pensioniert" Button to the state.
    handleChangePensioniert = () => {
        this.setState({pensioniert: true}, () => {

            // da der Button "pensioniert" ausgewählt wurde, wir dieser auf true gesetzt. Alle anderen werden auf false gesetzt (sowohl im State als auch im Localstorage).
            localStorage.set('arbeitsfaehigkeit', 'pensioniert');
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
            localStorage.set('arbeitsfaehigkeit', 'IV-Rente');
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
            localStorage.set('arbeitsfaehigkeit', 'arbeitsunfähig');
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
                der state auf null. Dieser Fall wird in der folgenden IF-Schleife abgefangen, sodass die 100% in den
                localstorage geschrieben werden.  */
            if (this.state.arbeitsunfaehigkeitInProzent == null) {
                localStorage.set('arbeitsunfaehigkeitInProzent', 100);
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

    //Try to fetch the already inserted values from the localStorage
    componentWillMount() {

        if (!(localStorage.get('VisitedSteps'))) {
            localStorage.set('VisitedSteps', [])
        }

        if (localStorage.get('VisitedSteps') !== null && localStorage.get('VisitedSteps').indexOf(0) !== -1) {
            this.setState({
                allowErrors: true,
            });
        } else {
            this.setState({
                allowErrors: false,
            });
        }
    }

    // completeness der Textfelder (aktueller resp. gelernter Beruf) und der Arbeitszustand-Buttons wird überprüft
    // Diese Funktion prüft, ob einer der Arbeitszustands-Buttons ausgewählt ist. Je nachdem welcher Button ausgewählt
    // ist, wird zusätzlich geprüft, ob die weiteren eingeblendeten Elemente befüllt sind
    checkComponentCompleteness() {
        if (localStorage.get('normalArbeitsfaehig')) {
            if (this.state.gelernterBeruf == '' || this.state.aktuellerBeruf == '' || this.state.gelernterBeruf == null || this.state.aktuellerBeruf == null || (this.state.arbeitspensum !== null && this.state.arbeitspensum === 0)) {
                return false;
            } else {
                //default Pensum von 100% ist sehr gut möglich, aus diesem Grund wird hier nicht extra geprüft, ob der Slider verschoben wurde
                return true;
            }
        } else if (localStorage.get('arbeitlos')) {
            if (this.state.gelernterBeruf == '' || this.state.gelernterBeruf == null || localStorage.get('dateArbeitslosigkeit') == null || new Date(localStorage.get('dateArbeitslosigkeit')) == "Fri Nov 01 2019 01:01:01 GMT+0100 (Mitteleuropäische Normalzeit)" || new Date(localStorage.get('dateArbeitslosigkeit')) == "Thu Jan 01 1970 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)") {
                return false;
            } else {
                return true;
            }
        } else if (localStorage.get('pensioniert')) {
            if (this.state.gelernterBeruf == '' || this.state.gelernterBeruf == null || localStorage.get('datePensioniert') == null || new Date(localStorage.get('datePensioniert')) == "Fri Nov 01 2019 01:01:01 GMT+0100 (Mitteleuropäische Normalzeit)" || new Date(localStorage.get('datePensioniert')) == "Thu Jan 01 1970 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)") {
                return false;
            } else {
                return true;
            }
        } else if (localStorage.get('iVRente')) {
            if (this.state.gelernterBeruf == '' || this.state.gelernterBeruf == null || localStorage.get('dateIVRente') == null || new Date(localStorage.get('dateIVRente')) == "Fri Nov 01 2019 01:01:01 GMT+0100 (Mitteleuropäische Normalzeit)" || new Date(localStorage.get('dateIVRente')) == "Thu Jan 01 1970 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)") {
                return false;
            } else {
                return true;
            }
        } else if (localStorage.get('arbeitsunfaehig')) {
            // prüft, ob das Feld "Art der Erkrankung" ausgefüllt wurde, ob ein "Von" und ein "Bis" Date angegeben wurden und ob aktueller resp. gelernter Beruf ausgefüllt wurden.
            if (this.state.gelernterBeruf == '' || this.state.aktuellerBeruf == '' || this.state.gelernterBeruf == null || this.state.aktuellerBeruf == null || this.state.erkrankung == '' || this.state.erkrankung == null || localStorage.get('dateArbeitsunfaehigkeitVon') == null || new Date(localStorage.get('dateArbeitsunfaehigkeitVon')) == "Fri Nov 01 2019 01:01:01 GMT+0100 (Mitteleuropäische Normalzeit)" || new Date(localStorage.get('dateArbeitsunfaehigkeitVon')) == "Thu Jan 01 1970 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)" || localStorage.get('dateArbeitsunfaehigkeitBis') == null || new Date(localStorage.get('dateArbeitsunfaehigkeitBis')) == "Fri Nov 01 2019 01:01:01 GMT+0100 (Mitteleuropäische Normalzeit)" || new Date(localStorage.get('dateArbeitsunfaehigkeitBis')) == "Thu Jan 01 1970 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)" || (this.state.arbeitsunfaehigkeitInProzent !== null && this.state.arbeitsunfaehigkeitInProzent === 0)) {
                return false;
            } else {
                return true;
            }
        } else {
            // TODO: Find a way so that this alert is only executed, when needed (e.g. when "Zurück" / "Weiter" Button is clicked. Otherwise the alert pops up every time anything changes on the page (Given that no Berufstätigkeit is selected yet).
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

        let previousVisitedSteps = localStorage.get('VisitedSteps');
        if (previousVisitedSteps.indexOf(0) === -1) {
            previousVisitedSteps.push(0);
            localStorage.set('VisitedSteps', previousVisitedSteps);
        }

    }

    //Show Textfield "Gelernter Beruf"
    showGelernterBeruf() {
        return (
            <TextField
                label="Gelernter Beruf"
                margin="normal"
                variant="outlined"
                name="gelernterBeruf"
                value={this.state.gelernterBeruf}
                onChange={this.handleChange("gelernterBeruf")}
                fullWidth
                placeholder="Geben Sie hier Ihren gelernten Beruf ein"
                error={(this.state.gelernterBeruf === '' || this.state.gelernterBeruf === null) && this.state.allowErrors === true}
                helperText={((this.state.gelernterBeruf === '' || this.state.gelernterBeruf === null) && this.state.allowErrors === true) ? 'Leeres Feld!' : ''}
            />
        )
    }

    //Show Textfield "Aktueller Beruf"
    showAktuellerBeruf() {
        return (
            <TextField
                label="Aktueller Beruf"
                margin="normal"
                variant="outlined"
                name="aktuellerBeruf"
                value={this.state.aktuellerBeruf}
                onChange={this.handleChange("aktuellerBeruf")}
                fullWidth
                placeholder="Geben Sie hier Ihren aktuellen Beruf ein"
                error={(this.state.aktuellerBeruf === '' || this.state.aktuellerBeruf === null) && this.state.allowErrors === true}
                helperText={((this.state.aktuellerBeruf === '' || this.state.aktuellerBeruf === null) && this.state.allowErrors === true) ? 'Leeres Feld!' : ''}
            />
        )
    }

    // zeigt "Arbeitspensum" Textbox nur an, wenn "normal arbeitsfähig" Button ausgewählt ist
    showNormalArbeitsfaehig() {
        if (this.state.normalArbeitsfaehig) {
            return (
                <div className="ArbeitszustandEingeblendetesDiv">

                    <div>{this.showGelernterBeruf()}</div>
                    <div>{this.showAktuellerBeruf()}</div>

                    <br/>
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


                    <div className="ErrorMessageForNotSelectedButtons">
                        {(this.state.arbeitspensum !== null && this.state.arbeitspensum === 0) ? 'Wenn ihr Arbeitspensum 0% ist, wählen sie oben bitte "Arbeitslos".' : ''}
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

                    <div>{this.showGelernterBeruf()}</div>

                    <br/>
                    <p>Bitte geben Sie an seit wann Sie arbeitslos sind:</p>
                    <div className="DatePicker">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid>
                                <KeyboardDatePicker
                                    error={this.state.dateArbeitslosigkeit === null && this.state.allowErrors === true}
                                    helperText={(this.state.dateArbeitslosigkeit === null && this.state.allowErrors === true) ? 'Datum fehlt!' : ''}
                                    disableToolbar
                                    format="dd/MM/yyyy"
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

                    <div>{this.showGelernterBeruf()}</div>

                    <br/>
                    <p>Bitte geben Sie an seit wann Sie pensioniert sind:</p>
                    <div className="DatePicker">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid>
                                <KeyboardDatePicker
                                    error={this.state.datePensioniert === null && this.state.allowErrors === true}
                                    helperText={(this.state.datePensioniert === null && this.state.allowErrors === true) ? 'Datum fehlt!' : ''}
                                    disableToolbar
                                    format="dd/MM/yyyy"
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

                    <div>{this.showGelernterBeruf()}</div>

                    <br/>
                    <p>Bitte geben Sie an seit wann Sie eine IV-Rente beziehen:</p>
                    <div className="DatePicker">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid>
                                <KeyboardDatePicker
                                    error={this.state.dateIVRente === null && this.state.allowErrors === true}
                                    helperText={(this.state.dateIVRente === null && this.state.allowErrors === true) ? 'Datum fehlt!' : ''}
                                    disableToolbar
                                    format="dd/MM/yyyy"
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

                    <div>{this.showGelernterBeruf()}</div>
                    <div>{this.showAktuellerBeruf()}</div>

                    <br/>
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
                        error={(this.state.erkrankung === '' || this.state.erkrankung === null) && this.state.allowErrors === true}
                        helperText={((this.state.erkrankung === '' || this.state.erkrankung === null) && this.state.allowErrors === true) ? 'Leeres Feld!' : ''}
                    />
                    <div className="ArbeitszustandEingeblendetesDiv">
                        <p>Bitte geben Sie den Zeitraum an, in welchem Sie arbeitsunfähig sind:</p>
                        <div className="DatePickerArbeitsunfaehigkeit">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid>
                                    <KeyboardDatePicker
                                        error={this.state.dateArbeitsunfaehigkeitVon === null && this.state.allowErrors === true}
                                        helperText={(this.state.dateArbeitsunfaehigkeitVon === null && this.state.allowErrors === true) ? 'Datum fehlt!' : ''}
                                        disableToolbar
                                        format="dd/MM/yyyy"
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
                                        error={this.state.dateArbeitsunfaehigkeitBis === null && this.state.allowErrors === true}
                                        helperText={(this.state.dateArbeitsunfaehigkeitBis === null && this.state.allowErrors === true) ? 'Datum fehlt!' : ''}
                                        disableToolbar
                                        format="dd/MM/yyyy"
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
                    <div className="ErrorMessageForNotSelectedButtons">
                        {(this.state.arbeitsunfaehigkeitInProzent !== null && this.state.arbeitsunfaehigkeitInProzent === 0) ? 'Wenn ihre Arbeitsunfähigkeit 0% ist, so wählen sie bitte nicht "krankheitshalber arbeitsunfähig".' : ''}
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
        // markiert den "IV-Rente" button blau sobald dieser angewählt wurde
        const styleIVRente = (this.state.iVRente) ? {background: '#BBC2E5'} : {};
        // markiert den "arbeitsunfaehig" button blau sobald dieser angewählt wurde
        const styleArbeitsunfaehig = (this.state.arbeitsunfaehig) ? {background: '#BBC2E5'} : {};

        return (
            <div>
                <h2>Berufstätigkeit</h2>
                <br/>
                <div>

                    <div className="Berufstaetigkeit">
                        <div>Bitte wählen Sie Ihren aktuellen Arbeitszustand:
                        </div>
                        <div className="BerufstaetigkeitButtons">
                            <Button variant="outlined" size="small" color="primary"
                                    style={styleNormalArbeitsfaehig}
                                    onClick={this.handleChangeNormalArbeitsfaehig}>
                                normal arbeitsfähig
                            </Button>
                        </div>
                        <div className="BerufstaetigkeitButtons">
                            <Button variant="outlined" size="small" color="primary"
                                    style={styleArbeitlos}
                                    onClick={this.handleChangeArbeitslos}>
                                arbeitslos
                            </Button>
                        </div>
                        <div className="BerufstaetigkeitButtons">
                            <Button variant="outlined" size="small" color="primary"
                                    style={stylePensioniert}
                                    onClick={this.handleChangePensioniert}>
                                pensioniert
                            </Button>
                        </div>
                        <div className="BerufstaetigkeitButtons">
                            <Button variant="outlined" size="small" color="primary"
                                    style={styleIVRente}
                                    onClick={this.handleChangeIVRente}>
                                IV-Rente
                            </Button>
                        </div>
                        <div className="BerufstaetigkeitButtons">
                            <Button variant="outlined" size="small" color="primary"
                                    style={styleArbeitsunfaehig}
                                    onClick={this.handleChangeArbeitsunfaehig}>
                                krankheits-halber arbeitsunfähig
                            </Button>
                        </div>
                    </div>
                    <div className="ErrorMessageForNotSelectedButtons">
                        {(this.state.allowErrors === true && this.state.normalArbeitsfaehig !== true && this.state.arbeitlos !== true && this.state.pensioniert !== true && this.state.iVRente !== true && this.state.arbeitsunfaehig !== true) ? 'Bitte geben Sie Ihren aktuellen Arbeitszustand an!' : ''}
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