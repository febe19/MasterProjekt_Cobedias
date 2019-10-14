import React, {useState} from 'react';
import {IFamilyNode, IFamilyExtNode} from 'relatives-tree';
import ReactFamilyTree from 'react-family-tree';
import FamilyNode from './FamilyNode';
import styles from './FamilyTree.module.css';

import nodes from './FamilyData';

const myID = '0';

const WIDTH = 100;
const HEIGHT = 100;


function FamilyTree() {
    const [rootId] = useState(myID);

    return (
        <div>
            <ReactFamilyTree
                nodes={(nodes: IFamilyNode)}
                rootId={rootId}
                width={WIDTH}
                height={HEIGHT}
                canvasClassName={styles.tree}
                renderNode={(node: IFamilyExtNode) => (
                    <FamilyNode
                        key={node.id}
                        node={node}
                        isRoot={node.id === rootId}
                        style={{
                            width: WIDTH * 0.8,
                            height: HEIGHT * 0.8,
                            transform: `translate(${node.left * (WIDTH / 2)}px, ${node.top * (HEIGHT / 2)}px)`,
                        }}
                    />
                )}
            />
        </div>
    );
}

export default FamilyTree;