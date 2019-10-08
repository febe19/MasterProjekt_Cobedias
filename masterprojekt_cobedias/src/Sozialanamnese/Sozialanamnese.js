import React from "react";
import {Route} from "react-router-dom";
import Erklaerung from "./Erklaerung";
import Berufstaetigkeit from ".././Sozialanamnese/Berufstaetigkeit";
import Hobbies from "../Sozialanamnese/Hobbies";
import Militaerdienst from "./Militaerdienst";
import Wohnsituation from "./Wohnsituation";
import Zivilstand from "./Zivilstand";
import Bemerkungen from "./Bemerkungen";

import {makeStyles} from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import localStorage from "local-storage";


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
    return ["Berufstätigkeiten", "Hobbies", "Militärdienst", "Wohnsituation", "Zivilstand", "Bemerkungen", "Abschliessen"];
}

// prüft ob ein spezifischer Component "complete" ist
function componentCompleted(step) {
    switch (step) {
        case 0:
            console.log("case 0 " + localStorage.get('BerufstaetigkeitKomplett'));
            return localStorage.get('BerufstaetigkeitKomplett');
        case 1:
            return <Route component={Hobbies}/>;
        case 2:
            return <Route component={Militaerdienst}/>;
        case 3:
            return <Route component={Wohnsituation}/>;
        case 4:
            return <Route component={Zivilstand}/>;
        case 5:
            return <Route component={Bemerkungen}/>;
        case 6:
            return <Route component={Erklaerung}/>; //TODO: Hier noch den Component anpassen.
        default:
            console.log("case default")
            return false;
    }
}

// zeigt Component des jeweiligen Stepps und ermöglicht so navigation zu einem spezifischen Stepp
function getStepContent(step) {
    switch (step) {
        case 0:
            return <Route component={Berufstaetigkeit}/>;
        case 1:
            return <Route component={Hobbies}/>;
        case 2:
            return <Route component={Militaerdienst}/>;
        case 3:
            return <Route component={Wohnsituation}/>;
        case 4:
            return <Route component={Zivilstand}/>;
        case 5:
            return <Route component={Bemerkungen}/>;
        case 6:
            return <Route component={Erklaerung}/>; //TODO: Hier noch den Component anpassen.
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
            alert("Nicht alle Felder ausgefüllt!");
        }
    }

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
                <h1>Cobedias 2.0 - Sozialanamnese</h1>
            </div>

            <Stepper alternativeLabel nonLinear activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepButton
                                onClick={handleStep(index)} completed={completed[index]}>
                                {label}
                            </StepButton>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                <div>
                    <Typography className={classes.instructions}>
                        {getStepContent(activeStep)}
                    </Typography>
                    <div>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.button}
                        >
                            Zurück
                        </Button>
                        <Button
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
    );
}