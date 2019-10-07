import React from 'react';
import './App.css';
import {Route, HashRouter} from "react-router-dom";
import 'typeface-roboto';
import Home from "./Home";
import Familienanamnese from "./Familienanamnese/Familienanamnese";
import Sozialanamnese from "./Sozialanamnese/Sozialanamnese";

function App() {
    return (
        <HashRouter>
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/Familienanamnese" component={Familienanamnese}/>
                <Route path="/Sozialanamnese" component={Sozialanamnese}/>
                <div>
                    Currently using React {React.version}
                </div>
            </div>
        </HashRouter>
    );
}

export default App;
