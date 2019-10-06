import React, {Component} from "react";
import {NavLink} from "react-router-dom";

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
                        <button className="StartButton">Sozialanamnese</button>
                    </NavLink>
                    <NavLink exact to="/Familienanamnese">
                        <button className="StartButton">Familienanamnese</button>
                    </NavLink>
                </div>
            </div>
        );
    }
}

export default Home;