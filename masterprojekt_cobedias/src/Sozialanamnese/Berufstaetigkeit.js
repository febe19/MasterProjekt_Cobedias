import React, {Component} from "react";
import TextField from '@material-ui/core/TextField';
import localStorage from 'local-storage'

class Berufstaetigkeit extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            gelernterBeruf: '',
            aktuellerBeruf: ''
        };

        console.log("Constructor Berufstätigkeit: " + new Date().toLocaleTimeString());
    }

    handleChange = () => event => {
        this.setState({[event.target.name]: event.target.value});
    };

    componentDidMount() {
        this.setState({
            gelernterBeruf: localStorage.get('gelernterBeruf'),
            aktuellerBeruf: localStorage.get('aktuellerBeruf'),
        })
    }

    componentWillUnmount() {
        console.log("Gelernte Berufstätigkeit: " + this.state.gelernterBeruf);
        console.log("Aktueller Berufstätigkeit: " + this.state.aktuellerBeruf);
        localStorage.set('gelernterBeruf', this.state.gelernterBeruf);
        localStorage.set('aktuellerBeruf', this.state.aktuellerBeruf);
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
                    value={this.state.gelernterBeruf}
                    onChange={this.handleChange("gelernterBeruf")}
                />

                <TextField
                    label="Aktuelle Berufstätigkeit"
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