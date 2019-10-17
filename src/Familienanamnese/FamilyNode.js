import React from 'react';
import classNames from 'classnames';
import styles from './FamilyNode.module.css';

function FamilyNode({node, isRoot, onSubClick, style}) {

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
            >{getName(node)}</div>
        </div>
    );
}

export default FamilyNode;
