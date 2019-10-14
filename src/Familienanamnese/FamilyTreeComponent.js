import React, {useState} from 'react';
import {IFamilyExtNode} from 'relatives-tree';
import ReactFamilyTree from 'react-family-tree';
import FamilyNode from './FamilyNode';
import styles from './FamilyTree.module.css';
import Button from "@material-ui/core/Button";

import localStorage from "local-storage";
import familyHelpers from "./FamilyData.js";

//My ID is always 0.
const myID = 'me';

const WIDTH = 100;
const HEIGHT = 100;

function FamilyTree() {
    const [rootId] = useState(myID);

    //Write Data to Local Storage
    localStorage.set('myFamilyData', familyHelpers.getFamilyData());

    //Get number of Family Members
    familyHelpers.getNumberFamilyMember();

    //Adding of other family members
    familyHelpers.addFamilyMember("mother", "female", [], [], [],[]);

    //Get ID of the last family member
    let data = familyHelpers.getLastFamilyMember();
    console.log("ID of last added Family Member: " + data.id);
    familyHelpers.updateMyFamilyMember("me", "female", [], [], [], []);
    console.log("Family Data " + JSON.stringify(familyHelpers.getFamilyData()));


    localStorage.set('myFamilyData', familyHelpers.getFamilyData());

    return (
        <div>
            <div>
                <ReactFamilyTree
                    nodes={familyHelpers.getFamilyData()}
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
        </div>
    );
}

export default FamilyTree;