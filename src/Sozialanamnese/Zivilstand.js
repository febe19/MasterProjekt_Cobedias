import React, {Component} from "react";
import TextField from '@material-ui/core/TextField';
import localStorage from 'local-storage'
import Button from '@material-ui/core/Button';
import 'date-fns';


class Zivilstand extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeLedig = this.handleChangeLedig.bind(this);
        this.handleChangeVerheiratet = this.handleChangeVerheiratet.bind(this);
        this.handleChangeVerwitwet = this.handleChangeVerwitwet.bind(this);
        this.handleChangeGeschieden = this.handleChangeGeschieden.bind(this);
        this.handleChangeAndere = this.handleChangeAndere.bind(this);

        this.handleChangePatVerfuegungJa = this.handleChangePatVerfuegungJa.bind(this);
        this.handleChangePatVerfuegungNein = this.handleChangePatVerfuegungNein.bind(this);

        this.handleChangeVorsorgeauftragJa = this.handleChangeVorsorgeauftragJa.bind(this);
        this.handleChangeVorsorgeauftragNein = this.handleChangeVorsorgeauftragNein.bind(this);

        //Define the state of this component.
        this.state = {
            zivilstand: '',
            ledig: false,
            verheiratet: false,
            verwitwet: false,
            geschieden: false,
            andere: false,
            andereText: '',

            nahePersonen: '',

            patVerfuegungExistiert: '',
            patVerfuegungJa: false,
            patVerfuegungNein: false,
            patVerfuegungBei: '',

            vorsorgeauftragExistiert: '',
            vorsorgeauftragJa: false,
            vorsorgeauftragNein: false,
            vorsorgeauftragBei: '',

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
            localStorage.set('zivilstand', 'ledig');
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

            // da der Button "verheiratet" ausgewählt wurde, wir dieser auf true gesetzt. Alle anderen werden auf false gesetzt (sowohl im State als auch im Localstorage).
            localStorage.set('zivilstand', 'verheiratet');
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
            localStorage.set('zivilstand', 'verwitwet');
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

            // da der Button "geschieden" ausgewählt wurde, wir dieser auf true gesetzt. Alle anderen werden auf false gesetzt (sowohl im State als auch im Localstorage).
            localStorage.set('zivilstand', 'geschieden');
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
            localStorage.set('ZivilstandKomplett', this.checkComponentCompleteness());
        });
    };

    //write the Change of the "andere" Button to the state.
    handleChangeAndere = () => {
        this.setState({andere: true}, () => {

            // da der Button "andere" ausgewählt wurde, wir dieser auf true gesetzt. Alle anderen werden auf false gesetzt (sowohl im State als auch im Localstorage).
            localStorage.set('zivilstand', 'andere (nicht ledig, verheiratet, verwitwet oder geschieden');
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

    //write the Change of the "patVerfuegungJa" Button to the state.
    handleChangePatVerfuegungJa = () => {
        this.setState({patVerfuegungJa: true}, () => {

            // da der Button "Ja" ausgewählt wurde, wir dieser auf true gesetzt. "Nein" wird auf false gesetzt (sowohl im State als auch im Localstorage).
            localStorage.set('patVerfuegungExistiert', 'Ja');
            localStorage.set('patVerfuegungJa', true);
            localStorage.set('patVerfuegungNein', false);
            this.setState({patVerfuegungNein: false});

            //nachdem alle "Zivilstände" geupdated sind, wird der Completeness-Check durchgeführt und in den localstorage geschrieben
            localStorage.set('ZivilstandKomplett', this.checkComponentCompleteness());
        });
    };

    //write the Change of the "patVerfuegungNein" Button to the state.
    handleChangePatVerfuegungNein = () => {
        this.setState({patVerfuegungNein: true}, () => {

            // da der Button "Nein" ausgewählt wurde, wir dieser auf true gesetzt. "Ja" wird auf false gesetzt (sowohl im State als auch im Localstorage).
            localStorage.set('patVerfuegungExistiert', 'Nein');
            localStorage.set('patVerfuegungJa', false);
            localStorage.set('patVerfuegungNein', true);
            this.setState({patVerfuegungJa: false});

            //nachdem alle "Zivilstände" geupdated sind, wird der Completeness-Check durchgeführt und in den localstorage geschrieben
            localStorage.set('ZivilstandKomplett', this.checkComponentCompleteness());
        });
    };

    //write the Change of the "vorsorgeauftragJa" Button to the state.
    handleChangeVorsorgeauftragJa = () => {
        this.setState({vorsorgeauftragJa: true}, () => {

            // da der Button "Ja" ausgewählt wurde, wir dieser auf true gesetzt. "Nein" wird auf false gesetzt (sowohl im State als auch im Localstorage).
            localStorage.set('vorsorgeauftragExistiert', 'Ja');
            localStorage.set('vorsorgeauftragJa', true);
            localStorage.set('vorsorgeauftragNein', false);
            this.setState({vorsorgeauftragNein: false});

            //nachdem alle "Zivilstände" geupdated sind, wird der Completeness-Check durchgeführt und in den localstorage geschrieben
            localStorage.set('ZivilstandKomplett', this.checkComponentCompleteness());
        });
    };

    //write the Change of the "vorsorgeauftragNein" Button to the state.
    handleChangeVorsorgeauftragNein = () => {
        this.setState({vorsorgeauftragNein: true}, () => {

            // da der Button "Nein" ausgewählt wurde, wir dieser auf true gesetzt. "Ja" wird auf false gesetzt (sowohl im State als auch im Localstorage).
            localStorage.set('vorsorgeauftragExistiert', 'Nein');
            localStorage.set('vorsorgeauftragJa', false);
            localStorage.set('vorsorgeauftragNein', true);
            this.setState({vorsorgeauftragJa: false});

            //nachdem alle "Zivilstände" geupdated sind, wird der Completeness-Check durchgeführt und in den localstorage geschrieben
            localStorage.set('ZivilstandKomplett', this.checkComponentCompleteness());
        });
    };

    //Try to fetch the already inserted values from the localStorage
    componentWillMount() {

        if (!(localStorage.get('VisitedSteps'))) {
            localStorage.set('VisitedSteps', [])
        }

        if (localStorage.get('VisitedSteps') !== null && localStorage.get('VisitedSteps').indexOf(4) !== -1) {
            this.setState({
                allowErrors: true,
            });
        } else {
            this.setState({
                allowErrors: false,
            });
        }
    }

    //Try to fetch the already inserted values from the localStorage
    componentDidMount() {
        this.setState({
            ledig: localStorage.get('ledig'),
            verheiratet: localStorage.get('verheiratet'),
            verwitwet: localStorage.get('verwitwet'),
            geschieden: localStorage.get('geschieden'),
            andere: localStorage.get('andere'),
            andereText: localStorage.get('andereText'),

            nahePersonen: localStorage.get('nahePersonen'),

            patVerfuegungJa: localStorage.get('patVerfuegungJa'),
            patVerfuegungNein: localStorage.get('patVerfuegungNein'),
            patVerfuegungBei: localStorage.get('patVerfuegungBei'),

            vorsorgeauftragJa: localStorage.get('vorsorgeauftragJa'),
            vorsorgeauftragNein: localStorage.get('vorsorgeauftragNein'),
            vorsorgeauftragBei: localStorage.get('vorsorgeauftragBei'),
        });

        localStorage.set('ZivilstandKomplett', this.checkComponentCompleteness());
    }

    // Completeness des Textfelds (nahestehende Personen) und der Zivilstand-, Patientenverfuegung- und
    // Vorsorgeauftrag-Buttons wird überprüft. Je nachdem welcher Button ausgewählt ist, wird zusätzlich geprüft,
    // ob die weiteren eingeblendeten Elemente befüllt sind. Insgesamt muessen 4 Buttons bzw. Buttons + Felder gewaehlt/ausgefuellt sein -> check counter === 4
    checkComponentCompleteness() {
        let counter;
        counter = 0;
        if (localStorage.get('ledig') || localStorage.get('verheiratet') || localStorage.get('verwitwet') || localStorage.get('geschieden')) {
            counter++;
        } else if (localStorage.get('andere')) {
            if (this.state.andereText === '' || this.state.andereText === null) {
                return false;
            } else {
                counter++;
            }
        }
        if (this.state.nahePersonen === '' || this.state.nahePersonen === null) {
            return false;
        } else {
            counter++;
        }
        if (localStorage.get('patVerfuegungJa')) {
            if (this.state.patVerfuegungBei === '' || this.state.patVerfuegungBei === null) {
                return false;
            } else {
                counter++;
            }
        } else if (localStorage.get('patVerfuegungNein')) {
            counter++;
        }
        if (localStorage.get('vorsorgeauftragJa')) {
            if (localStorage.get('vorsorgeauftragBei') === '' || localStorage.get('vorsorgeauftragBei') === null) {
                return false;
            } else {
                counter++;
            }
        } else if (localStorage.get('vorsorgeauftragNein')) {
            counter++;
        }
        if (counter === 4) {
            return true;
        } else { //not sure if this else is needed
            //alert("Achtung: Ein Feld wurde nicht ausgewählt.")
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

        localStorage.set('nahePersonen', this.state.nahePersonen);

        localStorage.set('patVerfuegungJa', this.state.patVerfuegungJa);
        localStorage.set('patVerfuegungNein', this.state.patVerfuegungNein);
        localStorage.set('patVerfuegungBei', this.state.patVerfuegungBei);

        localStorage.set('vorsorgeauftragJa', this.state.vorsorgeauftragJa);
        localStorage.set('vorsorgeauftragNein', this.state.vorsorgeauftragNein);
        localStorage.set('vorsorgeauftragBei', this.state.vorsorgeauftragBei);

        localStorage.set('ZivilstandKomplett', this.checkComponentCompleteness());

        let previousVisitedSteps = localStorage.get('VisitedSteps');
        if (previousVisitedSteps.indexOf(4) === -1) {
            previousVisitedSteps.push(4);
            localStorage.set('VisitedSteps', previousVisitedSteps);
        }

    }

    // zeigt "Andere" Textbox nur an, wenn "Andere" Button ausgewählt ist
    showAndereTextbox() {
        if (this.state.andere) {
            return (
                <div className="ZivilstandEingeblendetesDiv">
                    <br/>
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
                        error={(this.state.andereText === '' || this.state.andereText === null) && this.state.allowErrors === true}
                        helperText={((this.state.andereText === '' || this.state.andereText === null) && this.state.allowErrors === true) ? 'Leeres Feld!' : ''}
                    />
                </div>
            )
        }
    }

    // zeigt "patVerfuegungBei" Textbox nur an, wenn "patVerfuegungJa" Button ausgewählt ist
    showPatVerfuegungBeiTextbox() {
        if (this.state.patVerfuegungJa) {
            return (
                <div className="PatVerfuegungEingeblendetesDiv">
                    <br/>
                    <p>Bei wem ist die Patientenverfügung hinterlegt?</p>
                    <TextField
                        label="Patientenverfügung bei"
                        margin="normal"
                        variant="outlined"
                        name="patVerfuegungBei"
                        value={this.state.patVerfuegungBei}
                        onChange={this.handleChange("patVerfuegungBei")}
                        fullWidth
                        placeholder="Bitte geben Sie hier den Namen der Person ein, bei welcher die Patientenverfügung hinterlegt ist."
                        error={(this.state.patVerfuegungBei === '' || this.state.patVerfuegungBei === null) && this.state.allowErrors === true}
                        helperText={((this.state.patVerfuegungBei === '' || this.state.patVerfuegungBei === null) && this.state.allowErrors === true) ? 'Leeres Feld!' : ''}
                    />
                </div>
            )
        }
    }

    // zeigt "vorsorgeauftragBei" Textbox nur an, wenn "vorsorgeauftragJa" Button ausgewählt ist
    showVorsorgeauftragBeiTextbox() {
        if (this.state.vorsorgeauftragJa) {
            return (
                <div className="VorsorgeauftragEingeblendetesDiv">
                    <br/>
                    <p>Bei wem ist der Vorsorgeauftrag hinterlegt?</p>
                    <TextField
                        label="Vorsorgeauftrag bei"
                        margin="normal"
                        variant="outlined"
                        name="vorsorgeauftragBei"
                        value={this.state.vorsorgeauftragBei}
                        onChange={this.handleChange("vorsorgeauftragBei")}
                        fullWidth
                        placeholder="Bitte geben Sie hier den Namen der Person ein, bei welcher der Vorsorgeauftrag hinterlegt ist."
                        error={(this.state.vorsorgeauftragBei === '' || this.state.vorsorgeauftragBei === null) && this.state.allowErrors === true}
                        helperText={((this.state.vorsorgeauftragBei === '' || this.state.vorsorgeauftragBei === null) && this.state.allowErrors === true) ? 'Leeres Feld!' : ''}
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
        // markiert den "patVerfuegungJa" button blau sobald dieser angewählt wurde
        const stylePatVerfuegungJa = (this.state.patVerfuegungJa) ? {background: '#BBC2E5'} : {};
        // markiert den "patVerfuegungNein" button blau sobald dieser angewählt wurde
        const stylePatVerfuegungNein = (this.state.patVerfuegungNein) ? {background: '#BBC2E5'} : {};
        // markiert den "vorsorgeauftragJa" button blau sobald dieser angewählt wurde
        const styleVorsorgeauftragJa = (this.state.vorsorgeauftragJa) ? {background: '#BBC2E5'} : {};
        // markiert den "vorsorgeauftragNein" button blau sobald dieser angewählt wurde
        const styleVorsorgeauftragNein = (this.state.vorsorgeauftragNein) ? {background: '#BBC2E5'} : {};

        return (
            <div>
                <h2>Bezugspersonen</h2>
                <br/>
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
                                    style={styleVerheiratet} onClick={this.handleChangeVerheiratet}>Verheiratet,
                                Partnerschaft
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
                    <div className="ErrorMessageForNotSelectedButtons">
                        {(this.state.allowErrors === true && this.state.ledig !== true && this.state.verheiratet !== true && this.state.verwitwet !== true && this.state.geschieden !== true && this.state.andere !== true) ? 'Bitte geben Sie Ihren aktuellen Zivilstand an!' : ''}
                    </div>
                    <div>{this.showAndereTextbox()}</div>
                </div>
                <div>
                    <div className={"Berufstaetigkeit"}>
                        <br/>
                        <div>Bitte geben Sie eine oder mehrere Person(en) an, welche in einer Notfallsituation kontaktiert werden sollte(n):</div>
                        <div>
                            <TextField
                                id="outlined-multiline-static"
                                label="Notfallkontakt(e)"
                                multiline
                                rows="1"
                                margin="normal"
                                variant="outlined"
                                value={this.state.nahePersonen}
                                name="nahePersonen"
                                onChange={this.handleChange("nahePersonen")}
                                fullWidth
                                placeholder="Name(n) der Person(en) welche in einer Notfallsituation kontaktiert werden sollten"
                                error={(this.state.nahePersonen === '' || this.state.nahePersonen === null) && this.state.allowErrors === true}
                                helperText={((this.state.nahePersonen === '' || this.state.nahePersonen === null) && this.state.allowErrors === true) ? 'Leeres Feld!' : ''}
                            />

                        </div>
                    </div>
                </div>
                <div>
                    <div className="Berufstaetigkeit">
                        <br/>
                        <div>Ist eine Patientenverfügung vorhanden?
                        </div>
                        <div className="BerufstaetigkeitButtons">
                            <Button variant="outlined" size="small" color="primary"
                                    style={stylePatVerfuegungJa} onClick={this.handleChangePatVerfuegungJa}>Ja
                            </Button>
                        </div>
                        <div className="BerufstaetigkeitButtons">
                            <Button variant="outlined" size="small" color="primary"
                                    style={stylePatVerfuegungNein} onClick={this.handleChangePatVerfuegungNein}>Nein
                            </Button>
                        </div>
                        <div className="ErrorMessageForNotSelectedButtons">
                            {(this.state.allowErrors === true && this.state.patVerfuegungJa !== true && this.state.patVerfuegungNein !== true) ? 'Bitte geben Sie an, ob eine Patientenverfügung vorhanden ist!' : ''}
                        </div>
                    </div>
                </div>
                <div>{this.showPatVerfuegungBeiTextbox()}</div>
                <div>
                    <div className="Berufstaetigkeit">
                        <br/>
                        <div>Ist ein Vorsorgeauftrag vorhanden?
                        </div>
                        <div className="BerufstaetigkeitButtons">
                            <Button variant="outlined" size="small" color="primary"
                                    style={styleVorsorgeauftragJa} onClick={this.handleChangeVorsorgeauftragJa}>Ja
                            </Button>
                        </div>
                        <div className="BerufstaetigkeitButtons">
                            <Button variant="outlined" size="small" color="primary"
                                    style={styleVorsorgeauftragNein} onClick={this.handleChangeVorsorgeauftragNein}>Nein
                            </Button>
                        </div>
                        <div className="ErrorMessageForNotSelectedButtons">
                            {(this.state.allowErrors === true && this.state.vorsorgeauftragJa !== true && this.state.vorsorgeauftragNein !== true) ? 'Bitte geben Sie an, ob ein Vorsorgeauftrag vorhanden ist!' : ''}
                        </div>
                        <div>{this.showVorsorgeauftragBeiTextbox()}</div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Zivilstand;