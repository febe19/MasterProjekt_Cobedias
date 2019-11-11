import React from 'react';
import classNames from 'classnames';
import styles from './FamilyNode.module.css';
import "typeface-roboto";
import localStorage from 'local-storage'

import girlAvatar from '../images/001-girl.svg'
import girlAvatarBW from '../images/001-girl-BW.svg'
import boyAvatar from '../images/049-boy.svg'
import boyAvatarBW from '../images/049-boy-BW.svg'
import womanAvatar from '../images/003-woman.svg'
import womanAvatarBW from '../images/003-woman-BW.svg'
import womanSisterAvatar from '../images/003-woman-sister.svg'
import womanSpouseAvatar from '../images/003-woman-spouse.svg'
import manAvatar from '../images/028-man.svg'
import manAvatarBW from '../images/028-man-BW.svg'
import manBrotherAvatar from '../images/028-man-brother.svg'
import manSpouseAvatar from '../images/028-man-spouse.svg'
import grandmotherAvatar from '../images/047-grandmother.svg'
import grandmotherAvatarBW from '../images/047-grandmother-BW.svg'
import grandfatherAvatar from '../images/002-grandfather.svg'
import grandfatherAvatarBW from '../images/002-grandfather-BW.svg'
import WarningSign from '../images/Warning_Sign.svg'
import BloodDrop from '../images/blood.svg'


import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import {
    createMuiTheme,
    MuiThemeProvider,
} from "@material-ui/core/styles";


const theme = createMuiTheme({
    overrides: {
        MuiTooltip: {
            tooltip: {
                fontSize: "20px",
                color: "white",
                //backgroundColor: "#A9A9A9",
                backgroundColor: "rgba(99, 90, 121, 0.9)",
                maxWidth: '1000px'
            }
        }
    }
});


function OtherFamilyMemberNode({node, deleteFunction, editFunction, style}) {

    // returns the name which should be displayed for a specific family member
    function getName(node) {
        if (node.id === 'myFather' && node.spitzname === '') {
            return 'Vater bearbeiten'
        } else if (node.id === 'myMother' && node.spitzname === '') {
            return 'Mutter bearbeiten'
        } else if (node.spitzname && node.spitzname !== '') {
            return node.spitzname
        } else if (node.vorname && node.vorname !== '') {
            return node.vorname;
        } else if (node.id === 'me') {
            return localStorage.get("Vorname");
        } else {
            return node.id;
        }
    }

    function showAlert(node) {
        if (node.vorname === null || node.vorname === '' || node.spitzname === null || node.spitzname === '' || node.geburtsjahr === 0 || node.geburtsjahr === '' || node.verstorben === '' || node.verstorben === null) {
            return WarningSign;
        } else if (node.verstorben === true && (node.todesjahr === 0 || node.todesursache === '' || node.todesursache === null)) {
            return WarningSign;
        } else if (node.verstorben === false && (node.gesundheitszustand === null || node.gesundheitszustand === '')) {
            return WarningSign;
        } else if (node.verwandtschaftsgrad === null || node.verwandtschaftsgrad === '') {
            return WarningSign;
        } else if (node.gender === '') {
            return WarningSign;
        }
    }

    function getAvatar(node) {
        if (node.gender === 'female') {
            if (node.verstorben === true) {
                return womanAvatarBW;
            } else if (node.blutsverwandt === true) {
                return womanSisterAvatar;
            } else {
                return womanSpouseAvatar;
            }
        } else {
            if (node.verstorben === true) {
                return manAvatarBW;
            } else if (node.blutsverwandt === true) {
                return manBrotherAvatar;
            } else {
                return manSpouseAvatar;
            }
        }
    }


    // this function makes sure that the icon AND the Tooltip is only displayed if it should
    function getIconAlert(node) {
        if (showAlert(node)) {
            return (
                <MuiThemeProvider theme={theme}>
                    <Tooltip TransitionComponent={Zoom} title="Es gibt nicht ausgefüllte Felder." placement="left">
                        <img className={styles.warningSignOtherFamilyMember} src={showAlert(node)}/>
                    </Tooltip>
                </MuiThemeProvider>
            )
        }
    }

    // this function makes sure that the icon AND the Tooltip is only displayed if it should
    function getIconBlutsverwandt(node) {
        if (!(node.blutsverwandt === false)) {
            return (
                <MuiThemeProvider theme={theme}>
                    <Tooltip TransitionComponent={Zoom} title="Dieser Familienmitglieder ist blutsverwandt."
                             placement="left">
                        <img className={styles.bloodDropOtherFamilyMember} hidden={node.blutsverwandt === false}
                             src={BloodDrop}/>
                    </Tooltip>
                </MuiThemeProvider>
            )
        }
    }


    return (
        <div className={styles.rootOtherFamilyMember} style={style}>
            <div
                className={styles.oneOtherFamilyMemberDiv}>
                {getIconBlutsverwandt(node)}
                <img style={{maxWidth: '91px'}} src={getAvatar(node)}/>
                {getIconAlert(node)}
            </div>
            <div className={styles.OtherFamilyMemberName}>{getName(node)}</div>
            <div hidden={false}>
                <Fab color="primary" aria-label="edit"
                     onClick={() => deleteFunction(node.id)}
                     style={{
                         margin: '0 auto',
                         height: '20px',
                         width: '20px',
                         borderRadius: '100px',
                         position: 'absolute',
                         top: '2%',
                         right: '-20%'
                     }}>
                    <DeleteIcon style={{
                        margin: '0 auto',
                        height: '15px',
                        width: '15px',
                    }}/>
                </Fab>
            </div>
            <div hidden={false}>
                <Fab color="primary" aria-label="edit"
                     onClick={() => editFunction(node.id)}
                     style={{
                         margin: '0 auto',
                         height: '20px',
                         width: '20px',
                         borderRadius: '100px',
                         position: 'absolute',
                         bottom: '2%',
                         right: '-20%',
                     }}>
                    <EditIcon style={{
                        margin: '0 auto',
                        height: '15px',
                        width: '15px',
                    }}/>
                </Fab>
            </div>
        </div>
    );
}

export default OtherFamilyMemberNode;
