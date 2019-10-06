import React from 'react';
import './App.css';
import {Route, HashRouter} from "react-router-dom";
import Home from "./Home";
import Familienanamnese from "./Familienanamnese/Familienanamnese";
import Sozialanamnese from "./Sozialanamnese/Sozialanamnese";

function App() {
    return (
        <HashRouter>
            <div className="content">
                <Route exact path="/" component={Home}/>
                <Route path="/Familienanamnese" component={Familienanamnese}/>
                <Route path="/Sozialanamnese" component={Sozialanamnese}/>
            </div>
        </HashRouter>
    );
}

export default App;
