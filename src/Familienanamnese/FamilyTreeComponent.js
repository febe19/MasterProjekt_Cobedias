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
            addingOfFamilyMember: ''
        };

        //Only for test reasons how it looks when starting with a female me.
        //let me = familyHelpers.getFamilyMemberByID("me");
        //familyHelpers.updateFamilyMemberByID(me.id, "female", me.parents, me.siblings, [], [])

        console.log("Starting Family Data: \n" + JSON.stringify(familyHelpers.getFamilyData()));
    }


    //OnClick function ot add Siblings of me
    //write the Change of "vorname" / "nachname" to the state.
    handleChange = () => event => {
        this.setState({[event.target.name]: event.target.value}, () => {

            // completeness aller textfelder wird überprüft, sobald sich ein input ändert
            //localStorage.set('popupKomplett', this.checkComponentCompleteness());
        });
    };

    // closes Popup when new family member is added with button "hinzufügen"
    handlePopupClose = e => {
        if (e.currentTarget.value === 'addDaughter') {
            this.addChildren('addDaughter');
        } else if (e.currentTarget.value === 'addSon') {
            this.addChildren('addSon');
        } else if (e.currentTarget.value === 'addSpouse') {
            this.addSpouse("addSpouse");
        } else if (e.currentTarget.value === 'addBrother') {
            this.addSibling('addBrother');
        } else if (e.currentTarget.value === 'addSister') {
            this.addSibling("addSister")
        }

        this.setState({
            popupOpen: false,
            spitzname: '',
            vorname: '',
            nachname: ''
        });
    };

    // closes Popup when adding new family member is canceled with button "abbrechen"
    handlePopupCancel = e => {
        this.setState({
            popupOpen: false,
            spitzname: '',
            vorname: '',
            nachname: ''
        });
    };

    //OnClick function ot add Siblings of me
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

    //OnClick Function to add a Spouse
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

    //OnClick Function to add Children
    addChildren = (e) => {
        let me = familyHelpers.getFamilyMemberByID("me");
        let meChildren = [];
        let meAsAParent = [
            {
                "id": "me",
                "type": "blood"
            }
        ];

        //TODO: Add a selection from which Spouse the child is and then push it to the meAsAParent Array.
        if (me.spouses.length === 1) {
            meAsAParent.push(me.spouses)
        }

        if (me.children !== [] && me.children.length !== 0) {
            for (let i = 0; i < me.children.length; i++) {
                meChildren.push(me.children[i]);
            }
        }

        if (e === 'addDaughter') {
            familyHelpers.addFamilyMember("child" + familyHelpers.getHighestIndexOfChildren(), "female", meAsAParent, meChildren, [], []);
        } else {
            familyHelpers.addFamilyMember("child" + familyHelpers.getHighestIndexOfChildren(), "male", meAsAParent, meChildren, [], []);
        }

        this.setState(
            {FamilyDataState: familyHelpers.getFamilyData()}
        )
    };

    //onclick Function to delete Family Member
    deleteFamilyMember = (e) => {
        console.log("--> " + e);

        //TODO: Currently only child one is deletable. This id should be selectable from the UI
        familyHelpers.deleteFamilyMember("child1");

        this.setState(
            {FamilyDataState: familyHelpers.getFamilyData()}
        )
    }

    //TODO: Write Family Data into local Storage such that a refresh will not loose all data.

    // popup to add a new family member
    addFamilyMemberPopup = (fm) => {
        console.log("__Adding of Family Member: " + fm);
        this.setState({popupOpen: true, addingOfFamilyMember: fm});
    };

    //Show Popup,if state == true
    showPopup() {
        return (
            <div>
                <Dialog open={this.state.popupOpen} aria-labelledby="form-dialog-title">
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
                        <Button onClick={this.handlePopupCancel} value={this.state.addingOfFamilyMember}
                                color="primary">
                            Abbrechen
                        </Button>
                        <Button onClick={this.handlePopupClose} value={this.state.addingOfFamilyMember} color="primary">
                            Hinzufügen
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>)
    }

    render() {
        return (
            <div style={{margin: '0 auto'}}>
                <Button id="deleteFamilyMember" onClick={() => this.deleteFamilyMember('deleteChild')}>Delete
                    Child</Button>
                <div>
                    <Button id="addSister" variant="outlined" color="primary"
                            onClick={() => this.addFamilyMemberPopup('addSister')}>Schwester
                        Hinzufügen</Button>
                    <Button id="addBrother" variant="outlined" color="primary"
                            onClick={() => this.addFamilyMemberPopup('addBrother')}>Bruder
                        Hinzufügen</Button>
                    <Button id="addSpouse" variant="outlined" color="primary"
                            onClick={() => this.addFamilyMemberPopup('addSpouse')}>Partner
                        Hinzufügen</Button>
                    <Button id="addDaughter" variant="outlined" color="primary"
                            onClick={() => this.addFamilyMemberPopup('addDaughter')}>Tochter
                        Hinzufügen</Button>
                    <Button id="addSon" variant="outlined" color="primary"
                            onClick={() => this.addFamilyMemberPopup('addSon')}>Sohn
                        Hinzufügen</Button>
                    <div>{this.showPopup()}</div>
                </div>
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
            </div>
        );
    }
}

export default FamilyTree;