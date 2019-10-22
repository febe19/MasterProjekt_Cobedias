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
import EditIcon from "@material-ui/core/SvgIcon/SvgIcon";


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

// Namen der Stepps werden hier definiert
function getSteps(member) {
    if (verwandtschaftAbfragenNeeded(member)) {
        return ["Angaben", "Gesundheitszustand", "Verwandtschaft"];
    } else {
        return ["Angaben", "Gesundheitszustand"];
    }
}

//Function to determine if Verwandtschaft needs to be displayed for a current person.
function verwandtschaftAbfragenNeeded(member) {
    return !(member === 'myMother' || member === 'myFather' || member === 'addBrother' || member === 'addSister' || member.slice(0, 7) === 'sibling');
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
            gesundheitszustand: '',
            currentSelectedFamilyMember: '',
            activeStep: 0,
            completed: {},
        };

        console.log("Starting Family Data: \n" + JSON.stringify(familyHelpers.getFamilyData()));
    }

// zeigt Component des jeweiligen Stepps und ermöglicht so navigation zu einem spezifischen Stepp
    getStepContent(step) {
        switch (step) {
            case 0:
                return this.showAngaben();
            case 1:
                return this.showGesundheitszustand();
            case 2:
                return this.showVerwandtschaft();
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

// "Weiter" Button
    handleNext = (e) => {
        this.updateStepCompleteness(this.state.activeStep);
        if (this.state.activeStep === getSteps(this.state.currentSelectedFamilyMember).length - 1) {
            this.handlePopupClose(e);
        } else {
            this.setState({activeStep: this.state.activeStep + 1});
        }
    };

// "Zurück" Button
    handleBack = (e) => {
        this.updateStepCompleteness(this.state.activeStep);
        if (this.state.activeStep === 0) {
            this.handlePopupCancel(e);
        } else {
            this.setState({activeStep: this.state.activeStep - 1});
        }
    };

// Direkter Sprung zu einem Stepp in oberer Leiste (Stepp Button)
    handleStep = step => () => {
        this.updateStepCompleteness(this.state.activeStep);
        this.setState({activeStep: step});
    };

    //OnClick function ot add Siblings of me
    //write the Change of "vorname" / "nachname" and so on to the state.
    handleChange = () => event => {
        this.setState({[event.target.name]: event.target.value});
    };

    // closes Popup when new family member is added with button "hinzufügen"
    handlePopupClose = e => {

        //First try to add a new Member if the value starts with add, else a current member needs to be edited.
        if (e.currentTarget.value === 'addDaughter') {
            this.addChildren('addDaughter');
        } else if (e.currentTarget.value === 'addSon') {
            this.addChildren('addSon');
        } else if (e.currentTarget.value === 'addSpouse') {
            this.addSpouse('addSpouse');
        } else if (e.currentTarget.value === 'addBrother') {
            this.addSibling('addBrother');
        } else if (e.currentTarget.value === 'addSister') {
            this.addSibling('addSister')
        } else {
            console.log("__Handle Popup Close for: " + e.currentTarget.value + " --> Edit of data");
            let currentData = familyHelpers.getFamilyMemberByID(this.state.currentSelectedFamilyMember);
            familyHelpers.editExistingFamilyMember(currentData.id, currentData.gender, currentData.parents, currentData.siblings, currentData.spouses, currentData.children, this.state.spitzname, this.state.vorname, this.state.nachname, this.state.gesundheitszustand);
        }

        this.setState({
            popupOpen: false,
            spitzname: '',
            vorname: '',
            nachname: '',
            gesundheitszustand: '',
            activeStep: 0
        });
    };

    // closes Popup when adding new family member is canceled with button "abbrechen"
    handlePopupCancel = e => {
        this.setState({
            popupOpen: false,
            spitzname: '',
            vorname: '',
            nachname: '',
            gesundheitszustand: '',
            activeStep: 0
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
            familyHelpers.addFamilyMember("sibling" + familyHelpers.getHighestIndexOfSiblings(), "female", me.parents, siblings, [], [], this.state.spitzname, this.state.vorname, this.state.nachname, this.state.gesundheitszustand);
        } else {
            familyHelpers.addFamilyMember("sibling" + familyHelpers.getHighestIndexOfSiblings(), "male", me.parents, siblings, [], [], this.state.spitzname, this.state.vorname, this.state.nachname, this.state.gesundheitszustand);
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
            }], me.children, this.state.spitzname, this.state.vorname, this.state.nachname, this.state.gesundheitszustand);
        } else {
            familyHelpers.addFamilyMember("spouse" + familyHelpers.getHighestIndexOfSpouse(), "female", [], [], [{
                "id": "me",
                "type": "married"
            }], me.children, this.state.spitzname, this.state.vorname, this.state.nachname, this.state.gesundheitszustand);
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
            familyHelpers.addFamilyMember("child" + familyHelpers.getHighestIndexOfChildren(), "female", meAsAParent, meChildren, [], [], this.state.spitzname, this.state.vorname, this.state.nachname, this.state.gesundheitszustand);
        } else {
            familyHelpers.addFamilyMember("child" + familyHelpers.getHighestIndexOfChildren(), "male", meAsAParent, meChildren, [], [], this.state.spitzname, this.state.vorname, this.state.nachname, this.state.gesundheitszustand);
        }

        this.setState(
            {FamilyDataState: familyHelpers.getFamilyData()}
        )
    };

    //onclick Function to delete Family Member
    deleteFamilyMember = (e) => {
        console.log("Delete FamiliyMember --> " + e);

        familyHelpers.deleteFamilyMember(e);

        this.setState(
            {FamilyDataState: familyHelpers.getFamilyData()}
        )
    };

    //edit of already existing Family members
    editFamilyMember = (e) => {
        console.log("Edit Familiy Member --> " + e);

        this.setState({
            spitzname: familyHelpers.getFamilyMemberByID(e).spitzname,
            vorname: familyHelpers.getFamilyMemberByID(e).vorname,
            nachname: familyHelpers.getFamilyMemberByID(e).nachname,
            gesundheitszustand: familyHelpers.getFamilyMemberByID(e).gesundheitszustand
        });

        //Open Popup
        this.popUpFamilyMember(e);
    };

    //TODO: Write Family Data into local Storage such that a refresh will not loose all data.

    // popup to add a new family member
    popUpFamilyMember = (fm) => {
        console.log("__PopUp for Family Member: " + fm);
        this.setState({popupOpen: true, currentSelectedFamilyMember: fm});
    };

    //Show Popup,if state == true
    showPopup() {
        return (
            <div>
                <Dialog open={this.state.popupOpen}>
                    <div className="dialogContentDiv">
                        <DialogTitle>Bitte füllen Sie aus:</DialogTitle>
                        <DialogContent style={{padding: '0'}}>
                            <div>{this.showStepperInPopup()}</div>
                        </DialogContent>
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

    showVerwandtschaft() {
        return (
            <div>
                <p>Here you can enter your Verwandtschaft</p>
            </div>
        )
    }

    showStepperInPopup() {
        return (
            <div className='FamilyTreeContent'>
                <div>
                    <Button color="primary" aria-label="edit"
                            onClick={this.handlePopupCancel}
                            value={this.state.currentSelectedFamilyMember}
                            style={{
                                margin: '0 auto',
                                height: '30px',
                                width: '10px',
                                position: 'absolute',
                                top: '0%',
                                right: '0%',
                                background: 'red',
                                color: 'white',
                                borderRadius: '0 0 0 10px',
                            }}>
                        <CancelIcon style={{
                            position: 'absolute',
                            margin: '0 auto',
                            height: '15px',
                            width: '15px',
                        }}/>
                    </Button>
                </div>
                <Stepper alternativeLabel nonLinear activeStep={this.state.activeStep}>
                    {getSteps(this.state.currentSelectedFamilyMember).map((label, index) => {
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
                        <Button
                            size="large"
                            variant="outlined"
                            onClick={this.handleBack}
                            value={this.state.currentSelectedFamilyMember}
                            className={classes.button}
                            style={{width: '100px', margin: '3px'}}
                        >
                            {this.state.activeStep === 0 ? 'Abbrechen' : 'Zurück'}
                        </Button>
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={this.handleNext}
                            value={this.state.currentSelectedFamilyMember}
                            className={classes.button}
                            style={{width: '100px', margin: '3px'}}
                        >
                            {this.state.activeStep === getSteps(this.state.currentSelectedFamilyMember).length - 1 ? 'Fertig' : 'Weiter'}
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div style={{margin: '0 auto'}}>
                <div>
                    <Button id="addSister" variant="outlined" color="primary"
                            onClick={() => this.popUpFamilyMember('addSister')}>Schwester
                        Hinzufügen</Button>
                    <Button id="addBrother" variant="outlined" color="primary"
                            onClick={() => this.popUpFamilyMember('addBrother')}>Bruder
                        Hinzufügen</Button>
                    <Button id="addSpouse" variant="outlined" color="primary"
                            onClick={() => this.popUpFamilyMember('addSpouse')}>Partner
                        Hinzufügen</Button>
                    <Button id="addDaughter" variant="outlined" color="primary"
                            onClick={() => this.popUpFamilyMember('addDaughter')}>Tochter
                        Hinzufügen</Button>
                    <Button id="addSon" variant="outlined" color="primary"
                            onClick={() => this.popUpFamilyMember('addSon')}>Sohn
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