import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {Button} from '@material-ui/core';
import localStorage from 'local-storage'

class Home extends Component {
    constructor(props) {
        super(props);
        this.deleteLocalStorage = this.deleteLocalStorage.bind(this);
    }

    //Deleting the Local Storage by Button --> Probably not needed in hte future.
    deleteLocalStorage() {
        console.log("-  " + new Date().toLocaleTimeString() + " _Home_ Local Storage Cleared");
        localStorage.clear();
    }

    //Log when the User comes to HOME.git
    componentDidMount() {
        console.log("-  " + new Date().toLocaleTimeString() + " _Home_ ");
    }

    render() {
        return (
            <div>
                <div className="Titel">
                    <h1>Cobedias 2.0 - Willkommen</h1>
                </div>

                <div>
                    <p>Vielen Dank, dass Sie sich Zeit nehmen, unseren Prototypen zu testen.</p>
                    <p>Um zu beginnen, können Sie entweder auf "Sozialanamnese" oder auf "Familienanamnese" drücken.</p>


                    <NavLink exact to="/Sozialanamnese" style={{"text-decoration":"none"}}>
                        <Button color="Primary" variant="contained">Sozialanamnese</Button>
                    </NavLink>
                    <NavLink exact to="/Familienanamnese" style={{"text-decoration":"none"}}>
                        <Button color="Primary" variant="contained">Familienanamnese</Button>
                    </NavLink>

                    <Button onClick={this.deleteLocalStorage}>
                        Clear Local Storage
                    </Button>
                </div>

                <div>
                    Currently using React {React.version}
                </div>


            </div>
        );
    }
}

export default Home;
