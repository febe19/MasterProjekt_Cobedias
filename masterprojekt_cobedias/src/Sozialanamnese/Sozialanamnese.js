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

function getSteps() {
    return ["Berufstätigkeiten", "Hobbies", "Militärdienst", "Wohnsituation", "Zivilstand", "Bemerkungen", "Abschliessen"];
}

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
    const steps = getSteps();

    const handleNext = () => {
        const newActiveStep = activeStep + 1;

        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleStep = step => () => {
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
                    const buttonProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepButton
                                onClick={handleStep(index)}
                                {...buttonProps}
                            >
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