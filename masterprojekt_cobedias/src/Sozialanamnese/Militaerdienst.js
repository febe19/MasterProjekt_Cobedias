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
            militaerdienstGemacht: true
        };
        console.log("-  " + new Date().toLocaleTimeString() + " _Militaerdienst_");


    }

    /*
    //write the Change to the state.
    handleChange = () => event => {
        this.setState({[event.target.name]: event.target.value}, () => {

            // completeness aller textfelder wird überprüft, sobald sich ein input ändert
            localStorage.set('MilitaerdienstKomplett', this.checkComponentCompleteness());
        });
    };
     */

    //write the Change to the state.
    handleYesButtonChange = () => {
        this.setState({militaerdienstGemacht: true}, () => {

            // completeness aller textfelder wird überprüft, sobald sich ein input ändert
            localStorage.set('MilitaerdienstKomplett', true);
            localStorage.set('militaerdienstGemacht', true);

        });
    };

    //write the Change to the state.
    handleNoButtonChange = () => {
        this.setState({militaerdienstGemacht: false}, () => {

            // completeness aller textfelder wird überprüft, sobald sich ein input ändert
            localStorage.set('MilitaerdienstKomplett', true);
            localStorage.set('militaerdienstGemacht', false);
        });
    };


    //Try to fetch the already inserted values fro the localStorage
    componentDidMount() {
        this.setState({});
        localStorage.set('MilitaerdienstKomplett', this.checkComponentCompleteness());
    }

    // completeness der textfelder wird überprüft
    checkComponentCompleteness() {
        console.log("mount " + localStorage.get('MilitaerdienstKomplett'))
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
    }


    render() {
        const style = this.state.militaerdienstGemacht ? {display: 'none'} : {};

        return (
            <div>
                <h2>Militärdienst</h2>
                <p>Haben sie Militärdienst geleistet?</p>
                <div className="MilitaerdienstButtons">
                    <Grid direction="column" alignItems="left">
                        <ButtonGroup size="large" mt={5} color="primary" aria-label="outlined primary button group">
                            <Button onClick={this.handleYesButtonChange}> Ja </Button>
                            <Button onClick={this.handleNoButtonChange}> Nein </Button>
                        </ButtonGroup>
                    </Grid>
                </div>
                <div style={style}>
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
                    />
                </div>
            </div>
        );
    }
}

export default Militaerdienst;