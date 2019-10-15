import React, {Component, useState} from 'react';
import {IFamilyExtNode} from 'relatives-tree';
import ReactFamilyTree from 'react-family-tree';
import FamilyNode from './FamilyNode';
import styles from './FamilyTree.module.css';
import Button from "@material-ui/core/Button";

import familyHelpers from "./FamilyData.js";

//My ID is always 0.
const myID = 'me';

const WIDTH = 100;
const HEIGHT = 100;

function familyTreeWorker() {

    familyHelpers.updateFamilyMemberByID = familyHelpers.updateFamilyMemberByID.bind(this);

    //Write Data to Local Storage
    //localStorage.set('myFamilyData', familyHelpers.getFamilyData());

    //Get number of Family Members
    familyHelpers.getNumberFamilyMember();

    //Adding of other family members with check if they already exist.
//    familyHelpers.addFamilyMember("myMother", "female", [], [], [],[]);

    //Get ID of the last family member
//    let data = familyHelpers.getLastFamilyMember();
//    console.log("ID of last added Family Member: " + data.id);

    //Get a Family Member by its ID.
//    console.log("Get FamilyMemberByID: "+ JSON.stringify(familyHelpers.getFamilyMemberByID("myMother")));

    //Update a Family Member
    let me = familyHelpers.getFamilyMemberByID("me");
    //familyHelpers.updateFamilyMemberByID("me", "female", [], me.siblings, me.spouses, me.children);
    //console.log("Family Data " + JSON.stringify(familyHelpers.getFamilyData()));

    //add sister1 for example
    //familyHelpers.addFamilyMember("sister1", "female", me.parents, me.siblings, [], []);
    familyHelpers.addFamilyMember("brother1", "male", me.parents, me.siblings, [], []);

    familyHelpers.getLastFamilyMember();


    //localStorage.set('myFamilyData', familyHelpers.getFamilyData());

}


class FamilyTree extends Component {

    constructor(props) {
        super(props);

        //Define the state of this component.
        this.state = {
            FamilyDataState: familyHelpers.getFamilyData()
        };

        console.log("Starting Family Data: " + JSON.stringify(familyHelpers.getFamilyData()));
    }

    meAsSibling = [
        {
            "id": "me",
            "type": "blood"
        }
    ];

    addSibling = (e) => {
        let me = familyHelpers.getFamilyMemberByID("me");
        if (e === 'addSister') {
            console.log("New Sister will be added");
            familyHelpers.addFamilyMember("sibling" + familyHelpers.getHighestIndexOfSiblings(), "female", me.parents, me.siblings, [], []);
        } else {
            console.log("New Brother will be added");
            familyHelpers.addFamilyMember("sibling" + familyHelpers.getHighestIndexOfSiblings(), "male", me.parents, me.siblings, [], []);
        }

        this.setState(
            {FamilyDataState: familyHelpers.getFamilyData()}
        )
    };


    render() {
        return (
            <div>
                <div>
                    <ReactFamilyTree
                        nodes={this.state.FamilyDataState}
                        rootId={myID}
                        width={WIDTH}
                        height={HEIGHT}
                        canvasClassName={styles.tree}
                        renderNode={(node: IFamilyExtNode) => (
                            <FamilyNode
                                key={node.id}
                                node={node}
                                isRoot={node.id === myID}
                                style={{
                                    width: WIDTH * 0.8,
                                    height: HEIGHT * 0.8,
                                    transform: `translate(${node.left * (WIDTH / 2)}px, ${node.top * (HEIGHT / 2)}px)`,
                                }}
                            />
                        )}
                    />
                </div>
                <Button id="addSister" onClick={() => this.addSibling('addSister')}>Add Sister</Button>
                <Button id="addBrother" onClick={() => this.addSibling('addBrother')}>Add Brother</Button>
            </div>
        );
    }
}

export default FamilyTree;