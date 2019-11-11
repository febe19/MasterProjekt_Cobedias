import localStorage from 'local-storage'

let otherFamilyData = [];

let myFamilyData =
    [
        {
            "id": "me",
            "gender": "male",
            "parents": [
                {
                    "id": "myMother"
                },
                {
                    "id": "myFather"
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
                    "id": "myFather"
                }
            ],
            "children": [
                {
                    "id": "me"
                }
            ],
            "geburtsjahr": 0,
            "spitzname": '',
            "vorname": '',
            "nachname": '',
            "verstorben": '',
            "todesjahr": '',
            "todesursache": '',
            "gesundheitszustand": '',
            "blutsverwandt": true
        },
        {
            "id": "myFather",
            "gender": "male",
            "parents": [],
            "siblings": [],
            "spouses": [
                {
                    "id": "myMother"
                }
            ],
            "children": [
                {
                    "id": "me"
                }
            ],
            "geburtsjahr": 0,
            "spitzname": '',
            "vorname": '',
            "nachname": '',
            "verstorben": '',
            "todesjahr": '',
            "todesursache": '',
            "gesundheitszustand": '',
            "blutsverwandt": true
        }
    ];

const familyHelpers = {

    // sets the gender of me which was chosen earlier
    setGenderOfMe: function (gender) {
        for (let i = 0; i <= myFamilyData.length - 1; i++) {
            //If ID is me --> found.
            if (myFamilyData[i].id === 'me') {
                myFamilyData[i]['gender'] = gender;
            }
        }
        localStorage.set('FamilyData', myFamilyData);
    },

    //Returns the FamilyData aka. "all family objects" --> Is used to draw the tree.
    getFamilyData: function () {
        if (localStorage.get('FamilyData') !== null && localStorage.get('FamilyData').length > 0) {
            myFamilyData = localStorage.get('FamilyData');
        }
        return myFamilyData;
    },


    getOtherFamilyData: function () {
        if (localStorage.get('OtherFamilyData') !== null && localStorage.get('OtherFamilyData').length > 0) {
            otherFamilyData = localStorage.get('OtherFamilyData');
        }
        return otherFamilyData;
    },

    //Returns the number of family members
    getNumberFamilyMember: function () {
        console.log("__Return number Family member: " + myFamilyData.length);
        return myFamilyData.length;
    },

    //Get the ID of the last added family member
    getLastFamilyMember: function () {
        //console.log("__Last Added Family Member: " + JSON.stringify(myFamilyData[myFamilyData.length - 1]));
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

    getOtherFamilyMemberByID: function (id) {
        for (let i = 0; i <= otherFamilyData.length - 1; i++) {
            //If ID is the same --> found.
            if (otherFamilyData[i].id === id) {
                return otherFamilyData[i];
            }
        }
        return false;
    },

    //This is a check if the family member already exists --> Prevention of adding the same member twice.
    checkExistingFamilyMember: function (id) {
        for (let i = 0; i <= myFamilyData.length - 1; i++) {
            if (myFamilyData[i].id === id) {
                console.log("__ " + myFamilyData[i].id + " Already exists");
                return true;
            }
        }
        return false;
    },

    getHighestIndexOfOtherFM: function () {
        return otherFamilyData.length;
    },

    //get Highest index of existing and deleted family members of type "fm"
    getHighestIndexOfFM: function (fm, allDeletedFamilyMembers) {
        let lengthOfFMString = fm.length;
        let numbersOfAllIDs = [];
        //loop through all existing family members
        for (let i = 0; i <= myFamilyData.length - 1; i++) {
            if (myFamilyData[i].id.substring(0, lengthOfFMString) === fm) {
                numbersOfAllIDs.push(Number(myFamilyData[i].id.substring(lengthOfFMString)));
            }
        }
        //loop through all deleted family members if not empty
        if (allDeletedFamilyMembers.length !== 0) {
            for (let i = 0; i <= allDeletedFamilyMembers.length - 1; i++) {
                if (allDeletedFamilyMembers[i].id.substring(0, lengthOfFMString) === fm) {
                    numbersOfAllIDs.push(Number(allDeletedFamilyMembers[i].id.substring(lengthOfFMString)));
                }
            }
        }
        if (numbersOfAllIDs.length === 0) {
            //this is the first fm of this type that is being added
            return 1;
        } else {
            let maxID = Math.max(...numbersOfAllIDs);
            return (maxID + 1);
        }
    },

    editOtherExistingFamiliyMember: function (id, gender, geburtsjahr, spitzname, vorname, nachname, verstorben, todesjahr, todesursache, gesundheitszustand, blutsverwandt, verwadtschaftsgrad) {
        for (let i = 0; i < otherFamilyData.length; i++) {
            if (otherFamilyData[i].id === id) {
                otherFamilyData[i].gender = gender;
                otherFamilyData[i].geburtsjahr = geburtsjahr;
                otherFamilyData[i].spitzname = spitzname;
                otherFamilyData[i].vorname = vorname;
                otherFamilyData[i].nachname = nachname;
                otherFamilyData[i].verstorben = verstorben;
                otherFamilyData[i].todesjahr = todesjahr;
                otherFamilyData[i].todesursache = todesursache;
                otherFamilyData[i].gesundheitszustand = gesundheitszustand;
                otherFamilyData[i].blutsverwandt = blutsverwandt;
                otherFamilyData[i].verwandtschaftsgrad = verwadtschaftsgrad;
            }
        }
        localStorage.set('OtherFamilyData', otherFamilyData);
    },


    //Edit of an existing family member
    editExistingFamilyMember: function (id, gender, parents, oldParents, sibling, spouses, children, oldChildren, geburtsjahr, spitzname, vorname, nachname, verstorben, todesjahr, todesursache, gesundheitszustand, blutsverwandt) {

        console.log("-----> Blutsverwandt: " + blutsverwandt);
        if (this.getFamilyMemberByID(id)) {
            console.log(" Edit Family Member " + id + " --> \n" + JSON.stringify(this.getFamilyData()));

            //delete Existing Entry from member
            for (let i = 0; i < myFamilyData.length; i++) {
                if (myFamilyData[i].id === id) {
                    myFamilyData.splice(i, 1);
                }
            }

            // check if it is a child that is being edited and if parents of the family members were edited
            if ((id.substring(0, 5) === 'child') && (parents.length === 2) && (oldParents.length === 2) && (parents[1].id !== oldParents[1].id)) {
                //delete the edited child in the old parent
                for (let i = 0; i < this.getFamilyMemberByID(oldParents[1].id).children.length; i++) {
                    if (this.getFamilyMemberByID(oldParents[1].id).children[i].id === id) {
                        this.getFamilyMemberByID(oldParents[1].id).children.splice(i, 1);
                    }
                }

                // add the child in the new parent
                this.getFamilyMemberByID(parents[1].id).children.push(
                    {"id": id,}
                );
            }

            // check if it is a spouse that is being edited AND if its children were edited
            let newChildren = [];
            if (id.substring(0, 6) === 'spouse' && this.getFamilyMemberByID("me").spouses.length > 1 && children.length > oldChildren.length) {

                //loop through selected children of edited spouse
                for (let k = 0; k < children.length; k++) {

                    //loop through all spouses
                    for (let i = 0; i < myFamilyData.length; i++) {
                        if (myFamilyData[i].id.substring(0, 6) === 'spouse') {

                            //delete all children that were selected by edited spouse
                            for (let j = 0; j < myFamilyData[i].children.length; j++) {
                                if (myFamilyData[i].children[j].id === children[k]) {
                                    myFamilyData[i].children.splice(j, 1);
                                }
                            }
                        }
                    }
                    //add child to edited spouse's children
                    newChildren.push({"id": children[k]});

                    //loop through all children and replace current parent with new parent (= the spouse that is being edited)
                    for (let i = 0; i < myFamilyData.length; i++) {
                        if (myFamilyData[i].id === children[k]) {
                            myFamilyData[i].parents[1].id = id
                        }
                    }
                }
            } else {
                newChildren = oldChildren;
            }

            //Create new entry for member
            myFamilyData.push(
                {
                    "id": id,
                    "gender": gender,
                    "parents": parents,
                    "siblings": sibling,
                    "spouses": spouses,
                    "children": newChildren,
                    "geburtsjahr": geburtsjahr,
                    "spitzname": spitzname,
                    "vorname": vorname,
                    "nachname": nachname,
                    "verstorben": verstorben,
                    "todesjahr": todesjahr,
                    "todesursache": todesursache,
                    "gesundheitszustand": gesundheitszustand,
                    "blutsverwandt": blutsverwandt
                }
            );
            localStorage.set('FamilyData', myFamilyData);
        } else {
            console.log("No Family member found with id: " + id);
        }
    },

    addOtherFamilyMember: function (id, gender, geburtsjahr, spitzname, vorname, nachname, verstorben, todesjahr, todesursache, gesundheitszustand, blutsverwandt, verwadtschaftsgrad) {
        otherFamilyData.push(
            {
                "id": id,
                "gender": gender,
                "geburtsjahr": geburtsjahr,
                "spitzname": spitzname,
                "vorname": vorname,
                "nachname": nachname,
                "verstorben": verstorben,
                "todesjahr": todesjahr,
                "todesursache": todesursache,
                "gesundheitszustand": gesundheitszustand,
                "blutsverwandt": blutsverwandt,
                "verwandtschaftsgrad": verwadtschaftsgrad,
            }
        );

        localStorage.set('OtherFamilyData', otherFamilyData);
    },

    //This allows adding an all new family Member with check if they already exist
    addFamilyMember: function (id, gender, parents, sibling, spouses, children, geburtsjahr, spitzname, vorname, nachname, verstorben, todesjahr, todesursache, gesundheitszustand, blutsverwandt) {

        if (!this.checkExistingFamilyMember(id)) {
            //add Child to Parents

            for (let i = 0; i <= parents.length - 1; i++) {
                if (this.getFamilyMemberByID(parents[i].id).id !== id && this.getFamilyMemberByID(parents[i].id) !== false && this.getFamilyMemberByID(parents[i].id) !== null) {
                    this.getFamilyMemberByID(parents[i].id).children.push(
                        {
                            "id": id
                        }
                    );
                }
            }

            //Add sibling to siblings or to children of me depending on the input
            for (let i = 0; i <= sibling.length - 1; i++) {
                if (this.getFamilyMemberByID(sibling[i].id).id !== id && this.getFamilyMemberByID(sibling[i].id) !== false && this.getFamilyMemberByID(sibling[i].id) !== null) {
                    this.getFamilyMemberByID(sibling[i].id).siblings.push(
                        {
                            "id": id
                        }
                    );
                }
            }

            //Add spouse

            for (let i = 0; i <= spouses.length - 1; i++) {
                if (this.getFamilyMemberByID(spouses[i].id) !== false && this.getFamilyMemberByID(spouses[i].id) !== false && this.getFamilyMemberByID(spouses[i].id) !== null) {
                    this.getFamilyMemberByID(spouses[i].id).spouses.push(
                        {
                            "id": id
                        }
                    );
                }
            }

            // add spouse as parent to selected children
            if (id.substring(0, 6) === 'spouse' && children !== [] && children !== null) {
                for (let i = 0; i < children.length; i++) {
                    // delete all occurences of selected children in already existing spouses
                    for (let j = 0; j < myFamilyData.length; j++) {

                        // loop through all spouses
                        if (myFamilyData[j].id.substring(0, 6) === 'spouse') {
                            for (let k = 0; k < myFamilyData[j].children.length; k++) {
                                // check for those spouses if they had the selected child and if yes, delete it so that it can be added to the new spouse
                                if (myFamilyData[j].children[k].id === children[i].id) {
                                    //the following line removes the selected child from former spouse-parent.children AND ALSO FROM ME.CHILDREN!!!
                                    myFamilyData[j].children.splice(k, 1);
                                }
                            }
                        }
                    }

                    //if there is only one parent it means that this is the first spouse that is added. In this case this new spouse is set as a parent of all existing children
                    if (this.getFamilyMemberByID(children[i].id).parents.length === 1) {
                        this.getFamilyMemberByID(children[i].id).parents.push({"id": id})

                        // otherwise it means that the child already had two parents, in that case the second parent(which is the spouse), has to be removed and then the newly created spouse can be added as a parent
                    } else {
                        this.getFamilyMemberByID(children[i].id).parents.splice(1, 1);
                        this.getFamilyMemberByID(children[i].id).parents.push({"id": id})
                    }

                }


                // make sure that all children are in me.children (since they are slpiced away when adding new spouse – sometimes....)
                this.getFamilyMemberByID("me").children = [];
                for (let i = 0; i <= myFamilyData.length - 1; i++) {
                    if (myFamilyData[i].id.substring(0, 5) === 'child') {
                        this.getFamilyMemberByID("me").children.push({"id": myFamilyData[i].id});
                    }
                }
            }


            //Push Data to familyData.
            myFamilyData.push(
                {
                    "id": id,
                    "gender": gender,
                    "parents": parents,
                    "siblings": sibling,
                    "spouses": spouses,
                    "children": children,
                    "geburtsjahr": geburtsjahr,
                    "spitzname": spitzname,
                    "vorname": vorname,
                    "nachname": nachname,
                    "verstorben": verstorben,
                    "todesjahr": todesjahr,
                    "todesursache": todesursache,
                    "gesundheitszustand": gesundheitszustand,
                    "blutsverwandt": blutsverwandt,
                }
            );

            //If it goes until here, the new member is added.
            console.log("__Added new member " + id + " to FamilyData: \n" + JSON.stringify(myFamilyData) + "\n \n" + "New family member" + "\n \n" + JSON.stringify(this.getLastFamilyMember()));
            localStorage.set('FamilyData', myFamilyData);
            return true;
        } else {
            //New member already exists --> Should not happen, because ID is generated on the fly.
            console.log("__Family member " + id + " does already exist");
            return false;
        }
    },

    deleteOtherFamilyMember: function (id) {
        console.log("OFM to delete: " + id);
        for (let i = 0; i < otherFamilyData.length; i++) {
            console.log("OFM testing for deleteion: " + otherFamilyData[i].id);
            if (otherFamilyData[i].id === id) {
                console.log("OFM found: " + otherFamilyData[i].id);
                otherFamilyData.splice(i, 1);
            }
        }
        localStorage.set('OtherFamilyData', otherFamilyData);
    },

    //This delete certain Family members. It is only allowed to delete spouses, siblings or children
    deleteFamilyMember: function (id) {

        //loop through all family members
        for (let i = 0; i < myFamilyData.length; i++) {

            console.log("Check Family Member " + myFamilyData[i].id);
            for (let j = 0; j < myFamilyData[i].siblings.length; j++) {
                if (myFamilyData[i].siblings[j].id === id) {
                    console.log("   Delete Family Member " + id + " in " + myFamilyData[i].id + ".siblings " + JSON.stringify(myFamilyData[i].siblings));
                    myFamilyData[i].siblings.splice(j, 1);
                }
            }

            for (let j = 0; j < myFamilyData[i].parents.length; j++) {
                if (myFamilyData[i].parents[j].id === id) {
                    console.log("   Delete Family Member " + id + " in " + myFamilyData[i].id + ".parents " + JSON.stringify(myFamilyData[i].parents));
                    myFamilyData[i].parents.splice(j, 1);
                }
            }

            for (let j = 0; j < myFamilyData[i].spouses.length; j++) {
                if (myFamilyData[i].spouses[j].id === id) {
                    console.log("   Delete Family Member " + id + " in " + myFamilyData[i].id + ".spouses " + JSON.stringify(myFamilyData[i].spouses));
                    myFamilyData[i].spouses.splice(j, 1);
                }
            }

            for (let j = 0; j < myFamilyData[i].children.length; j++) {
                if (myFamilyData[i].children[j].id === id) {
                    console.log("   Delete Family Member " + id + " in " + myFamilyData[i].id + ".children " + JSON.stringify(myFamilyData[i].children));
                    myFamilyData[i].children.splice(j, 1);
                }
            }
        }
        for (let i = 0; i < myFamilyData.length; i++) {
            if (myFamilyData[i].id === id) {
                console.log("   Delete Family Member " + id + "\n" + JSON.stringify(this.getFamilyMemberByID(id)));
                myFamilyData.splice(i, 1);

            }
        }

        console.log("Deleted member " + id + " from FamilyData: \n" + JSON.stringify(myFamilyData));
        localStorage.set('FamilyData', myFamilyData);
    }
};

export default familyHelpers;