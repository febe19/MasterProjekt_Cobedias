import React, {Component} from 'react';
import {IFamilyExtNode} from 'relatives-tree';
import ReactFamilyTree from 'react-family-tree';
import FamilyNode from './FamilyNode';
import styles from './FamilyTree.module.css';
import Button from "@material-ui/core/Button";

import familyHelpers from "./FamilyData.js";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import localStorage from "local-storage";
import TextField from "@material-ui/core/TextField";


import {makeStyles} from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Typography from "@material-ui/core/Typography";

import Fab from '@material-ui/core/Fab';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';


//My ID is always 0.
const myID = 'me';

const WIDTH = 150;
const HEIGHT = 150;


const classes = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    button: {
        marginRight: theme.spacing(1)
    },
    backButton: {
        marginRight: theme.spacing(1)
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));


const steps = getSteps();


// Namen der Stepps werden hier definiert
function getSteps() {
    return ["Angaben", "Gesundheitszustand"];
}


// prüft ob ein spezifischer Component "complete" ist
function componentCompleted(step) {
    switch (step) {
        case 0:
            console.log("-  " + new Date().toLocaleTimeString() + " _Popup_Angaben_ Fertig");
            return localStorage.get('AngabenKomplett');
        case 1:
            console.log("-  " + new Date().toLocaleTimeString() + " _Popup_Gesundheitszustand_ Fertig");
            return localStorage.get('GesundheitszustandKomplett');
        default:
            console.log("case default");
            return false;
    }
}


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
            addingOfFamilyMember: '',
            gesundheitszustand: '',
            activeStep: 0,
            completed: {},
        };

        console.log("Starting Family Data: \n" + JSON.stringify(familyHelpers.getFamilyData()));
    }


// zeigt Component des jeweiligen Stepps und ermöglicht so navigation zu einem spezifischen Stepp
    getStepContent(step) {
        switch (step) {
            case 0:
                //return <Angaben/>;
                return this.showAngaben();
            case 1:
                //return <Gesundheitszustand/>;
                return this.showGesundheitszustand();
            default:
                return "Unknown step";
        }
    }


// prüft, ob alle Felder in diesem Step ausgefüllt sind
    updateStepCompleteness(step) {
        console.log("check completeness for: " + step);
        // alle ausgefüllt --> Häckchen wird gesetzt
        if (componentCompleted(step) === true) {
            const newCompleted = this.state.completed;
            newCompleted[step] = true;
            this.setState({completed: newCompleted});
            // setCompleted(newCompleted);
        } else {
            // Nicht alle ausgefüllt --> Häckchen wird entfernt
            const newCompleted = this.state.completed;
            newCompleted[step] = false;
            this.setState({completed: newCompleted});
            // TODO: Enable alert (evtl. mit zwei Buttons --> möchten Sie wirklich weiter? Ja/Nein)
            // TODO: Alert-Vorgehen überdenken: nur einfacher Alert oder unterschiedlicher Alert für jeden Case?
            // TODO: Sollen nicht ausgefüllte textfelder rot markiert werden?
            //alert("Nicht alle Felder ausgefüllt!");
        }
    }


//Anzahl Steps
    totalSteps = () => {
        return getSteps().length;
    };


// "Weiter" Button
    handleNext = () => {
        this.updateStepCompleteness(this.state.activeStep);
        const newActiveStep = this.state.activeStep + 1;
        this.setState({activeStep: newActiveStep});
        //setActiveStep(newActiveStep);
    };


// "Zurück" Button
    handleBack = () => {
        this.updateStepCompleteness(this.state.activeStep);
        this.setState({activeStep: this.state.activeStep - 1});

        // setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

// Direkter Sprung zu einem Stepp in oberer Leiste (Stepp Button)
    handleStep = step => () => {
        this.updateStepCompleteness(this.state.activeStep);
        this.setState({activeStep: step});

        //setActiveStep(step);
    };


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
            nachname: '',
            gesundheitszustand: ''
        });
    };

    // closes Popup when adding new family member is canceled with button "abbrechen"
    handlePopupCancel = e => {
        this.setState({
            popupOpen: false,
            spitzname: '',
            vorname: '',
            nachname: '',
            gesundheitszustand: ''
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
            }], me.children, this.state.spitzname, this.state.vorname, this.state.nachname);
        } else {
            familyHelpers.addFamilyMember("spouse" + familyHelpers.getHighestIndexOfSpouse(), "female", [], [], [{
                "id": "me",
                "type": "married"
            }], me.children, this.state.spitzname, this.state.vorname, this.state.nachname);
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
            familyHelpers.addFamilyMember("child" + familyHelpers.getHighestIndexOfChildren(), "female", meAsAParent, meChildren, [], [], this.state.spitzname, this.state.vorname, this.state.nachname);
        } else {
            familyHelpers.addFamilyMember("child" + familyHelpers.getHighestIndexOfChildren(), "male", meAsAParent, meChildren, [], [], this.state.spitzname, this.state.vorname, this.state.nachname);
        }

        this.setState(
            {FamilyDataState: familyHelpers.getFamilyData()}
        )
    };

    //onclick Function to delete Family Member
    deleteFamilyMember = (e) => {
        console.log("Delete FamiliyMember --> " + e);

        //TODO: Currently only child one is deletable. This id should be selectable from the UI
        familyHelpers.deleteFamilyMember(e);

        this.setState(
            {FamilyDataState: familyHelpers.getFamilyData()}
        )
    }

    //edit of already existiong Family members
    editFamilyMember = (e) => {
        console.log("Edit FamiliyMember --> " + e);

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
                <Dialog open={this.state.popupOpen}
                        aria-labelledby="form-dialog-title">
                    <div className="dialogContentDiv">
                        <DialogTitle id="form-dialog-title">Bitte füllen Sie aus:</DialogTitle>
                        <DialogContent>

                            <div>{this.showStepperInPopup()}</div>

                        </DialogContent>
                        <DialogActions style={{margin: '0 auto'}}>
                            <Fab style={{background: 'red', margin: '0 auto', height: '100px', width: '100px'}}
                                 onClick={this.handlePopupCancel}
                                 value={this.state.addingOfFamilyMember} color='primary' fontSize='large'>
                                <CancelIcon/>
                            </Fab>
                            <Fab style={{
                                background: 'green',
                                margin: '0 auto',
                                height: '100px',
                                width: '100px',
                                bottom: '0px'
                            }}
                                 onClick={this.handlePopupClose}
                                 value={this.state.addingOfFamilyMember}
                                 color='primary' fontSize='small'>
                                <CheckCircleIcon/>
                            </Fab>
                        </DialogActions>
                    </div>
                </Dialog>

            </div>)
    }


    // popup to add a new family member
    showAngaben() {
        return (
            <div>
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
            </div>
        )
    }

    // popup to add a new family member
    showGesundheitszustand() {
        return (
            <div>
                <TextField
                    label="Gesundheitszustand"
                    margin="normal"
                    variant="outlined"
                    name="gesundheitszustand"
                    value={this.state.gesundheitszustand}
                    onChange={this.handleChange("gesundheitszustand")}
                    fullWidth
                    multiline
                    rows="8"
                    placeholder="Geben Sie hier den Gesundheitszustand ein"
                />
            </div>
        )
    }

    showStepperInPopup() {
        return (
            <div className='FamilyTreeContent'>
                <Stepper alternativeLabel nonLinear activeStep={this.state.activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepButton
                                    onClick={this.handleStep(index)}>
                                    {label}
                                </StepButton>
                            </Step>
                        );
                    })}
                </Stepper>
                <div>
                    <div className="FamilyTreeStepContent">
                        <Typography className={classes.instructions}>
                            {this.getStepContent(this.state.activeStep)}
                        </Typography>
                    </div>
                    <div className="FamilyTreeNavigationsButton">
                        <div>
                            <Button
                                size="large"
                                variant="outlined"
                                disabled={this.state.activeStep === 0}
                                onClick={this.handleBack}
                                className={classes.button}
                            >
                                Zurück
                            </Button>
                            <Button
                                disabled={this.state.activeStep === (this.totalSteps() - 1)}
                                size="large"
                                variant="contained"
                                color="primary"
                                onClick={this.handleNext}
                                className={classes.button}
                            >
                                Weiter
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    // TODO: create popup to modify existing family members

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
                                deleteFunction={this.deleteFamilyMember}
                                editFunction={this.editFamilyMember}
                                style={{
                                    width: WIDTH * 0.8,
                                    height: HEIGHT * 0.8,
                                    transform: `translate(${node.left * (WIDTH / 1.9)}px, ${node.top * (HEIGHT / 1.9)}px)`,
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