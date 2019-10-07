import React, {Component} from "react";
import TextField from '@material-ui/core/TextField';

class Berufstaetigkeit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gelernterBeruf: ' ',
            aktuellerBeruf: ' '
        };
    }

    handleChange = () => event => {
        this.setState({[event.target.name]: event.target.value});
    };

    componentDidMount() {
        console.log("Berufstätigkeit: " + new Date().toLocaleTimeString())
    }

    componentWillUnmount() {
        console.log("Gelernte Berufstätigkeit: " + this.state.gelernterBeruf)
        console.log("Aktueller Berufstätigkeit: " + this.state.aktuellerBeruf)
    }

    render() {
        return (
            <div>
                <h2>Berufstätigkeit</h2>

                <TextField
                    label="Gelernte Berufstätigkeit"
                    margin="normal"
                    variant="outlined"
                    name="gelernterBeruf"
                    onChange={this.handleChange("gelernterBeruf")}
                />

                <TextField
                    label="Aktuelle Berufstätigkeit"
                    margin="normal"
                    variant="outlined"
                    name="aktuellerBeruf"
                    onChange={this.handleChange("aktuellerBeruf")}
                />

            </div>
        );
    }
}

export default Berufstaetigkeit;