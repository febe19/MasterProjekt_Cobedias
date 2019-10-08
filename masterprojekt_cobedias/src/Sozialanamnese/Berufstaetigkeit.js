import React, {Component} from "react";
import TextField from '@material-ui/core/TextField';
import localStorage from 'local-storage'

class Berufstaetigkeit extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

        //Define the state of this component.
        this.state = {
            gelernterBeruf: '',
            aktuellerBeruf: ''
        };
        console.log("-  " + new Date().toLocaleTimeString() + " _Berufstätigkeiten_");
    }

    //write the Change to the state.
    handleChange = () => event => {
        this.setState({[event.target.name]: event.target.value}, () => {

            // completeness aller textfelder wird überprüft, sobald sich ein input ändert
            localStorage.set('BerufstaetigkeitKomplett', this.checkComponentCompleteness());
        });
    };

    //Try to fetch the already inserted values fro the localStorage
    componentDidMount() {
        this.setState({
            gelernterBeruf: localStorage.get('gelernterBeruf'),
            aktuellerBeruf: localStorage.get('aktuellerBeruf'),
        });
        localStorage.set('BerufstaetigkeitKomplett', this.checkComponentCompleteness());
    }

    // completeness der textfelder wird überprüft
    checkComponentCompleteness() {
        return (this.state.gelernterBeruf !== '' && this.state.aktuellerBeruf !== '' && this.state.gelernterBeruf !== null && this.state.aktuellerBeruf !== null);
    }

    //Write everything to the localState when the Component unmounts.
    componentWillUnmount() {
        localStorage.set('gelernterBeruf', this.state.gelernterBeruf);
        localStorage.set('aktuellerBeruf', this.state.aktuellerBeruf);
        localStorage.set('BerufstaetigkeitKomplett', this.checkComponentCompleteness());
    }

    render() {
        return (
            <div>
                <TextField
                    label="Gelernter Beruf"
                    margin="normal"
                    variant="outlined"
                    name="gelernterBeruf"
                    value={this.state.gelernterBeruf}
                    onChange={this.handleChange("gelernterBeruf")}
                />

                <TextField
                    label="Aktueller Beruf"
                    margin="normal"
                    variant="outlined"
                    name="aktuellerBeruf"
                    value={this.state.aktuellerBeruf}
                    onChange={this.handleChange("aktuellerBeruf")}
                />
            </div>
        );
    }
}

export default Berufstaetigkeit;