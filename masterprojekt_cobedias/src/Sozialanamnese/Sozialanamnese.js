import React, {Component} from "react";
import {Route, Switch, NavLink} from "react-router-dom";
import Erklaerung from "./Erklaerung";
import Berufstaetigkeit from ".././Sozialanamnese/Berufstaetigkeit";
import Hobbies from "../Sozialanamnese/Hobbies";
import Militaerdienst from "./Militaerdienst";
import Wohnsituation from "./Wohnsituation";
import Zivilstand from "./Zivilstand";
import Bemerkungen from "./Bemerkungen";

class Sozialanamnese extends Component {
    constructor(props) {
        super(props);
        console.log("-  " + new Date().toLocaleTimeString() + " _SozialanamneseStart_");
    }


    render() {
        return (
            <div>
                <div className="Titel">
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
                <div className="SozialanamneseContent">
                    <Switch>
                        <Route exact path="/Sozialanamnese" component={Erklaerung}/>
                        <Route exact path="/Sozialanamnese/Berufstaetigkeit" component={Berufstaetigkeit}/>
                        <Route exact path="/Sozialanamnese/Hobbies" component={Hobbies}/>
                        <Route exact path="/Sozialanamnese/Militaerdienst" component={Militaerdienst}/>
                        <Route exact path="/Sozialanamnese/Wohnsituation" component={Wohnsituation}/>
                        <Route exact path="/Sozialanamnese/Zivilstand" component={Zivilstand}/>
                        <Route exact path="/Sozialanamnese/Bemerkungen" component={Bemerkungen}/>
                        <Route exact path="/Sozialanamnese/*" component={Erklaerung}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Sozialanamnese;