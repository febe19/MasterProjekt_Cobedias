import React from "react";
import Berufstaetigkeit from ".././Sozialanamnese/Berufstaetigkeit";
import Hobbies from "../Sozialanamnese/Hobbies";
import Militaerdienst from "./Militaerdienst";
import Wohnsituation from "./Wohnsituation";
import Zivilstand from "./Zivilstand";
import Bemerkungen from "./Bemerkungen";
import Absenden from "./Absenden";

import {makeStyles} from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import localStorage from "local-storage";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles(theme => ({
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
function getSteps() {
    return ["Berufstätigkeit", "Hobbies", "Militärdienst", "Wohnsituation", "Bezugspersonen", "Bemerkungen", "Abschliessen"];
}

// prüft ob ein spezifischer Component "complete" ist
function componentCompleted(step) {
    switch (step) {
        case 0:
            console.log("-  " + new Date().toLocaleTimeString() + " _Berufstätigkeiten_ Fertig");
            return localStorage.get('BerufstaetigkeitKomplett');
        case 1:
            console.log("-  " + new Date().toLocaleTimeString() + " _Hobbies_ Fertig");
            return localStorage.get('HobbiesKomplett');
        case 2:
            console.log("-  " + new Date().toLocaleTimeString() + " _Militaerdienst_ Fertig");
            return localStorage.get('MilitaerdienstKomplett');
        case 3:
            console.log("-  " + new Date().toLocaleTimeString() + " _Wohnsituation_ Fertig");
            return localStorage.get('WohnsituationKomplett');
        case 4:
            console.log("-  " + new Date().toLocaleTimeString() + " _Zivilstand_ Fertig");
            return localStorage.get('ZivilstandKomplett');
        case 5:
            console.log("-  " + new Date().toLocaleTimeString() + " _Bemerkungen_ Fertig");
            return localStorage.get('BemerkungenKomplett');
        case 6:
            console.log("-  " + new Date().toLocaleTimeString() + " _Absenden_ Fertig");
            return localStorage.get('AbsendenKomplett');
        default:
            console.log("case default");
            return false;
    }
}

// zeigt Component des jeweiligen Stepps und ermöglicht so navigation zu einem spezifischen Stepp
function getStepContent(step) {
    switch (step) {
        case 0:
            console.log("-  " + new Date().toLocaleTimeString() + " _Berufstätigkeiten_ Anfangen");
            return <Berufstaetigkeit/>;
        case 1:
            console.log("-  " + new Date().toLocaleTimeString() + " _Hobbies_ Anfangen");
            return <Hobbies/>;
        case 2:
            console.log("-  " + new Date().toLocaleTimeString() + " _Militaerdienst_ Anfangen");
            return <Militaerdienst/>;
        case 3:
            console.log("-  " + new Date().toLocaleTimeString() + " _Wohnsituation_ Anfangen");
            return <Wohnsituation/>;
        case 4:
            console.log("-  " + new Date().toLocaleTimeString() + " _Zivilstand_ Anfangen");
            return <Zivilstand/>;
        case 5:
            console.log("-  " + new Date().toLocaleTimeString() + " _Bemerkungen_ Anfangen");
            return <Bemerkungen/>;
        case 6:
            console.log("-  " + new Date().toLocaleTimeString() + " _Absenden_ Anfangen");
            return <Absenden/>;
        default:
            return "Unknown step";
    }
}

export default function HorizontalNonLinearAlternativeLabelStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const steps = getSteps();

    // prüft, ob alle Felder in diesem Step ausgefüllt sind
    function updateStepCompleteness(step) {
        // alle ausgefüllt --> Häckchen wird gesetzt
        if (componentCompleted(step) === true) {
            const newCompleted = completed;
            newCompleted[step] = true;
            setCompleted(newCompleted);
        } else {
            // Nicht alle ausgefüllt --> Häckchen wird entfernt
            const newCompleted = completed;
            newCompleted[step] = false;
            setCompleted(newCompleted);
            //alert("Nicht alle Felder ausgefüllt!");
        }
    }

    //Anzahl Steps
    const totalSteps = () => {
        return getSteps().length;
    };

    // "Weiter" Button
    const handleNext = () => {
        updateStepCompleteness(activeStep);
        const newActiveStep = activeStep + 1;
        setActiveStep(newActiveStep);
    };

    // "Zurück" Button
    const handleBack = () => {
        updateStepCompleteness(activeStep);
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    // Direkter Sprung zu einem Stepp in oberer Leiste (Stepp Button)
    const handleStep = step => () => {
        updateStepCompleteness(activeStep);
        setActiveStep(step);
    };


    return (
        <div className={classes.root}>

            <div className="Titel">
                <h1 style={{display: 'inline-block'}}>Cobedias 2.0 - Sozialanamnese</h1>

                <NavLink exact to="/Home" style={{"text-decoration": "none"}}>
                    <Button variant="outlined" style={{
                        float: 'right',
                        marginRight: '5%',
                        color: 'white',
                        borderColor: 'white'
                    }}>Home</Button>
                </NavLink>

                <NavLink exact to="/Familienanamnese" style={{"text-decoration": "none"}}>
                    <Button variant="outlined" style={{
                        float: 'right',
                        marginRight: '1%',
                        color: 'white',
                        borderColor: 'white'
                    }}>Familienanamnese</Button>
                </NavLink>

            </div>
            <div className='ChangingContent'>
                <Stepper alternativeLabel nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepButton
                                    onClick={handleStep(index)} completed={completed[index]}
                                    style={(index === activeStep) ? {textDecoration: 'underline'} : {}}
                                >
                                    {label}
                                </StepButton>
                            </Step>
                        );
                    })}
                </Stepper>
                <div>
                    <div>
                        <div className="StepContent">
                            <Typography className={classes.instructions}>
                                {getStepContent(activeStep)}
                            </Typography>
                        </div>


                        <div className="SozialanamneseNavigationsButton">
                            <div>
                                <Button
                                    size="large"
                                    variant="outlined"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.button}
                                >
                                    Zurück
                                </Button>
                                <Button
                                    disabled={activeStep === (totalSteps() - 1)}
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                >
                                    Weiter
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}