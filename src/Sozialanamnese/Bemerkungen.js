import React, {Component} from "react";
import localStorage from "local-storage";
import TextField from "@material-ui/core/TextField";

class Bemerkungen extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

        //Define the state of this component.
        this.state = {
            bemerkungen: ''
        };
        console.log("-  " + new Date().toLocaleTimeString() + " _Bemerkungen_");
    }

    handleChange = () => event => {
        this.setState({[event.target.name]: event.target.value}, () => {

            // Completeness aller Textfelder wird überprüft, sobald sich ein Input ändert
            localStorage.set('BemerkungenKomplett', this.checkComponentCompleteness());
        });
    };

    //Try to fetch the already inserted values from the localStorage
    componentWillMount() {

        if (!(localStorage.get('VisitedSteps'))) {
            localStorage.set('VisitedSteps', [])
        }

        if (localStorage.get('VisitedSteps') !== null && localStorage.get('VisitedSteps').indexOf(5) !== -1) {
            this.setState({
                allowErrors: true,
            });
        } else {
            this.setState({
                allowErrors: false,
            });
        }
        this.setState({
            bemerkungen: localStorage.get('bemerkungen')
        });
    }

    //Try to fetch the already inserted values from the localStorage
    componentDidMount() {
        localStorage.set('BemerkungenKomplett', this.checkComponentCompleteness());
    }

    // Completeness der Textfelder wird überprüft
    checkComponentCompleteness() {
        return (this.state.bemerkungen !== '' && this.state.bemerkungen !== null);
    }

    //Write everything to the localState when the Component unmounts.
    componentWillUnmount() {
        localStorage.set('bemerkungen', this.state.bemerkungen);
        localStorage.set('BemerkungenKomplett', this.checkComponentCompleteness());

        let previousVisitedSteps = localStorage.get('VisitedSteps');
        if (previousVisitedSteps.indexOf(5) === -1) {
            previousVisitedSteps.push(5);
            localStorage.set('VisitedSteps', previousVisitedSteps);
        }

    }

    render() {
        return (
            <div>
                <h2>Bemerkungen</h2>
                <br/>
                <p>Falls Sie noch abschliessende Bemerkungen haben, geben Sie diese bitte hier ein. Ansonsten lassen Sie
                    das Feld einfach leer und klicken Sie "Weiter".</p>
                <TextField
                    id="outlined-multiline-static"
                    label="Bemerkungen"
                    multiline
                    rows="8"
                    margin="normal"
                    variant="outlined"
                    value={this.state.bemerkungen}
                    name="bemerkungen"
                    onChange={this.handleChange("bemerkungen")}
                    fullWidth
                    placeholder="Geben Sie hier allfällige Bemerkungen ein."
                    error={(this.state.bemerkungen === '' || this.state.bemerkungen === null) && this.state.allowErrors === true}
                    helperText={((this.state.bemerkungen === '' || this.state.bemerkungen === null) && this.state.allowErrors === true) ? 'Leeres Feld!' : ''}
                />

            </div>
        );
        //return (
        //    <div>
        //        <h2>Bemerkungen</h2>
        //        <p>Falls Sie noch abschliessende Bemerkungen haben, geben Sie diese bitte hier ein. Ansonsten lassen Sie das Feld einfach leer und klicken Sie "Weiter".</p>
        //    </div>
        //);
    }

}

export default Bemerkungen;