//TODO: Get genderfor "me" from input form
const myFamilyData =
    [
        {
            "id": "me",
            "gender": "male",
            "parents": [
                {
                    "id": "myMother",
                    "type": "blood"
                },
                {
                    "id": "myFather",
                    "type": "blood"
                }
            ],
            "siblings": [],
            "spouses": [],
            "children": []
        },
        {
            "id": "myMother",
            "gender": "female",
            "parents": [],
            "siblings": [],
            "spouses": [
                {
                    "id": "myFather",
                    "type": "married"
                }
            ],
            "children": [
                {
                    "id": "me",
                    "type": "blood"
                }
            ]
        },
        {
            "id": "myFather",
            "gender": "male",
            "parents": [],
            "siblings": [],
            "spouses": [
                {
                    "id": "myMother",
                    "type": "married"
                }
            ],
            "children": [
                {
                    "id": "me",
                    "type": "blood"
                }
            ]
        }
    ]

const familyHelpers = {

    //Returns the FamilyData aka. "all family objects" --> Is used to draw the tree.
    getFamilyData: function () {
        return myFamilyData;
    },

    //Returns the number of family members
    getNumberFamilyMember: function () {
        console.log("__Return number Family member: " + myFamilyData.length);
        return myFamilyData.length;
    },

    //Get the ID of the last added family member
    getLastFamilyMember: function () {
        console.log("__Last Added Family Member: " + JSON.stringify(myFamilyData[myFamilyData.length - 1]));
        return myFamilyData[myFamilyData.length - 1];
    },

    //Get a family member by id.
    getFamilyMemberByID: function (id) {
        for (let i = 0; i <= myFamilyData.length - 1; i++) {
            //If ID is the same --> found.
            if (myFamilyData[i].id === id) {
                return myFamilyData[i];
            }
        }
        return false;
    },

    //This is a check if the family member already exists --> Prevention of adding the same member twice.
    checkExistingFamilyMember: function (id) {
        for (let i = 0; i <= myFamilyData.length - 1; i++) {
            if (myFamilyData[i].id === id) {
                console.log("__ Check Existing: myFamilyData[i].id: " + myFamilyData[i].id + " Already exists");
                return true;
            }
        }
        return false;
    },

    //This allows adding an all new family Member with check if they already exist
    addFamilyMember: function (id, gender, parents, siblings, spouses, children) {
        if (!this.checkExistingFamilyMember(id)) {
            myFamilyData.push(
                {
                    "id": id,
                    "gender": gender,
                    "parents": parents,
                    "siblings": siblings,
                    "spouses": spouses,
                    "children": children
                }
            );

            for (let i = 0; i <= parents.length - 1; i++) {
                let currentParent = this.getFamilyMemberByID(parents[i].id);
                console.log("__  Current Parent: " + JSON.stringify(this.getFamilyMemberByID(parents[i].id)));

                if (currentParent !== false) {
                    currentParent.children.push(
                        {
                            "id" : id,
                            "type": "blood"
                        }
                    )
                    this.updateFamilyMemberByID(currentParent.id, currentParent.gender, currentParent.parents, currentParent.siblings, currentParent.spouses, currentParent.children);
                }
            }

            for (let i = 0; i <= siblings.length - 1; i++) {
                let currentSibling = this.getFamilyMemberByID(siblings[i].id);
                console.log("__  Current Sibling: " + JSON.stringify(this.getFamilyMemberByID(siblings[i].id)));

                if (currentSibling !== false) {
                    currentSibling.siblings.push(
                        {
                            "id" : id,
                            "type": "blood"
                        }
                    )
                    this.updateFamilyMemberByID(currentSibling.id, currentSibling.gender, currentSibling.parents, currentSibling.siblings, currentSibling.spouses, currentSibling.children);
                }
            }

            console.log("__Added new member " + id + " to FamilyData: " + JSON.stringify(myFamilyData));
            return true;
        } else {
            console.log("__Family member " + id + " does already exist");
            return false;
        }
    },

    //Updating Family Members by ID
    updateFamilyMemberByID: function (id, gender, parents, siblings, spouses, children) {
        //Iterate over Family members
        for (let i = 0; i <= myFamilyData.length - 1; i++) {

            //If ID is the same --> found.
            if (myFamilyData[i].id === id) {

                //Update Gender
                if (gender !== "" && myFamilyData[i].gender !== gender) {
                    console.log("__  Update gender of " + myFamilyData[i].id + " from " + myFamilyData[i].gender + " to " + gender);
                    myFamilyData[i].gender = gender;
                }

                //Update parents
                if (parents.length !== 0 && myFamilyData[i].parents !== parents) {
                    console.log(parents);
                    console.log("__  Update Parents of " + myFamilyData[i].id + " from " + JSON.stringify(myFamilyData[i].parents) + " to " + JSON.stringify(parents));
                    myFamilyData[i].parents = parents;
                }

                //Update siblings
                if (siblings.length !== 0 && myFamilyData[i].siblings !== siblings) {
                    console.log("__  Update siblings of " + myFamilyData[i].id + " from " + JSON.stringify(myFamilyData[i].siblings) + " to " + JSON.stringify(siblings));
                    myFamilyData[i].siblings = siblings;
                }

                //Update spouse
                if (spouses.length !== 0 && myFamilyData[i].spouses !== spouses) {
                    console.log("__  Update spouse of " + myFamilyData[i].id + " from " + JSON.stringify(myFamilyData[i].spouses) + " to " + JSON.stringify(spouses));
                    myFamilyData[i].spouses = spouses;
                }

                //Update children
                if (children.length !== 0 && myFamilyData[i].children == children) {
                    console.log("__  Update children of " + myFamilyData[i].id + " from " + JSON.stringify(myFamilyData[i].children) + " to " + JSON.stringify(children));
                    myFamilyData[i].children = children;
                }

                //console.log("__  Update of " + myFamilyData[i].id + ": "+ JSON.stringify(myFamilyData[i]));
            }
        }
    }
};

export default familyHelpers;