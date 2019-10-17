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

class FamilyTree extends Component {

    constructor(props) {
        super(props);

        //Define the state of this component.
        this.state = {
            FamilyDataState: familyHelpers.getFamilyData()
        };

        //Only for test reasons how it looks when starting with a female me.
        //let me = familyHelpers.getFamilyMemberByID("me");
        //familyHelpers.updateFamilyMemberByID(me.id, "female", me.parents, me.siblings, [], [])

        console.log("Starting Family Data: \n" + JSON.stringify(familyHelpers.getFamilyData()));
    }

    addSibling = (e) => {
        let me = familyHelpers.getFamilyMemberByID("me");

        //Take me as Sibling
        let siblings = [
            {
                "id": "me",
                "type": "blood"
            },
        ];

        //Add other siblings I have
        for (let i = 0; i < me.siblings.length; i++) {
            siblings.push(me.siblings[i]);
        }

        //Change between add sister or add brother.
        if (e === 'addSister') {
            familyHelpers.addFamilyMember("sibling" + familyHelpers.getHighestIndexOfSiblings(), "female", me.parents, siblings, [], []);
        } else {
            familyHelpers.addFamilyMember("sibling" + familyHelpers.getHighestIndexOfSiblings(), "male", me.parents, siblings, [], []);
        }

        this.setState(
            {FamilyDataState: familyHelpers.getFamilyData()}
        )
    };

    addSpouse = (e) => {
        let me = familyHelpers.getFamilyMemberByID("me");

        if (me.gender === 'female') {
            familyHelpers.addFamilyMember("spouse" + familyHelpers.getHighestIndexOfSpouse(), "male", [], [], [{
                "id": "me",
                "type": "married"
            }], me.children);
        } else {
            familyHelpers.addFamilyMember("spouse" + familyHelpers.getHighestIndexOfSpouse(), "female", [], [], [{
                "id": "me",
                "type": "married"
            }], me.children);
        }

        this.setState(
            {FamilyDataState: familyHelpers.getFamilyData()}
        )
    };

    addChildren = (e) => {
        let me = familyHelpers.getFamilyMemberByID("me");
        let meChildren = [];
        let meAsAParent = [
            {
                "id": "me",
                "type": "blood"
            }
        ];

        //TODO: Add a selection from which Spouse the child is and then push it to the meAsAParent Array.
        if (me.spouses.length === 1) {
            meAsAParent.push(me.spouses)
        }

        if (me.children !== [] && me.children.length !== 0) {
            for (let i = 0; i < me.children.length; i++) {
                meChildren.push(me.children[i]);
            }
        }

        if (e === 'addDaughter') {
            familyHelpers.addFamilyMember("child" + familyHelpers.getHighestIndexOfChildren(), "female", meAsAParent, meChildren, [], []);
        } else {
            familyHelpers.addFamilyMember("child" + familyHelpers.getHighestIndexOfChildren(), "male", meAsAParent, meChildren, [], []);
        }

        this.setState(
            {FamilyDataState: familyHelpers.getFamilyData()}
        )
    };

    //TODO: Write Family Data into local storeage such that a refresh will not loose all data.


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
                <Button id="addSpouse" onClick={() => this.addSpouse('addSpouse')}>Add Spouse</Button>
                <Button id="addDaughter" onClick={() => this.addChildren('addDaughter')}>Add Daughter</Button>
                <Button id="addSon" onClick={() => this.addChildren('addSon')}>Add Son</Button>
            </div>
        );
    }
}

export default FamilyTree;