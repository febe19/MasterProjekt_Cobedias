import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {Button} from '@material-ui/core';
import localStorage from 'local-storage'


class Home extends Component {

    constructor(props) {
        super(props);
        this.deleteLocalStorage = this.deleteLocalStorage.bind(this);
    }

    deleteLocalStorage() {
        localStorage.clear();
        console.log("-  " + new Date().toLocaleTimeString() + " _Home_ Local Storage Cleared");
    }

    componentDidMount() {
        console.log("-  " + new Date().toLocaleTimeString() + " _Home_ ");
    }

    render() {
        return (
            <div>
                <div className="Titel">
                    <h1>Cobedias 2.0 - Willkommen</h1>
                </div>

                <div className="SozialanamneseContent">
                    <p>Vielen Dank, dass Sie sich Zeit nehmen, unseren Prototypen zu testen.</p>
                    <p>Um zu beginnen, können Sie entweder auf "Sozialanamnese" oder auf "Familienanamnese" drücken.</p>


                    <NavLink exact to="/Sozialanamnese">
                        <Button>Sozialanamnese</Button>
                    </NavLink>
                    <NavLink exact to="/Familienanamnese">
                        <Button>Familienanamnese</Button>
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