import React from 'react';
import classNames from 'classnames';
import styles from './FamilyNode.module.css';


function FamilyNode({node, isRoot, onSubClick, style}) {
    return (
        <div className={styles.root} style={style}>
            <div
                className={classNames(
                    styles.inner,
                    styles[node.gender],
                    isRoot && styles.isRoot,
                )}
            >{node.id}</div>
        </div>
    );
}

export default FamilyNode;
