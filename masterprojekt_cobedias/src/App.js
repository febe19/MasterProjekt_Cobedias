import React from 'react';
import './App.css';
import {Route, Switch, HashRouter} from "react-router-dom";
import 'typeface-roboto';
import Home from "./Home";
import Familienanamnese from "./Familienanamnese/Familienanamnese";
import Sozialanamnese from "./Sozialanamnese/Sozialanamnese";

import Startmenü from "./components/Startmenü";
import Stammbaum from "./components/Stammbaum";

function App() {
    return (
        <HashRouter>
            <div style={{width:"100%"}}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/Familienanamnese" component={Familienanamnese}/>
                    <Route path="/Sozialanamnese" component={Sozialanamnese}/>
                    <Route exact path="*" component={Home}/>
                </Switch>
        
            <Stammbaum/>
            </div>
        </HashRouter>
    );
}

export default App;
