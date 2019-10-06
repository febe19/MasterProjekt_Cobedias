import React, { Component } from "react";
import {Route, NavLink} from "react-router-dom";
import Home from ".././Home";
import Berufstaetigkeit from ".././Sozialanamnese/Berufstaetigkeit";
import Hobbies from "../Sozialanamnese/Hobbies";
import Militaerdienst from "./Militaerdienst";
import Wohnsituation from "./Wohnsituation";
import Zivilstand from "./Zivilstand";
import Bemerkungen from "./Bemerkungen";

class Sozialanamnese extends Component {
    render() {
        return (
            <div>
                <div className="App">
                    <h1>Cobedias 2.0 - Sozialanamnese</h1>
                </div>

                <div className="Sozialanamnese">
                    <ul className="header">
                        <li><NavLink exact to="/Sozialanamnese/Berufstaetigkeit">Berufstätigkeit</NavLink></li>
                        <li><NavLink exact to="/Sozialanamnese/Hobbies">Hobbies</NavLink></li>
                        <li><NavLink exact to="/Sozialanamnese/Militaerdienst">Militärdienst</NavLink></li>
                        <li><NavLink exact to="/Sozialanamnese/Wohnsituation">Wohnsituation</NavLink></li>
                        <li><NavLink exact to="/Sozialanamnese/Zivilstand">Zivilstand</NavLink></li>
                        <li><NavLink exact to="/Sozialanamnese/Bemerkungen">Bemerkungen</NavLink></li>
                    </ul>
                </div>
                <div className="content">
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/Sozialanamnese/Berufstaetigkeit" component={Berufstaetigkeit}/>
                    <Route exact path="/Sozialanamnese/Hobbies" component={Hobbies}/>
                    <Route exact path="/Sozialanamnese/Militaerdienst" component={Militaerdienst}/>
                    <Route exact path="/Sozialanamnese/Wohnsituation" component={Wohnsituation}/>
                    <Route exact path="/Sozialanamnese/Zivilstand" component={Zivilstand}/>
                    <Route exact path="/Sozialanamnese/Bemerkungen" component={Bemerkungen}/>
                </div>
            </div>
        );
    }
}

export default Sozialanamnese;