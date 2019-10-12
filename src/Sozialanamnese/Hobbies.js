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
    }

    render() {
        return (
            <div>
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
                />

            </div>
        );
    }
}

export default Hobbies;