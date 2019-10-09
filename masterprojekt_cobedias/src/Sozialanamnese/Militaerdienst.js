import React, {Component} from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import localStorage from "local-storage";
import TextField from "@material-ui/core/TextField";

class Militaerdienst extends Component {

    constructor(props) {
        super(props);

        //this.handleChange = this.handleChange.bind(this);
        this.handleYesButtonChange = this.handleYesButtonChange.bind(this);
        this.handleNoButtonChange = this.handleNoButtonChange.bind(this);

        //Define the state of this component.
        this.state = {
            militaerdienstGemacht: true,
            MilitaerdienstKomplett: false,
            untauglichkeitsGrund: ''
        };
        console.log("-  " + new Date().toLocaleTimeString() + " _Militaerdienst_");
    }

    //write the Change of the Yes Button to the state.
    handleYesButtonChange = () => {
        this.setState({militaerdienstGemacht: true}, () => {

            // completeness aller textfelder wird überprüft, sobald sich ein input ändert
            localStorage.set('MilitaerdienstKomplett', true);
            localStorage.set('militaerdienstGemacht', true);
            this.setState({MilitaerdienstKomplett: true});
        });
    };

    //write the Change of the No Button to the state.
    handleNoButtonChange = () => {
        this.setState({militaerdienstGemacht: false}, () => {

            // completeness aller textfelder wird überprüft, sobald sich ein input ändert
            localStorage.set('MilitaerdienstKomplett', true);
            localStorage.set('militaerdienstGemacht', false);
            this.setState({MilitaerdienstKomplett: true});
        });
    };

    //write the Change of the "untauglichkeitsGrund" to the state.
    handleChange = () => event => {
        this.setState({[event.target.name]: event.target.value});
    };

    //Try to fetch the already inserted values fro the localStorage
    componentDidMount() {
        this.setState({
            untauglichkeitsGrund: localStorage.get('untauglichkeitsGrund'),
        });
        localStorage.set('MilitaerdienstKomplett', this.checkComponentCompleteness());
    }

    // completeness der textfelder wird überprüft
    checkComponentCompleteness() {
        if (localStorage.get('MilitaerdienstKomplett') === null) {
            return false;
        } else {
            return localStorage.get('MilitaerdienstKomplett')
        }
    }

    //Write everything to the localState when the Component unmounts.
    componentWillUnmount() {
        localStorage.set('MilitaerdienstKomplett', this.checkComponentCompleteness());
        localStorage.set('militaerdienstGemacht', this.state.militaerdienstGemacht);
        localStorage.set('untauglichkeitsGrund', this.state.untauglichkeitsGrund);
    }

    // markiert den "Ja" button blau sobald er (zum ersten Mal) angewählt wurde
    colorYesButton() {
        return (this.state.militaerdienstGemacht && localStorage.get('MilitaerdienstKomplett'))
    }

    // markiert den "Nein" button blau sobald er (zum ersten Mal) angewählt wurde
    colorNoButton() {
        return (!this.state.militaerdienstGemacht && localStorage.get('MilitaerdienstKomplett'))
    }

    // zeigt "Grund für Untauglichkeit" Textbox nur an, wenn "Nein" Button ausgewählt ist
    showUntauglichkeit() {
        if (!this.state.militaerdienstGemacht) {
            return (
                <div>
                    <p>Falls Sie als dienstuntauglich eingestuft wurden, so geben Sie hier bitte den Grund an. Ansonsten
                        lassen Sie dieses Feld leer:</p>
                    <TextField
                        id="outlined-multiline-static"
                        label="Grund der Dienstuntauglichkeit"
                        multiline
                        rows="8"
                        margin="normal"
                        variant="outlined"
                        name="untauglichkeitsGrund"
                        fullWidth
                        value={this.state.untauglichkeitsGrund}
                        placeholder="Geben Sie hier den Grund Ihrer Dienstuntauglichkeit ein"
                        onChange={this.handleChange("untauglichkeitsGrund")}
                    />
                </div>)
        }
    }

    render() {
        const styleYesButton = (this.colorYesButton()) ? {background: '#BBC2E5'} : {};
        const styleNoButton = (this.colorNoButton()) ? {background: '#BBC2E5'} : {};

        return (
            <div>
                <h2>Militärdienst</h2>
                <p>Haben sie Militärdienst geleistet?</p>
                <div className="MilitaerdienstButtons">
                    <Grid direction="column" alignItems="left">
                        <ButtonGroup size="large" mt={5} color="primary" aria-label="outlined primary button group">
                            <Button style={styleYesButton} onClick={this.handleYesButtonChange}> Ja </Button>
                            <Button style={styleNoButton} onClick={this.handleNoButtonChange}> Nein </Button>
                        </ButtonGroup>
                    </Grid>
                </div>
                <div>{this.showUntauglichkeit()}</div>
            </div>
        );
    }
}

export default Militaerdienst;