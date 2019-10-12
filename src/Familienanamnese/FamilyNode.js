import React from 'react';
import classNames from 'classnames';
import {IFamilyExtNode} from 'relatives-tree';
import styles from './FamilyNode.module.css';

interface Props {
    node: IFamilyExtNode;
    isRoot: boolean;
    onSubClick: (id: string) => void;
    style?: React.CSSProperties;
}


function FamilyNode({node, isRoot, onSubClick, style}) {
    return (
        <div className={styles.root} style={style}>
            <div
                className={classNames(
                    styles.inner,
                    styles[node.gender],
                    isRoot && styles.isRoot,
                )}
            >{node.name}</div>
        </div>
    );
}

export default FamilyNode;
