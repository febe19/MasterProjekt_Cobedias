import React, {Component, useState} from 'react';
import {IFamilyExtNode} from 'relatives-tree';
import ReactFamilyTree from 'react-family-tree';
import FamilyNode from './FamilyNode';
import styles from './FamilyTree.module.css';
import Button from "@material-ui/core/Button";

import familyHelpers from "./FamilyData.js";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import localStorage from "local-storage";
import TextField from "@material-ui/core/TextField";


//My ID is always 0.
const myID = 'me';

const WIDTH = 100;
const HEIGHT = 100;

class FamilyTree extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handlePopupOpen = this.handlePopupOpen.bind(this);
        this.handlePopupClose = this.handlePopupClose.bind(this);


        //Define the state of this component.
        this.state = {
            FamilyDataState: familyHelpers.getFamilyData(),
            popupOpen: false,
            popupKomplett: false,
            familyMember: '',
            spitzname: '',
            vorname: '',
            nachname: '',
        };


        //Only for test reasons how it looks when starting with a female me.
        //let me = familyHelpers.getFamilyMemberByID("me");
        //familyHelpers.updateFamilyMemberByID(me.id, "female", me.parents, me.siblings, [], [])

        console.log("Starting Family Data: \n" + JSON.stringify(familyHelpers.getFamilyData()));
    }

    //write the Change of "vorname" / "nachname" to the state.
    handleChange = () => event => {
        this.setState({[event.target.name]: event.target.value}, () => {

            // completeness aller textfelder wird überprüft, sobald sich ein input ändert
            //localStorage.set('popupKomplett', this.checkComponentCompleteness());
        });
    };

    handlePopupOpen = () => {
        this.setState({popupOpen: true});
    };

    handlePopupClose = e => {
        this.addSibling(e.currentTarget.value);
        this.setState({popupOpen: false});
        this.setState({spitzname: ''});
        this.setState({vorname: ''});
        this.setState({nachname: ''});
    };

    handlePopupCancel = e => {
        this.setState({popupOpen: false});
        this.setState({spitzname: ''});
        this.setState({vorname: ''});
        this.setState({nachname: ''});
    };


    addSibling = (e) => {
        let me = familyHelpers.getFamilyMemberByID("me");


        //Take me as Sibling
        let siblings = [
            {
                "id": "me",
                "type": "blood"
            },
        ];

        //Add other siblings I have
        for (let i = 0; i < me.siblings.length; i++) {
            siblings.push(me.siblings[i]);
        }

        //Change between add sister or add brother.
        if (e === 'addSister') {
            familyHelpers.addFamilyMember("sibling" + familyHelpers.getHighestIndexOfSiblings(), "female", me.parents, siblings, [], [], this.state.spitzname, this.state.vorname, this.state.nachname);
        } else {
            familyHelpers.addFamilyMember("sibling" + familyHelpers.getHighestIndexOfSiblings(), "male", me.parents, siblings, [], [], this.state.spitzname, this.state.vorname, this.state.nachname);
        }

        this.setState(
            {FamilyDataState: familyHelpers.getFamilyData()}
        )
    };

    addSpouse = (e) => {
        let me = familyHelpers.getFamilyMemberByID("me");

        if (me.gender === 'female') {
            familyHelpers.addFamilyMember("spouse" + familyHelpers.getHighestIndexOfSpouse(), "male", [], [], [{
                "id": "me",
                "type": "married"
            }], me.children);
        } else {
            familyHelpers.addFamilyMember("spouse" + familyHelpers.getHighestIndexOfSpouse(), "female", [], [], [{
                "id": "me",
                "type": "married"
            }], me.children);
        }

        this.setState(
            {FamilyDataState: familyHelpers.getFamilyData()}
        )
    };

    addChildren = (e) => {
        let me = familyHelpers.getFamilyMemberByID("me");
        let meAsAParent = [
            {
                "id": "me",
                "type": "blood"
            }
        ];

        //TODO: Add a selection from which Spouse the child is.
        if (me.spouses.length === 1) {
            meAsAParent.push(me.spouses)
        }

        if (e === 'addDaughter') {
            familyHelpers.addFamilyMember("child" + familyHelpers.getHighestIndexOfChildren(), "female", meAsAParent, [], [], []);
        } else {
            familyHelpers.addFamilyMember("child" + familyHelpers.getHighestIndexOfChildren(), "male", meAsAParent, [], [], []);
        }

        this.setState(
            {FamilyDataState: familyHelpers.getFamilyData()}
        )
    };

    //TODO: Write Family Data into local storeage such that a refresh will not loose all data.

    addFamilyMemberPopup(familyMember, buttonLabel) {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handlePopupOpen}>{buttonLabel}</Button>
                <Dialog open={this.state.popupOpen}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Bitte füllen Sie aus:</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Spitzname"
                            margin="normal"
                            variant="outlined"
                            name="spitzname"
                            value={this.state.spitzname}
                            onChange={this.handleChange("spitzname")}
                            fullWidth
                            placeholder="Geben Sie hier den Spitznamen ein"
                        />
                        <TextField
                            label="Vorname"
                            margin="normal"
                            variant="outlined"
                            name="vorname"
                            value={this.state.vorname}
                            onChange={this.handleChange("vorname")}
                            fullWidth
                            placeholder="Geben Sie hier den Vornamen ein"
                        />
                        <TextField
                            label="Nachname"
                            margin="normal"
                            variant="outlined"
                            name="nachname"
                            value={this.state.nachname}
                            onChange={this.handleChange("nachname")}
                            fullWidth
                            placeholder="Geben Sie hier den Nachnamen ein"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handlePopupCancel} value={familyMember} color="primary">
                            Abbrechen
                        </Button>
                        <Button onClick={this.handlePopupClose} value={familyMember} color="primary">
                            Hinzufügen
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>)
    }

    render() {
        return (
            <div style={{margin: '0 auto'}}>
                <div>
                    <ReactFamilyTree
                        nodes={this.state.FamilyDataState}
                        rootId={myID}
                        width={WIDTH}
                        height={HEIGHT}
                        canvasClassName={styles.tree}
                        renderNode={(node: IFamilyExtNode) => (
                            <FamilyNode
                                key={node.id}
                                node={node}
                                isRoot={node.id === myID}
                                style={{
                                    width: WIDTH * 0.8,
                                    height: HEIGHT * 0.8,
                                    transform: `translate(${node.left * (WIDTH / 2)}px, ${node.top * (HEIGHT / 2)}px)`,
                                }}
                            />
                        )}
                    />
                </div>
                <Button id="addSister" onClick={() => this.addSibling('addSister')}>Add Sister</Button>
                <Button id="addBrother" onClick={() => this.addSibling('addBrother')}>Add Brother</Button>
                <Button id="addSpouse" onClick={() => this.addSpouse('addSpouse')}>Add Spouse</Button>
                <Button id="addDaughter" onClick={() => this.addChildren('addDaughter')}>Add Daughter</Button>
                <Button id="addSon" onClick={() => this.addChildren('addSon')}>Add Son</Button>
                <div>{this.addFamilyMemberPopup('addSister', 'Schwester hinzufügen')}</div>
            </div>
        );
    }
}

export default FamilyTree;