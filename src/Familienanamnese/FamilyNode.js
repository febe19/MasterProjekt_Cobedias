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

function FamilyNode({node, isRoot, deleteFunction, editFunction, style}) {

    // returns the name which should be displayed for a specific family member
    function getName(node) {
        if (node.spitzname && node.spitzname !== '') {
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
        if (node.vorname === null || node.vorname === '' || node.spitzname === null || node.spitzname === '' || node.geburtsjahr === 0 || node.geburtsjahr === '' || node.verstorben === '' || node.verstorben === null || node.nachname === '' || node.nachname === null) {
            return WarningSign;
        } else if (node.verstorben === true && (node.todesjahr === 0 || node.todesursache === '' || node.todesursache === null)) {
            return WarningSign;
        } else if (node.verstorben === false && (node.gesundheitszustand === null || node.gesundheitszustand === '')) {
            return WarningSign;
        }
    }

    function getAvatar(node) {
        if (node.id === 'me') {
            if (node.gender === 'female') {
                return womanAvatar;
            } else {
                return manAvatar;
            }
        } else if (node.id === 'myMother') {
            if (node.verstorben === true) {
                return grandmotherAvatarBW;
            } else {
                return grandmotherAvatar;
            }
        } else if (node.id === 'myFather') {
            if (node.verstorben === true) {
                return grandfatherAvatarBW;
            } else {
                return grandfatherAvatar;
            }
        } else if (node.id.substring(0, 6) === 'spouse') {
            if (node.gender === 'female') {
                if (node.verstorben === true) {
                    return womanAvatarBW;
                } else {
                    return womanSpouseAvatar;
                }
            } else {
                if (node.verstorben === true) {
                    return manAvatarBW;
                } else {
                    return manSpouseAvatar;
                }
            }
        } else if (node.id.substring(0, 7) === 'sibling') {
            if (node.gender === 'female') {
                if (node.verstorben === true) {
                    return womanAvatarBW;
                } else {
                    return womanSisterAvatar;
                }
            } else {
                if (node.verstorben === true) {
                    return manAvatarBW;
                } else {
                    return manBrotherAvatar;
                }
            }
        } else {
            if (node.gender === 'female') {
                if (node.verstorben === true) {
                    return girlAvatarBW;
                } else {
                    return girlAvatar;
                }
            } else {
                if (node.verstorben === true) {
                    return boyAvatarBW;
                } else {
                    return boyAvatar;
                }
            }
        }
    }

    function hideDelete(nodeID) {
        if (nodeID === 'me' || nodeID === 'myFather' || nodeID === 'myMother') {
            return true;
        } else {
            return false;
        }
    }

    function hideEdit(nodeID) {
        if (nodeID === 'me') {
            return true;
        } else {
            return false;
        }
    }

    function getBlutsverwandtIcon(node) {
        console.log("Is node " + node.id + " blutsverwandt " + node.blutsverwandt);
        return BloodDrop;
    }

    return (
        <div className={styles.root} style={style}>
            <div
                className={classNames(
                    styles.oneFamilyMemberDiv,
                    isRoot && styles.isRoot,
                )}>
                <img className={styles.bloodDrop} hidden={node.blutsverwandt === false}
                     src={getBlutsverwandtIcon(node)}/>
                <img style={{maxWidth: '91px'}} src={getAvatar(node)}/>
                <img className={styles.warningSign} src={showAlert(node)}/>
            </div>
            <div className={styles.FamilyMemberName}>{getName(node)}</div>
            <div hidden={hideDelete(node.id)}>
                <Fab color="primary" aria-label="edit"
                     onClick={() => deleteFunction(node.id)}
                     style={{
                         margin: '0 auto',
                         height: '20px',
                         width: '20px',
                         borderRadius: '100px',
                         position: 'absolute',
                         top: '15%',
                         right: '1%'
                     }}>
                    <DeleteIcon style={{
                        margin: '0 auto',
                        height: '15px',
                        width: '15px',
                    }}/>
                </Fab>
            </div>
            <div hidden={hideEdit(node.id)}>
                <Fab color="primary" aria-label="edit"
                     onClick={() => editFunction(node.id)}
                     style={{
                         margin: '0 auto',
                         height: '20px',
                         width: '20px',
                         borderRadius: '100px',
                         position: 'absolute',
                         bottom: '15%',
                         right: '1%',
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

export default FamilyNode;
