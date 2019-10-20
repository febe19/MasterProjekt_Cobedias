import React from 'react';
import classNames from 'classnames';
import styles from './FamilyNode.module.css';

import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import familyHelpers from "./FamilyData";

function FamilyNode({node, isRoot, func, style}) {

    // returns the name which should be displayed for a specific family member
    function getName(node) {
        if (node.spitzname && node.spitzname !== '') {
            return node.spitzname
        } else if (node.vorname && node.vorname !== '') {
            return node.vorname;
        } else {
            return node.id;
        }
    }

    return (
        <div className={styles.root} style={style}>
            <div
                className={classNames(
                    styles.inner,
                    styles[node.gender],
                    isRoot && styles.isRoot,
                )}
            >{getName(node)}
            </div>
            <Fab color="primary" aria-label="edit"
                 onClick={() => func(node.id)}
                 style={{
                     margin: '0 auto',
                     height: '20px',
                     width: '20px',
                     borderRadius: '100px',
                     position: 'absolute',
                     top: '0%',
                     right: '3%'
                 }}>
                <DeleteIcon style={{
                    margin: '0 auto',
                    height: '15px',
                    width: '15px',
                }}/>
            </Fab>
            <Fab color="primary" aria-label="edit"
                 onClick={familyHelpers.deleteFamilyMember}
                 style={{
                     margin: '0 auto',
                     height: '20px',
                     width: '20px',
                     borderRadius: '100px',
                     position: 'absolute',
                     bottom: '0%',
                     right: '3%'

                 }}>
                <EditIcon style={{
                    margin: '0 auto',
                    height: '15px',
                    width: '15px',
                }}/>
            </Fab>
        </div>
    );
}

export default FamilyNode;
