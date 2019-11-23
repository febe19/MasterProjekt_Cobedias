import React, {Component} from "react";
import localStorage from "local-storage";
import TextField from '@material-ui/core/TextField';

class Hobbies extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

        //Define the state of this component.
        this.state = {
            hobbies: ''
        };
        console.log("-  " + new Date().toLocaleTimeString() + " _Hobbies_");
    }

    handleChange = () => event => {
        this.setState({[event.target.name]: event.target.value}, () => {

            // Completeness aller Textfelder wird überprüft, sobald sich ein Input ändert
            localStorage.set('HobbiesKomplett', this.checkComponentCompleteness());
        });
    };

    //Try to fetch the already inserted values from the localStorage
    componentWillMount() {

        if (!(localStorage.get('VisitedSteps'))) {
            localStorage.set('VisitedSteps', [])
        }

        if (localStorage.get('VisitedSteps') !== null && localStorage.get('VisitedSteps').indexOf(1) !== -1) {
            this.setState({
                allowErrors: true,
            });
        } else {
            this.setState({
                allowErrors: false,
            });
        }
        this.setState({
            hobbies: localStorage.get('hobbies')
        });
    }

    //Try to fetch the already inserted values fro the localStorage
    componentDidMount() {
        this.setState({
            hobbies: localStorage.get('hobbies')
        });
        localStorage.set('HobbiesKomplett', this.checkComponentCompleteness());
    }

    // completeness der Textfelder wird überprüft
    checkComponentCompleteness() {
        return (this.state.hobbies !== '' && this.state.hobbies !== null);
    }

    //Write everything to the localState when the Component unmounts.
    componentWillUnmount() {
        localStorage.set('hobbies', this.state.hobbies);
        localStorage.set('HobbiesKomplett', this.checkComponentCompleteness());

        let previousVisitedSteps = localStorage.get('VisitedSteps');
        if (previousVisitedSteps.indexOf(1) === -1) {
            previousVisitedSteps.push(1);
            localStorage.set('VisitedSteps', previousVisitedSteps);
        }

    }

    render() {
        return (
            <div>
                <h2>Hobbies</h2>
                <br/>
                <div>Bitte geben Sie hier Ihre Hobbies ein:</div>
                <TextField
                    id="outlined-multiline-static"
                    label="Hobbies"
                    multiline
                    rows="8"
                    margin="normal"
                    variant="outlined"
                    value={this.state.hobbies}
                    name="hobbies"
                    onChange={this.handleChange("hobbies")}
                    fullWidth
                    placeholder="Geben Sie hier Ihre Hobbies ein"
                    error={(this.state.hobbies === '' || this.state.hobbies === null) && this.state.allowErrors === true}
                    helperText={((this.state.hobbies === '' || this.state.hobbies === null) && this.state.allowErrors === true) ? 'Leeres Feld!' : ''}
                />

            </div>
        );
    }
}

export default Hobbies;