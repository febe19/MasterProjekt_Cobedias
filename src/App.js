import React from "react";
import "./App.css";
import {Route, Switch, HashRouter} from "react-router-dom";
import "typeface-roboto";
import Home from "./Home";
import Sozialanamnese from "./Sozialanamnese/Sozialanamnese";
import Stammbaum from "./Familienanamnese/Stammbaum";
import Abschliessen from "./Familienanamnese/Abschliessen";
import Intro from "./Intro";

function App() {
    return (
        <HashRouter>
            <div style={{width: "100%"}}>
                <Switch>
                    <Route exact path="/" component={Intro}/>
                    <Route exact path="/Home" component={Home}/>
                    <Route path="/Familienanamnese" component={Stammbaum}/>
                    <Route path="/FamilienanamneseAbschliessen" component={Abschliessen}/>
                    <Route path="/Sozialanamnese" component={Sozialanamnese}/>
                    <Route exact path="*" component={Home}/>
                </Switch>
            </div>
        </HashRouter>
    );
}

export default App;
