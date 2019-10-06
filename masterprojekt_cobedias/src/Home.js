import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import { Button } from '@material-ui/core';


class Home extends Component {
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
                </div>
            </div>
        );
    }
}

export default Home;