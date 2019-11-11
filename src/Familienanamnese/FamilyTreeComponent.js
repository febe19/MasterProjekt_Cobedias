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
import TextField from "@material-ui/core/TextField";


import {makeStyles} from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Typography from "@material-ui/core/Typography";

import CancelIcon from '@material-ui/icons/Cancel';

import MenuItem from '@material-ui/core/MenuItem';

import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import localStorage from "local-storage";

import {NavLink} from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import OtherFamilyMemberNode from "./OtherFamilyMemberNode";


const TransitionAlertPopup = React.forwardRef(function TransitionAlertPopup(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});


//My ID is always 0.
const myID = 'me';

const WIDTH = 150;
const HEIGHT = 150;
const RESIZE = 0.7;


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


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
}));

// creates all the year which can be chosen in the dropdowns "Geburtsjahr" / "Todesjahr"
const yearsDropdown = [];

for (var i = 2019; i >= 1919; i--) {
    const dict = {
        value: i,
    };
    yearsDropdown.push(dict);
}


// Namen der Stepps werden hier definiert
function getSteps(member) {
    if (verwandtschaftAbfragenNeeded(member)) {
        return ["Angaben", "Zustand", "Verwandtschaft"];
    } else {
        return ["Angaben", "Zustand"];
    }
}

//Function to determine if Verwandtschaft needs to be displayed for a current person.
function verwandtschaftAbfragenNeeded(member) {

    let me = familyHelpers.getFamilyMemberByID("me");

    if (member === 'myMother' || member === 'myFather' || member === 'addBrother' || member === 'addSister' || member.slice(0, 7) === 'sibling') {
        return false;
    } else if ((member === 'addSon' || member === 'addDaughter' || member.slice(0, 5) === 'child') && (me.spouses.length > 1)) {
        return true;
    } else if ((member === 'addSpouse' || member.slice(0, 6) === 'spouse') && (me.children.length > 0) && (me.spouses.length > 0)) {
        return true;
    } else if (member === 'addOther' || member.substring(0, 5) === 'other') {
        return true;
    } else {
        return false;
    }
}


class FamilyTree extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeBlur = this.handleChangeBlur.bind(this);
        this.handlePopupClose = this.handlePopupClose.bind(this);
        this.handleYesButtonChange = this.handleYesButtonChange.bind(this);
        this.handleNoButtonChange = this.handleNoButtonChange.bind(this);
        this.showTutorial = this.showTutorial.bind(this);
        this.nextTutorialStep = this.nextTutorialStep.bind(this);
        this.previousTutorialStep = this.previousTutorialStep.bind(this);
        this.handlePopupAbschliessenClose = this.handlePopupAbschliessenClose.bind(this);
        this.handleWeiblichButtonChange = this.handleWeiblichButtonChange.bind(this);
        this.handleMaenlichButtonChange = this.handleMaenlichButtonChange.bind(this);

        //Define the state of this component.
        this.state = {
            FamilyDataState: familyHelpers.getFamilyData(),
            OtherFamilyMembersState: familyHelpers.getOtherFamilyData(),
            popupOpen: false,
            popupCancelAlertOpen: false,
            popupDeleteFamilyMemberAlertOpen: false,
            familyMemberToBeDeleted: '',
            DeletedFamilyMembers: [],
            popupKomplett: false,
            angabenKomplett: false,
            familyMemberZustandKomplett: false,
            verwandschaftKomplett: false,
            familyMember: '',
            geburtsjahr: 0,
            spitzname: '',
            vorname: '',
            nachname: '',
            gesundheitszustand: '',
            currentSelectedFamilyMember: '',
            activeStep: 0,
            completed: {},
            verstorben: '',
            todesjahr: 0,
            todesursache: '',
            hideTutorial: true,
            tutorialStep: 0,
            childrenOfSpouse: [],
            additionalParentOfChild: '',
            abschliessenPopupOpen: false,
            blutsverwandt: true,
            otherFamilyMemberGender: 'male',
            verwandtschaftsgrad: '',
        };

        console.log("Starting Family Data: \n" + JSON.stringify(familyHelpers.getFamilyData()));
    }


    //Try to fetch the gender of me from the localStorage
    componentWillMount() {
        let me_gender = localStorage.get('me_gender');
        if (localStorage.get('me_gender')) {
            familyHelpers.setGenderOfMe(me_gender);
        }
        this.setState({FamilyDataState: familyHelpers.getFamilyData()});
    }

// zeigt Component des jeweiligen Stepps und ermöglicht so navigation zu einem spezifischen Stepp
    getStepContent(step) {
        switch (step) {
            case 0:
                return this.showAngaben();
            case 1:
                return this.showFamilyMemberZustand();
            case 2:
                return this.showVerwandtschaft();
            default:
                return "Unknown step";
        }
    }


// prüft ob ein spezifischer Component "complete" ist
    componentCompleted(step) {
        switch (step) {
            case 0:
                return (this.state.angabenKomplett);
            case 1:
                return this.state.familyMemberZustandKomplett;
            case 2:
                return this.state.verwandschaftKomplett;
            default:
                console.log("case default");
                return false;
        }
    }

// prüft, ob alle Felder in diesem Step ausgefüllt sind
    updateStepCompleteness(step) {
        this.setState({
            angabenKomplett: this.checkAngabenCompleteness(),
            familyMemberZustandKomplett: this.checkZustandCompleteness()
        }, () => {
            // alle ausgefüllt --> Häckchen wird gesetzt
            if (this.componentCompleted(step) === true) {
                const newCompleted = this.state.completed;
                newCompleted[step] = true;
                this.setState({completed: newCompleted});
                // setCompleted(newCompleted);
            } else {
                // Nicht alle ausgefüllt --> Häckchen wird entfernt
                const newCompleted = this.state.completed;
                newCompleted[step] = false;
                this.setState({completed: newCompleted});
            }
        })
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
            this.handlePopopCancelAlert(e);
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
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    //OnBlur function which checks the completeness and updates stepper-checks
    handleChangeBlur = () => event => {
        this.updateStepCompleteness(this.state.activeStep);
    };


    //write the Change of "todesjahr" and so on to the state.
    handleChangeTodesjahr = () => event => {
        this.setState({todesjahr: event.target.value});
    };

    //OnBlur function which checks the completeness and updates stepper-checks when "todesjahr" is changed
    handleChangeTodesjahrBlur = () => event => {
        this.updateStepCompleteness(this.state.activeStep);
    };

    //write the Change of "geburtsjahr" and so on to the state.
    handleChangeGeburtsjahr = () => event => {
        this.setState({
            geburtsjahr: event.target.value,
        })
    };

    //OnBlur function which checks the completeness and updates stepper-checks when "geburtsjahr" is changed
    handleChangeGeburtsjahrBlur = () => event => {
        this.updateStepCompleteness(this.state.activeStep);

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
            this.addSibling('addSister');
        } else if (e.currentTarget.value === 'addOther') {
            this.addOtherFamilyMember('addOther');
        } else {
            console.log("__Handle Popup Close for: " + e.currentTarget.value + " --> Edit of data");

            if (e.currentTarget.value.substring(0, 5) === 'other') {
                familyHelpers.editOtherExistingFamiliyMember(e.currentTarget.value, this.state.otherFamilyMemberGender, this.state.geburtsjahr, this.state.spitzname, this.state.vorname, this.state.nachname, this.state.verstorben, this.state.todesjahr, this.state.todesursache, this.state.gesundheitszustand, this.state.blutsverwandt, this.state.verwandtschaftsgrad);
            } else {

                let currentData = familyHelpers.getFamilyMemberByID(this.state.currentSelectedFamilyMember);
                let newParents = currentData.parents;

                //check if a child is edited
                if (e.currentTarget.value.substring(0, 5) === 'child') {
                    newParents = [];
                    let me = familyHelpers.getFamilyMemberByID("me");
                    //ad "me" to parents
                    newParents.push({"id": "me"});

                    //set the selected additional parent as the second parent of the edited child
                    if (this.state.additionalParentOfChild !== '' && this.state.additionalParentOfChild !== null) {
                        newParents.push(
                            {
                                "id": this.state.additionalParentOfChild
                            }
                        )
                    }
                }

                familyHelpers.editExistingFamilyMember(currentData.id, currentData.gender, newParents, currentData.parents, currentData.siblings, currentData.spouses, this.state.childrenOfSpouse, currentData.children, this.state.geburtsjahr, this.state.spitzname, this.state.vorname, this.state.nachname, this.state.verstorben, this.state.todesjahr, this.state.todesursache, this.state.gesundheitszustand, this.state.blutsverwandt);
            }
            this.setState({
                FamilyDataState: familyHelpers.getFamilyData(),
                OtherFamilyMembersState: familyHelpers.getOtherFamilyData()
            });
        }

        this.setState({
            popupOpen: false,
            geburtsjahr: 0,
            spitzname: '',
            vorname: '',
            nachname: '',
            gesundheitszustand: '',
            activeStep: 0,
            verstorben: '',
            todesjahr: 0,
            todesursache: '',
            popupKomplett: false,
            angabenKomplett: false,
            familyMemberZustandKomplett: false,
            verwandschaftKomplett: false,
            additionalParentOfChild: '',
            childrenOfSpouse: [],
            currentSelectedFamilyMember: '',
            verwandtschaftsgrad: '',
            otherFamilyMemberGender: '',
        });
    };

    // when the "addFamilyMember-Popup" is closed (with "abbrechen" or "x") this handler closes the popup (without deleting the data) and opens the alert popup
    handlePopopCancelAlert = e => {
        this.setState({
            popupCancelAlertOpen: true,
            popupOpen: false
        })
    };

    handleAbschliesseAlert = e => {
        this.setState({
            abschliessenPopupOpen: true,
        })
    };

    // closes "addFamilyMember-Popup" when adding new family member is canceled with button "abbrechen" && then alert popup is agreed
    // the unsaved data is deleted
    handlePopupCancel = e => {
        this.setState({
            popupCancelAlertOpen: false,
            popupOpen: false,
            geburtsjahr: 0,
            spitzname: '',
            vorname: '',
            nachname: '',
            gesundheitszustand: '',
            activeStep: 0,
            verstorben: '',
            todesjahr: 0,
            todesursache: '',
            popupKomplett: false,
            angabenKomplett: false,
            familyMemberZustandKomplett: false,
            verwandschaftKomplett: false,
            additionalParentOfChild: '',
            childrenOfSpouse: [],
            currentSelectedFamilyMember: '',
            verwandtschaftsgrad: '',
            otherFamilyMemberGender: '',
        });
    };

    // closes alert Popup when alert message is not agreed --> the data is not deleted and the "addFamilyMember-Popup" is opened again
    handlePopupCancelAlertClose = e => {
        this.setState({
            popupOpen: true,
            popupCancelAlertOpen: false
        });
    };

    // closes alert Popup when alert message is not agreed / family member is not deleted!
    handlePopupDeleteFamilyMemberAlertClose = e => {
        this.setState({
            popupDeleteFamilyMemberAlertOpen: false,
            familyMemberToBeDeleted: '',
            verwandschaftKomplett: false,
            additionalParentOfChild: ''
        });
    };

    handlePopupAbschliessenClose = e => {
        this.setState({
            abschliessenPopupOpen: false
        });
    };


    //write the Change of the Verstorben=Yes Button to the state.
    handleYesButtonChange = () => {
        this.setState({
            verstorben: true,
        }, () => {
            this.updateStepCompleteness(this.state.activeStep);
        });
    };

    handleWeiblichButtonChange = () => {
        this.setState({
            otherFamilyMemberGender: 'female',
        }, () => {
            this.updateStepCompleteness(this.state.activeStep);
        });
    };

    handleMaenlichButtonChange = () => {
        this.setState({
            otherFamilyMemberGender: 'male',
        }, () => {
            this.updateStepCompleteness(this.state.activeStep);
        });
    };


    //write the Change of the Verstorben=No Button to the state.
    handleNoButtonChange = () => {
        this.setState({
            verstorben: false,
        }, () => {
            this.updateStepCompleteness(this.state.activeStep);
        });
    };

    // Completeness der Textfelder im step Angaben wird überprüft
    checkAngabenCompleteness() {
        if (this.state.geburtsjahr !== 0 && this.state.spitzname !== '' && this.state.vorname !== '' && this.state.nachname !== '') {
            return true;
        } else {
            return false;
        }
    }

    // Completeness der Textfelder im step Zustand wird überprüft
    checkZustandCompleteness() {
        if (this.state.verstorben === '') {
            return false;
        } else if (this.state.verstorben === true) {
            if (this.state.todesjahr !== 0 && this.state.todesjahr !== '' && this.state.todesursache !== '') {
                return true;
            } else {
                return false;
            }
        } else if (this.state.verstorben === false) {
            if (this.state.gesundheitszustand !== '') {
                return true;
            }
        } else {
            return false;
        }
    }

    addOtherFamilyMember = (e) => {
        console.log("--> Add Other Family Member " + e);
        familyHelpers.addOtherFamilyMember("other" + (familyHelpers.getHighestIndexOfOtherFM() + 1), this.state.otherFamilyMemberGender, this.state.geburtsjahr, this.state.spitzname, this.state.vorname, this.state.nachname, this.state.verstorben, this.state.todesjahr, this.state.todesursache, this.state.gesundheitszustand, this.state.blutsverwandt, this.state.verwandtschaftsgrad);
        this.setState({OtherFamilyMembersState: familyHelpers.getOtherFamilyData()});
    };


    //OnClick function ot add Siblings of me
    addSibling = (e) => {
        let me = familyHelpers.getFamilyMemberByID("me");

        //Take me as Sibling
        let siblings = [
            {
                "id": "me"
            },
        ];

        //Add other siblings I have
        for (let i = 0; i < me.siblings.length; i++) {
            siblings.push(me.siblings[i]);
        }

        //Change between add sister or add brother.
        if (e === 'addSister') {
            familyHelpers.addFamilyMember("sibling" + familyHelpers.getHighestIndexOfFM('sibling', this.state.DeletedFamilyMembers), "female", me.parents, siblings, [], [], this.state.geburtsjahr, this.state.spitzname, this.state.vorname, this.state.nachname, this.state.verstorben, this.state.todesjahr, this.state.todesursache, this.state.gesundheitszustand, this.state.blutsverwandt);
        } else {
            familyHelpers.addFamilyMember("sibling" + familyHelpers.getHighestIndexOfFM('sibling', this.state.DeletedFamilyMembers), "male", me.parents, siblings, [], [], this.state.geburtsjahr, this.state.spitzname, this.state.vorname, this.state.nachname, this.state.verstorben, this.state.todesjahr, this.state.todesursache, this.state.gesundheitszustand, this.state.blutsverwandt);
        }

        this.setState({FamilyDataState: familyHelpers.getFamilyData()});
    };

    //OnClick Function to add a Spouse
    addSpouse = (e) => {
        let me = familyHelpers.getFamilyMemberByID("me");
        let children = [];
        if (me.spouses.length === 0) {
            children = me.children
        } else {
            for (let i = 0; i < this.state.childrenOfSpouse.length; i++) {
                children.push({"id": this.state.childrenOfSpouse[i]})
            }
        }

        // TODO: choose gender of spouse

        if (me.gender === 'female') {
            familyHelpers.addFamilyMember("spouse" + familyHelpers.getHighestIndexOfFM('spouse', this.state.DeletedFamilyMembers), "male", [], [], [{
                "id": "me"
            }], children, this.state.geburtsjahr, this.state.spitzname, this.state.vorname, this.state.nachname, this.state.verstorben, this.state.todesjahr, this.state.todesursache, this.state.gesundheitszustand, false);
        } else {
            familyHelpers.addFamilyMember("spouse" + familyHelpers.getHighestIndexOfFM('spouse', this.state.DeletedFamilyMembers), "female", [], [], [{
                "id": "me"
            }], children, this.state.geburtsjahr, this.state.spitzname, this.state.vorname, this.state.nachname, this.state.verstorben, this.state.todesjahr, this.state.todesursache, this.state.gesundheitszustand, false);
        }

        this.setState({FamilyDataState: familyHelpers.getFamilyData()});
    };

    //OnClick Function to add Children
    addChildren = (e) => {
        let me = familyHelpers.getFamilyMemberByID("me");
        let meChildren = [];
        let newParents = [
            {
                "id": "me"
            }
        ];

        //set the selected additional parent
        if (this.state.additionalParentOfChild !== '' && this.state.additionalParentOfChild !== null) {
            newParents.push(
                {
                    "id": this.state.additionalParentOfChild
                }
            )
        } else if (me.spouses.length > 0) {
            newParents.push(
                {
                    "id": me.spouses[me.spouses.length - 1].id
                }
            )
        }

        if (me.children !== [] && me.children.length !== 0) {
            for (let i = 0; i < me.children.length; i++) {
                meChildren.push(me.children[i]);
            }
        }

        if (e === 'addDaughter') {
            familyHelpers.addFamilyMember("child" + familyHelpers.getHighestIndexOfFM('child', this.state.DeletedFamilyMembers), "female", newParents, meChildren, [], [], this.state.geburtsjahr, this.state.spitzname, this.state.vorname, this.state.nachname, this.state.verstorben, this.state.todesjahr, this.state.todesursache, this.state.gesundheitszustand, this.state.blutsverwandt);
        } else {
            familyHelpers.addFamilyMember("child" + familyHelpers.getHighestIndexOfFM('child', this.state.DeletedFamilyMembers), "male", newParents, meChildren, [], [], this.state.geburtsjahr, this.state.spitzname, this.state.vorname, this.state.nachname, this.state.verstorben, this.state.todesjahr, this.state.todesursache, this.state.gesundheitszustand, this.state.blutsverwandt);
        }

        this.setState({FamilyDataState: familyHelpers.getFamilyData()});
    };


    //onclick Function to open alert popup which asks if you really want to delete this family member
    handleDeleteFamilyMemberPopup = (e) => {
        console.log("Delete FamiliyMember POPUP --> " + e);

        //now set the spouse which was added last (and is not the one who is deleted) as the default spouse to add the children from the spouse which will be deleted
        let spouseToEdit = '';
        for (let i = 0; i <= familyHelpers.getFamilyMemberByID("me").spouses.length - 1; i++) {
            if (!(familyHelpers.getFamilyMemberByID("me").spouses[i].id === e)) {
                spouseToEdit = familyHelpers.getFamilyMemberByID("me").spouses[i].id;
            }
        }

        this.setState(
            {
                popupDeleteFamilyMemberAlertOpen: true,
                familyMemberToBeDeleted: e,
                additionalParentOfChild: spouseToEdit
            }
        )
    };

    //onclick Function to delete Family Member: called when alert popup to delete family member is agreed
    deleteFamilyMember = (e) => {
        //add the fm to the list of all deleted fm's
        let DeletedFamilyMembers = this.state.DeletedFamilyMembers;
        DeletedFamilyMembers.push(familyHelpers.getFamilyMemberByID(this.state.familyMemberToBeDeleted));
        //add it to the state
        this.setState({
                DeletedFamilyMembers: DeletedFamilyMembers
            }, () => {
                console.log("__All deleted Family Members: \n" + JSON.stringify(this.state.allDeletedFamilyMembers))
            }
        );

        console.log("FamilyMemberTo Delete:  --> " + this.state.familyMemberToBeDeleted);

        if (this.state.familyMemberToBeDeleted.substring(0, 5) === 'other') {
            familyHelpers.deleteOtherFamilyMember(this.state.familyMemberToBeDeleted);
            this.setState(
                {
                    popupDeleteFamilyMemberAlertOpen: false,
                    FamilyDataState: familyHelpers.getFamilyData(),
                    OtherFamilyMembersState: familyHelpers.getOtherFamilyData(),
                    familyMemberToBeDeleted: '',
                    verwandschaftKomplett: false,
                }
            )
        }
        //check if a spouse is deleted && if it is not the only spouse && is has children
        else if (this.state.familyMemberToBeDeleted.substring(0, 6) === 'spouse' && (familyHelpers.getFamilyMemberByID("me").spouses.length) > 1 && (familyHelpers.getFamilyMemberByID(this.state.familyMemberToBeDeleted).children.length) > 0) {
            //spouseToEdit is set to the one that was selected in the delete-fm-alert-popup
            //the children of the deleted spouse will be added to the spouseToEdit
            let spouseToEdit = this.state.additionalParentOfChild;

            //now add all the children that the existing spouse already has now
            let allChildrenOfOtherSpouseAfterDeletion = [];
            if (familyHelpers.getFamilyMemberByID(spouseToEdit).children.length > 0) {
                for (let i = 0; i <= familyHelpers.getFamilyMemberByID(spouseToEdit).children.length - 1; i++) {
                    allChildrenOfOtherSpouseAfterDeletion.push(familyHelpers.getFamilyMemberByID(spouseToEdit).children[i].id)
                }
            }

            //now additionally add all children of the spouse who gets deleted
            for (let i = 0; i <= familyHelpers.getFamilyMemberByID(this.state.familyMemberToBeDeleted).children.length - 1; i++) {
                allChildrenOfOtherSpouseAfterDeletion.push(familyHelpers.getFamilyMemberByID(this.state.familyMemberToBeDeleted).children[i].id)
            }

            //now edit the found spouse --> it is like the spouse who will still exist after deletion takes away all the deleted spouse's children before the spouse is deleted
            let currentData = familyHelpers.getFamilyMemberByID(spouseToEdit);
            familyHelpers.editExistingFamilyMember(currentData.id, currentData.gender, currentData.parents, currentData.parents, currentData.siblings, currentData.spouses, allChildrenOfOtherSpouseAfterDeletion, currentData.children, currentData.geburtsjahr, currentData.spitzname, currentData.vorname, currentData.nachname, currentData.verstorben, currentData.todesjahr, currentData.todesursache, currentData.gesundheitszustand, currentData.blutsverwandt);

            // now the spouse who we want to delete doesn't have children anymore. This means that now we can delete it.
            familyHelpers.deleteFamilyMember(this.state.familyMemberToBeDeleted);
            this.setState(
                {
                    popupDeleteFamilyMemberAlertOpen: false,
                    FamilyDataState: familyHelpers.getFamilyData(),
                    familyMemberToBeDeleted: '',
                    childrenOfSpouse: [],
                    verwandschaftKomplett: false,
                    additionalParentOfChild: ''
                }
            )

        } else {
            //if it is (not a spouse || a spouse without children || the only spouse) that is being deleted, the fm can directly be deleted (without removing the children first)
            familyHelpers.deleteFamilyMember(this.state.familyMemberToBeDeleted);
            this.setState(
                {
                    popupDeleteFamilyMemberAlertOpen: false,
                    FamilyDataState: familyHelpers.getFamilyData(),
                    familyMemberToBeDeleted: '',
                    verwandschaftKomplett: false,
                    additionalParentOfChild: ''
                }
            )
        }
    };

    //edit of already existing Family members
    editFamilyMember = (e) => {
        console.log("Edit Familiy Member --> " + e);

        if (e.substring(0, 5) === 'other') {
            this.setState({
                geburtsjahr: familyHelpers.getOtherFamilyMemberByID(e).geburtsjahr,
                spitzname: familyHelpers.getOtherFamilyMemberByID(e).spitzname,
                vorname: familyHelpers.getOtherFamilyMemberByID(e).vorname,
                nachname: familyHelpers.getOtherFamilyMemberByID(e).nachname,
                verstorben: familyHelpers.getOtherFamilyMemberByID(e).verstorben,
                todesjahr: familyHelpers.getOtherFamilyMemberByID(e).todesjahr,
                todesursache: familyHelpers.getOtherFamilyMemberByID(e).todesursache,
                gesundheitszustand: familyHelpers.getOtherFamilyMemberByID(e).gesundheitszustand,
                blutsverwandt: familyHelpers.getOtherFamilyMemberByID(e).blutsverwandt,
                verwandschaftKomplett: true,
                verwandtschaftsgrad: familyHelpers.getOtherFamilyMemberByID(e).verwandtschaftsgrad,
                otherFamilyMemberGender: familyHelpers.getOtherFamilyMemberByID(e).gender,
            });
        } else {
            this.setState({
                geburtsjahr: familyHelpers.getFamilyMemberByID(e).geburtsjahr,
                spitzname: familyHelpers.getFamilyMemberByID(e).spitzname,
                vorname: familyHelpers.getFamilyMemberByID(e).vorname,
                nachname: familyHelpers.getFamilyMemberByID(e).nachname,
                verstorben: familyHelpers.getFamilyMemberByID(e).verstorben,
                todesjahr: familyHelpers.getFamilyMemberByID(e).todesjahr,
                todesursache: familyHelpers.getFamilyMemberByID(e).todesursache,
                gesundheitszustand: familyHelpers.getFamilyMemberByID(e).gesundheitszustand,
                blutsverwandt: familyHelpers.getFamilyMemberByID(e).blutsverwandt,
                verwandschaftKomplett: true
            });

            //check if child (which you want to edit) has 2 parents. If yes: set "additionalParentOfChild" = id of the second parent of the child (which has t be the spouse)
            if (e.substring(0, 5) === 'child' && (familyHelpers.getFamilyMemberByID(e).parents.length) > 1) {
                this.setState({
                    additionalParentOfChild: familyHelpers.getFamilyMemberByID(e).parents[1].id
                });
            }

            //check which are the existing children of the spouse
            if (e.substring(0, 6) === 'spouse' && (familyHelpers.getFamilyMemberByID(e).children.length) > 0) {
                let previousChildrenOfSpouse = [];
                for (let i = 0; i <= familyHelpers.getFamilyMemberByID(e).children.length - 1; i++) {
                    previousChildrenOfSpouse.push(familyHelpers.getFamilyMemberByID(e).children[i].id);
                }

                this.setState({
                    childrenOfSpouse: previousChildrenOfSpouse
                });
            }
        }
        //Open Popup
        this.popUpFamilyMember(e);
    };

    //TODO: Write Family Data into local Storage such that a refresh will not loose all data.

    // popup to add a new family member
    popUpFamilyMember = (fm) => {
        console.log("__PopUp for Family Member: " + fm);
        this.setState({activeStep: 0, popupOpen: true, currentSelectedFamilyMember: fm}, () => {
            this.updateStepCompleteness(0);
            this.updateStepCompleteness(1);
            this.updateStepCompleteness(2);
        });
    };

    showTutorial() {
        this.setState({
            hideTutorial: !this.state.hideTutorial,
            tuorialStep: 0
        });
    }

    nextTutorialStep() {
        if (this.state.tutorialStep === 3) {
            this.setState({tutorialStep: 0});
            this.showTutorial();
        } else {
            this.setState({tutorialStep: this.state.tutorialStep + 1});
        }
    }

    previousTutorialStep() {
        if (this.state.tutorialStep === 0) {
            this.setState({tutorialStep: 0});
            this.showTutorial();
        } else {
            this.setState({tutorialStep: this.state.tutorialStep - 1});
        }
    }

    //Im Popup sollte der richtige Namen stehen
    getPopUpLabel() {
        let name = '';
        let degree = '';

        console.log("this.state.currentSelectedFamilyMember: " + this.state.currentSelectedFamilyMember);

        if (this.state.currentSelectedFamilyMember !== '') {
            if (this.state.currentSelectedFamilyMember.substring(0, 3) !== 'add') {
                let fm = familyHelpers.getFamilyMemberByID(this.state.currentSelectedFamilyMember);

                if (fm.spitzname !== '') {
                    name = fm.spitzname;
                } else if (fm.vorname !== '') {
                    name = fm.vorname;
                }

                if (this.state.currentSelectedFamilyMember === 'myMother') {
                    degree = 'Ihre Mutter';
                    name = "";
                } else if (this.state.currentSelectedFamilyMember === 'myFather') {
                    degree = 'Ihr Vater';
                    name = '';
                } else if (this.state.currentSelectedFamilyMember.substring(0, 5) === 'child') {
                    if (fm.gender === 'female') {
                        degree = "Ihrer Tochter";
                    } else {
                        degree = "Ihrem Sohn";
                    }
                } else if (this.state.currentSelectedFamilyMember.substring(0, 6) === 'spouse') {
                    if (fm.gender === 'female') {
                        degree = "Ihrer Partnerin";
                    } else {
                        degree = "Ihrem Partner";
                    }
                } else if (this.state.currentSelectedFamilyMember.substring(0, 7) === 'sibling') {
                    if (fm.gender === 'female') {
                        degree = "Ihrer Schwester";
                    } else {
                        degree = "Ihrem Bruder";
                    }
                }
            } else {
                degree = "Ihrem neuen Familienmitglied";
            }
        }

        return degree + " " + name;
    }

    //Show Popup,if state == true
    showPopup() {
        return (
            <div>
                <Dialog open={this.state.popupOpen}>
                    <div className="dialogContentDiv">
                        <DialogTitle>Details zu {this.getPopUpLabel()}</DialogTitle>
                        <DialogContent style={{padding: '0'}}>
                            <div>{this.showStepperInPopup()}</div>
                        </DialogContent>
                    </div>
                </Dialog>
            </div>)
    }

    //Show Popup,if state == true
    showPopupCancelAlert() {
        return (
            <div>
                <Dialog
                    open={this.state.popupCancelAlertOpen}
                    TransitionComponent={TransitionAlertPopup}
                    keepMounted
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle style={{background: '#EC4622', color: 'white'}}
                                 id="alert-dialog-slide-title">{"Wollen Sie wirklich abbrechen?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Wenn Sie abbrechen, werden Ihre Daten nicht gespeichert!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handlePopupCancelAlertClose} color="primary">
                            Nein
                        </Button>
                        <Button onClick={this.handlePopupCancel} color="primary">
                            Ja
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>)
    }

    handleCheckboxChange = name => event => {
        this.setState({...this.state, [name]: event.target.checked});
    };

    // step content of "Angaben"
    showAngaben() {
        return (
            <div>
                <form className={useStyles.container} noValidate autoComplete="off">
                    <TextField
                        id="geburtsjahr"
                        select
                        variant="outlined"
                        label="Geburtsjahr"
                        className={classes.textField}
                        value={this.state.geburtsjahr}
                        onChange={this.handleChangeGeburtsjahr("geburtsjahr")}
                        onBlur={this.handleChangeGeburtsjahrBlur("geburtsjahr")}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        helperText="Geburtsjahr wählen"
                        margin="normal"
                    >
                        {yearsDropdown.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.value}
                            </MenuItem>
                        ))}
                    </TextField>
                </form>
                <TextField
                    label="Spitzname"
                    margin="normal"
                    variant="outlined"
                    name="spitzname"
                    value={this.state.spitzname}
                    onChange={this.handleChange("spitzname")}
                    onBlur={this.handleChangeBlur("spitzname")}
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
                    onBlur={this.handleChangeBlur("vorname")}
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
                    onBlur={this.handleChangeBlur("nachname")}
                    fullWidth
                    placeholder="Geben Sie hier den Nachnamen ein"
                />
                <div
                    hidden={this.state.currentSelectedFamilyMember === 'myMother' || this.state.currentSelectedFamilyMember === 'myFather' || this.state.currentSelectedFamilyMember.substring(0, 6) === 'spouse' || this.state.currentSelectedFamilyMember.substring(0, 9) === 'addSpouse'}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.blutsverwandt}
                                onChange={this.handleCheckboxChange("blutsverwandt")}
                                value="blutsverwandt"
                                color="primary"
                            />
                        }
                        label="Diese Person ist blutsverwandt mit mir."
                    />
                </div>
            </div>
        )
    }


    //Show Popup,if state == true
    showPopupDeleteFamilyMemberAlert() {
        return (
            <div>
                <Dialog
                    open={this.state.popupDeleteFamilyMemberAlertOpen}
                    TransitionComponent={TransitionAlertPopup}
                    keepMounted
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle style={{background: '#EC4622', color: 'white'}}
                                 id="alert-dialog-slide-title">{"Wollen Sie dieses Familienmitglieder wirklich löschen?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Wählen Sie "Ja", um das Familienmitglied zu löschen. Achtung, diese Aktion kann nicht
                            rückgängig gemacht werden.
                        </DialogContentText>
                        <div>{this.showVerwandschaftParents()}</div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handlePopupDeleteFamilyMemberAlertClose} color="primary">Nein</Button>
                        <Button onClick={this.deleteFamilyMember} color="primary">Ja</Button>
                    </DialogActions>
                </Dialog>
            </div>)
    }

    showPopupAbschliessen() {
        return (
            <div>
                <Dialog
                    open={this.state.abschliessenPopupOpen}
                    TransitionComponent={TransitionAlertPopup}
                    keepMounted
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle style={{background: '#EC4622', color: 'white'}}
                                 id="alert-dialog-slide-title">{"Wollen Sie die Familienanamnese wirklich abschliessen?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Wählen Sie "Ja", um die Familienanamnese abzuschliessen und zum Startbildschirm
                            zurückzukehren.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handlePopupAbschliessenClose} color="primary">
                            Nein
                        </Button>

                        <NavLink exact to="/" style={{"text-decoration": "none"}}>
                            <Button onClick={this.deleteFamilyMember} color="primary">Ja</Button>
                        </NavLink>
                    </DialogActions>
                </Dialog>
            </div>)
    }


    // markiert den "Ja" button blau sobald er angewählt wird
    colorYesButton() {
        if (this.state.verstorben === '') {
            return false
        } else {
            return (this.state.verstorben)
        }
    }

    // markiert den "Nein" button blau sobald er angewählt wird
    colorNoButton() {
        if (this.state.verstorben === '') {
            return false
        } else {
            return (!this.state.verstorben)
        }
    }

    // step content of "Zustand"
    showFamilyMemberZustand() {
        const styleYesButton = (this.colorYesButton()) ? {background: '#BBC2E5'} : {};
        const styleNoButton = (this.colorNoButton()) ? {background: '#BBC2E5'} : {};

        return (

            <div>
                <p>Familienmitglieder verstorben?</p>
                <div className="FamilyMemberZustandButton">
                    <Button variant="outlined" size="small" color="primary"
                            style={styleYesButton} onClick={this.handleYesButtonChange}>Ja</Button>
                </div>
                <div className="FamilyMemberZustandButton">
                    <Button variant="outlined" size="small" color="primary" style={styleNoButton}
                            onClick={this.handleNoButtonChange}> Nein </Button>
                </div>
                <div>{this.showGesundheitszustandOrTodesjahr()}</div>
            </div>
        )
    }

    // depending on if verstorben=YES/NO this function displays the apropriate stepper content
    showGesundheitszustandOrTodesjahr() {
        if (this.state.verstorben !== '') {
            if (this.state.verstorben) {
                return (
                    <div>
                        <br/>
                        <br/>
                        <br/>
                        <p>Bitte geben Sie das Todesjahr und die Todesursache von {this.state.spitzname} an:</p>
                        <form className={useStyles.container} noValidate autoComplete="off">
                            <TextField
                                id="todesjahr"
                                select
                                variant="outlined"
                                label="Todesjahr"
                                className={classes.textField}
                                value={this.state.todesjahr}
                                onChange={this.handleChangeTodesjahr("todesjahr")}
                                onBlur={this.handleChangeTodesjahrBlur("todesjahr")}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                helperText="Todesjahr wählen"
                                margin="normal"
                            >
                                {yearsDropdown.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.value}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </form>

                        <TextField
                            label="Todesursache"
                            margin="normal"
                            variant="outlined"
                            name="todesursache"
                            value={this.state.todesursache}
                            onChange={this.handleChange("todesursache")}
                            onBlur={this.handleChangeBlur("todesursache")}
                            fullWidth
                            multiline
                            rows="5"
                            placeholder="Geben Sie hier die Todesursache ein"
                        />
                    </div>
                )

            } else {
                return (
                    <div>
                        <br/>
                        <br/>
                        <br/>
                        <div className="Gesundheitszustand">
                            <p>Bitte geben Sie den Gesundheitszustand an:<br/>Dies kann z.Bsp. Gesund oder die Angabe
                                von Krankheiten sein. </p>
                        </div>
                        <TextField
                            label="Gesundheitszustand"
                            margin="normal"
                            variant="outlined"
                            name="gesundheitszustand"
                            value={this.state.gesundheitszustand}
                            onChange={this.handleChange("gesundheitszustand")}
                            onBlur={this.handleChangeBlur("gesundheitszustand")}
                            fullWidth
                            multiline
                            rows="8"
                            placeholder="Geben Sie hier den Gesundheitszustand ein"
                        />
                    </div>
                )
            }
        }
    }


    showVerwandschaftChildren() {
        if (this.state.currentSelectedFamilyMember === 'addSpouse' || this.state.currentSelectedFamilyMember.slice(0, 6) === 'spouse') {
            let me = familyHelpers.getFamilyMemberByID("me");

            let children = [];

            // show children
            for (let i = 0; i < me.children.length; i++) {
                let id = me.children[i].id;
                let name = familyHelpers.getFamilyMemberByID(me.children[i].id).spitzname;
                if (name === '') {
                    name = familyHelpers.getFamilyMemberByID(me.children[i].id).vorname;
                }
                if (name === '') {
                    name = id;
                }
                children.push(
                    {
                        id: id,
                        type: me.children[i].type,
                        name: name,
                    });
            }

            return (
                <div>
                    <p>Bitte wählen Sie die Kinder:</p>
                    {children.map(option => (
                        <Button id={option.id} variant="outlined" color="primary"
                                onClick={() => this.choseChildrenForSpouse(option.id)}
                                style={(this.state.childrenOfSpouse.includes(option.id)) ? {background: '#BBC2E5'} : {}}>{option.name}</Button>
                    ))}
                </div>
            )


        }
    }

    showVerwandschaftParents() {
        // the parents are shown in the add-popup when a child is added and more than 1 spouse exists
        // the parents are shown in the edit-popup when a child is edited and more than 1 spouse exists
        // the parents are also shown in the delete-alert-popup if a spouse is deleted and more that 1 other spouse exists and the spouse who is deleted has at least 1 child
        if (this.state.currentSelectedFamilyMember === 'addSon' || this.state.currentSelectedFamilyMember === 'addDaughter' || this.state.currentSelectedFamilyMember.slice(0, 5) === 'child' || (this.state.familyMemberToBeDeleted !== '' && familyHelpers.getFamilyMemberByID("me").spouses.length > 2 && familyHelpers.getFamilyMemberByID(this.state.familyMemberToBeDeleted).children.length > 0)) {
            let me = familyHelpers.getFamilyMemberByID("me");

            //Take me as spouses
            let spouses = [];

            // show spouses
            for (let i = 0; i < me.spouses.length; i++) {
                let id = me.spouses[i].id;
                let name = familyHelpers.getFamilyMemberByID(me.spouses[i].id).spitzname;
                if (name === '') {
                    name = familyHelpers.getFamilyMemberByID(me.spouses[i].id).vorname;
                }
                if (name === '') {
                    name = familyHelpers.getFamilyMemberByID(me.spouses[i].id).spitzname;
                }
                if (name === '') {
                    name = id;
                }
                // the following if condition makes sure that (if we are currently in the delete-alert-popup) the spouse who is to be deleted is not shown as an option
                if (!(id === this.state.familyMemberToBeDeleted)) {
                    spouses.push(
                        {
                            id: id,
                            type: me.spouses[i].type,
                            name: name,
                        });
                }
            }

            return (
                <div>
                    <div>{this.getShowVerwandschaftParentsMessage()}</div>
                    {spouses.map(option => (
                        <Button id={option.id} variant="outlined" color="primary"
                                onClick={() => this.choseParentForChildren(option.id)}
                                style={(this.state.additionalParentOfChild === option.id) ? {background: '#BBC2E5'} : {}}>{option.name}</Button>
                    ))}
                </div>
            )
        }
    }

    // set additionalParentOfChild when the coresponding button is chosen in "verwandschaft"
    choseParentForChildren(id) {
        this.setState({
            additionalParentOfChild: id,
            verwandschaftKomplett: true
        }, () => {
            this.updateStepCompleteness(this.state.activeStep);
        });
    }

    // add child to Spouses'-Childs to array when the coresponding button is chosen in "verwandschaft"
    choseChildrenForSpouse(id) {

        let currentlySelectedChildren = this.state.childrenOfSpouse;

        if (!currentlySelectedChildren.includes(id)) {
            currentlySelectedChildren.push(id);
        }

        this.setState({
            childrenOfSpouse: currentlySelectedChildren,
            verwandschaftKomplett: true
        }, () => {
            this.updateStepCompleteness(this.state.activeStep);
        });
    }

    getShowVerwandschaftParentsMessage() {
        if (this.state.familyMemberToBeDeleted === '') {
            return (
                <p>Bitte wählen Sie das Elternteil:</p>
            )
        } else {
            let numberOfChildrenOfDeletedSpouse = familyHelpers.getFamilyMemberByID(this.state.familyMemberToBeDeleted).children.length;
            let childrenOfDeletedSpouse = [];
            for (let i = 0; i < familyHelpers.getFamilyMemberByID(this.state.familyMemberToBeDeleted).children.length; i++) {
                let id = familyHelpers.getFamilyMemberByID(this.state.familyMemberToBeDeleted).children[i].id;
                let name = familyHelpers.getFamilyMemberByID(id).spitzname;
                if (name === '') {
                    name = familyHelpers.getFamilyMemberByID(id).vorname;
                }
                if (name === '') {
                    name = id;
                }
                childrenOfDeletedSpouse.push(name)
            }
            return (
                <div>
                    <p>Dieses Familienmitglied ist Elternteil von den
                        folgenden {numberOfChildrenOfDeletedSpouse} Kindern:<br/>{childrenOfDeletedSpouse.join(', ')}
                    </p>
                    <br></br>
                    <p>Bitte wählen Sie, welchem anderen Elternteil diese Kinder zugewiesen werden sollen:<br/><br/></p>
                </div>
            )
        }

    }

    // stepper content of "Verwandschaft"
    showVerwandtschaft() {
        console.log("--> Show Verwandtschaft for " + this.state.currentSelectedFamilyMember);
        return (
            <div>
                <div>{this.showVerwandschaftParents()}</div>
                <div>{this.showVerwandschaftChildren()}</div>
                <div>{this.showOtherFamilyMemberVerwandtschaft()}</div>
            </div>
        )
    }

    showOtherFamilyMemberVerwandtschaft() {
        if (this.state.currentSelectedFamilyMember === 'addOther' || this.state.currentSelectedFamilyMember.substring(0, 5) === 'other') {
            return (
                <div>
                    <p>Bitte wählen sie ein Geschlecht aus</p>
                    <Button variant="outlined" size="small" color="primary"
                            style={this.state.otherFamilyMemberGender === 'male' ? {
                                background: '#BBC2E5',
                                margin: '5px'
                            } : {margin: '5px'}}
                            onClick={this.handleMaenlichButtonChange}>Männlich</Button>
                    <Button variant="outlined" size="small" color="primary"
                            style={this.state.otherFamilyMemberGender === 'female' ? {
                                background: '#BBC2E5',
                                margin: '5px'
                            } : {margin: '5px'}}
                            onClick={this.handleWeiblichButtonChange}>Weiblich</Button>
                    <TextField
                        label="Verwandtschaftsgrad"
                        margin="normal"
                        variant="outlined"
                        name="verwandtschaftsgrad"
                        value={this.state.verwandtschaftsgrad}
                        onChange={this.handleChange("verwandtschaftsgrad")}
                        onBlur={this.handleChangeBlur("verwandtschaftsgrad")}
                        fullWidth
                        placeholder="Geben Sie hier den Verwandtschaftsgrad ein"
                    />
                </div>
            )
        }
    }

    showStepperInPopup() {
        return (
            <div className='FamilyTreeContent'>
                <div>
                    <Button color="primary" aria-label="edit"
                            onClick={this.handlePopopCancelAlert}
                            value={this.state.currentSelectedFamilyMember}
                            style={{
                                margin: '0 auto',
                                height: '60px',
                                width: '30px',
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
                            height: '30px',
                            width: '30px',
                        }}/>
                    </Button>
                </div>
                <Stepper alternativeLabel nonLinear activeStep={this.state.activeStep}>
                    {getSteps(this.state.currentSelectedFamilyMember).map((label, index) => {
                        const stepProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepButton
                                    onClick={this.handleStep(index)} completed={this.state.completed[index]}>
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
            <div>

                <div className="Left">
                    <p style={{margin: '3px', marginTop: '15px', marginLeft: '20px'}}>Geben Sie hier bitte alle Ihre Blutverwandte ein.</p>
                    <div className="addFamilyMembersButtons"
                         style={(this.state.hideTutorial === false && this.state.tutorialStep === 1) ? {
                             boxShadow: "0 0 0 1600px rgba(0,0,0,0.87)",
                             position: "relative",
                             zIndex: 200
                         } : {zIndex: "-100"}}>
                        <Button id="addSister" variant="outlined" color="primary"
                                onClick={() => this.popUpFamilyMember('addSister')} style={{margin: '3px'}}>Schwester
                            Hinzufügen</Button>
                        <Button id="addBrother" variant="outlined" color="primary"
                                onClick={() => this.popUpFamilyMember('addBrother')} style={{margin: '3px'}}>Bruder
                            Hinzufügen</Button>
                        <Button id="addSpouse" variant="outlined" color="primary"
                                onClick={() => this.popUpFamilyMember('addSpouse')} style={{margin: '3px'}}>
                            {(localStorage.get('me_gender') !== null && localStorage.get('me_gender') === 'male') ? 'Partnerin hinzufügen' : 'Partner hinzufügen'}
                        </Button>
                        <Button id="addDaughter" variant="outlined" color="primary"
                                onClick={() => this.popUpFamilyMember('addDaughter')} style={{margin: '3px'}}>Tochter
                            Hinzufügen</Button>
                        <Button id="addSon" variant="outlined" color="primary"
                                onClick={() => this.popUpFamilyMember('addSon')} style={{margin: '3px'}}>Sohn
                            Hinzufügen</Button>
                    </div>

                    <div className="BigFamilyTreeContainer"
                         style={(this.state.hideTutorial === false && this.state.tutorialStep === 0) ? {
                             boxShadow: "0 0 0 1600px rgba(0,0,0,0.87)",
                             position: "relative",
                             zIndex: 200
                         } : {zIndex: "-100"}}>
                        <div className="FamilyTreeDiv"
                             style={(this.state.hideTutorial === false && this.state.tutorialStep === 0) ? {
                                 boxShadow: "0 0 0 1600px rgba(0,0,0,0.87)",
                                 position: "relative",
                                 zIndex: 200
                             } : {zIndex: "-100"}}>

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
                                        deleteFunction={this.handleDeleteFamilyMemberPopup}
                                        editFunction={this.editFamilyMember}
                                        style={{
                                            width: WIDTH * RESIZE,
                                            height: HEIGHT * RESIZE,
                                            transform: `translate(${node.left * (WIDTH / 2)}px, ${node.top * (HEIGHT / 2)}px)`,
                                            padding: `${WIDTH * ((1 - RESIZE) / 2)}px`,
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>

                <div className="Right">
                    <p style={{margin: '3px', marginTop: '15px'}}>Andere Personen</p>
                    <div className="addOtherFamilyMembersButtons"
                         style={(this.state.hideTutorial === false && this.state.tutorialStep === 2) ? {
                             boxShadow: "0 0 0 1600px rgba(0,0,0,0.87)",
                             position: "relative",
                             zIndex: 200
                         } : {zIndex: "-100"}}>
                        <Button id="addOther" variant="outlined" color="primary" style={{margin: '3px'}}
                                onClick={() => this.popUpFamilyMember('addOther')}>Andere Hinzufügen</Button>
                    </div>

                    <div className="OtherFamilyDiv" hidden={familyHelpers.getHighestIndexOfOtherFM() === 0}>
                        <div className="OtherFamilyMemberPortraitDiv">
                            {familyHelpers.getOtherFamilyData().map(option => (
                                <OtherFamilyMemberNode
                                    node={option}
                                    deleteFunction={this.handleDeleteFamilyMemberPopup}
                                    editFunction={this.editFamilyMember}
                                    style={{
                                        width: WIDTH * RESIZE,
                                        height: HEIGHT * RESIZE,
                                        marginRight: '18px',
                                        marginBottom: '25px',
                                    }}/>
                            ))}
                        </div>
                    </div>
                </div>

                <div>{this.showPopup()}</div>
                <div>{this.showPopupCancelAlert()}</div>
                <div>{this.showPopupDeleteFamilyMemberAlert()}</div>
                <div>{this.showPopupAbschliessen()}</div>

                <div className="AbschliessenButton"
                     style={(this.state.hideTutorial === false && this.state.tutorialStep === 3) ? {
                         boxShadow: "0 0 0 1600px rgba(0,0,0,0.87)",
                         zIndex: 200
                     } : {zIndex: "-100"}}>
                    <Button id="Abbschliessen" variant="outlined" color="Primary"
                            onClick={this.handleAbschliesseAlert}> Abschliessen</Button>
                </div>

                <div hidden={this.state.hideTutorial === false}
                     style={{position: "absolute", bottom: "2px", right: "2px"}}>Icons made by <a
                    href="https://www.flaticon.com/authors/freepik"
                    title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"
                                                        title="Flaticon">www.flaticon.com</a></div>

                <div className="HilfeButton">
                    <Button id="Hilfe" variant="outlined" onClick={this.showTutorial}
                            color={this.state.hideTutorial === true ? "Primary" : ""}
                            style={this.state.hideTutorial === true ? {margin: '3px'} : {
                                color: 'white',
                                borderColor: 'white',
                                margin: '3px'
                            }}>{this.state.hideTutorial === true ? 'Hilfe' : 'Schliessen'}</Button>
                </div>
                <div className="Tutorial" hidden={this.state.hideTutorial}>
                    <div hidden={this.state.hideTutorial === false && this.state.tutorialStep !== 0}
                         className="TutorialText">
                        <h1>Stammbaum</h1>
                        <li>Hier sehen sie alle Familienmitglieder, welche Sie bereits hinzugefügt haben.</li>
                        <li>Die Verwandschaftsverhältnisse sind über Linien dargestellt.</li>
                        <li>Ziel ist es ein möglichst genaues Bild Ihrere Blutsverwandten zu erhalten</li>
                        <li>Mit den blauen Buttons neben den Portraits können Familienmitglieder bearbeitet oder
                            gelöscht werden
                        </li>
                    </div>

                    <div hidden={this.state.hideTutorial === false && this.state.tutorialStep !== 1}
                         className="TutorialText">
                        <h1>Hinzufügen</h1>
                        <li>Mit diesen Buttons können Sie dem Stambaum weitere Familienmitglieder hinzufügen.</li>
                        <li>Es ist immer von Ihnen auszugehen.</li>
                    </div>

                    <div hidden={this.state.hideTutorial === false && this.state.tutorialStep !== 2}
                         className="TutorialText">
                        <h1>Andere Familienmitglieder</h1>
                        <li>Familienmitglieder, welche Sie nicht mit den vorherigen Knöpfen hinzufügen können, könne Sie
                            mit deime Knopf hinzufügen.
                        </li>
                        <li>Diese Familienmitgleider werden nicht im Stammbaum angezeigt, sondern direkt unterhalb
                            dieses Knopfes.
                        </li>
                    </div>

                    <div hidden={this.state.hideTutorial === false && this.state.tutorialStep !== 3}
                         className="TutorialText">
                        <h1>Abschliessen</h1>
                        <li>Mit diesem Buttons können Sie, sobald sie Fertig sind, die Eingabe abschliessen</li>
                    </div>

                    <div className="TutorialButtons">
                        <Button id="TutorialZurück" variant="outlined"
                                style={{color: 'white', borderColor: 'white', margin: '3px'}}
                                onClick={this.previousTutorialStep}
                        >Zurück</Button>
                        <Button id="TutorialWeiter" variant="outlined"
                                style={{color: 'white', borderColor: 'white', margin: '3px'}}
                                onClick={this.nextTutorialStep}
                        >Weiter</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default FamilyTree;