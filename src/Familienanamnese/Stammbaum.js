import React, {Component} from "react";
import FamilyTree from './FamilyTreeComponent'
import styles from './FamilyTree.module.css';
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

export class Stammbaum extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        return (
            <div>
                <div style={{width: "100%"}}>
                    <div className="Titel">
                        <h1 style={{display: 'inline-block'}}>Cobedias 2.0 - Familienanamnese</h1>

                        <NavLink exact to="/Home" style={{"text-decoration":"none"}}>
                            <Button variant="outlined" style={{float: 'right', marginRight: '5%', color: 'white', borderColor: 'white'}}>Home</Button>
                        </NavLink>

                        <NavLink exact to="/Sozialanamnese" style={{"text-decoration":"none"}}>
                            <Button variant="outlined" style={{float: 'right', marginRight: '1%', color: 'white', borderColor: 'white'}}>Sozialanamnese</Button>
                        </NavLink>
                    </div>

                    <div className={styles.root}>
                        <FamilyTree/>
                    </div>

                </div>
            </div>
        );
    }
}

export default Stammbaum;
