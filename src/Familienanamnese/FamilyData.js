//TODO: Get gender for "me" from input form
let myFamilyData =
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
            ],
            "geburtsjahr": 0,
            "spitzname": '',
            "vorname": '',
            "nachname": '',
            "verstorben": '',
            "todesjahr": '',
            "todesursache": '',
            "gesundheitszustand": ''
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
            ],
            "geburtsjahr": 0,
            "spitzname": '',
            "vorname": '',
            "nachname": '',
            "verstorben": '',
            "todesjahr": '',
            "todesursache": '',
            "gesundheitszustand": ''
        }
    ];

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

    //get Highest index of Siblings --> Currently only 9 siblings are allowed
    getHighestIndexOfSiblings: function () {
        let highestIndex = 0;
        for (let i = 0; i <= myFamilyData.length - 1; i++) {
            if (myFamilyData[i].id.substring(0, 7) === 'sibling') {
                highestIndex = myFamilyData[i].id.slice(-1);
            }
        }
        return (parseInt(highestIndex, 10) + 1);
    },

    //get Highest index of Spouse --> Currently only 9 spouses are allowed
    getHighestIndexOfSpouse: function () {
        let highestIndex = 0;
        for (let i = 0; i <= myFamilyData.length - 1; i++) {
            if (myFamilyData[i].id.substring(0, 6) === 'spouse') {
                highestIndex = myFamilyData[i].id.slice(-1);
            }
        }
        return (parseInt(highestIndex, 10) + 1);
    },

    //get Highest index of Child --> Currently only 9 children are allowed
    getHighestIndexOfChildren: function () {
        let highestIndex = 0;
        for (let i = 0; i <= myFamilyData.length - 1; i++) {
            if (myFamilyData[i].id.substring(0, 5) === 'child') {
                highestIndex = myFamilyData[i].id.slice(-1);
            }
        }
        return (parseInt(highestIndex, 10) + 1);
    },

    //Edit of an existing family member
    editExistingFamilyMember: function (id, gender, parents, sibling, spouses, children, geburtsjahr, spitzname, vorname, nachname, verstorben, todesjahr, todesursache, gesundheitszustand) {
        if (this.getFamilyMemberByID(id)) {
            console.log(" Edit Family Member " + id + " --> \n" + JSON.stringify(this.getFamilyData()));

            //delete Existing Entry form member
            for (let i = 0; i < myFamilyData.length; i++) {
                if (myFamilyData[i].id === id) {
                    myFamilyData.splice(i, 1);
                }
            }

            //Create new entry for member
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
                }
            );

        } else {
            console.log("No Family member found with id: " + id);
        }
    },

    //This allows adding an all new family Member with check if they already exist
    addFamilyMember: function (id, gender, parents, sibling, spouses, children, geburtsjahr, spitzname, vorname, nachname, verstorben, todesjahr, todesursache, gesundheitszustand) {

        if (!this.checkExistingFamilyMember(id)) {
            console.log("adding: "+id);
            console.log("parents: "+JSON.stringify(parents));
            console.log("parents.length: "+parents.length);
            //add Child to Parents
            for (let i = 0; i <= parents.length - 1; i++) {
                console.log("parent id: "+this.getFamilyMemberByID(parents[i].id).id);
                if (this.getFamilyMemberByID(parents[i].id).id !== id && this.getFamilyMemberByID(parents[i].id) !== false && this.getFamilyMemberByID(parents[i].id) !== null) {
                    console.log("trueeee");
                    console.log("adding child: "+id);
                    console.log("to parent: "+this.getFamilyMemberByID(parents[i].id));
                    this.getFamilyMemberByID(parents[i].id).children.push(
                        {
                            "id": id,
                            "type": "blood",
                        }
                    );
                }
            }

            console.log("sibling.length: "+sibling.length);
            //Add sibling to siblings or to children of me depending on the input
            for (let i = 0; i <= sibling.length - 1; i++) {
                console.log("sibling.length im loop");
                if (this.getFamilyMemberByID(sibling[i].id).id !== id && this.getFamilyMemberByID(sibling[i].id) !== false && this.getFamilyMemberByID(sibling[i].id) !== null) {
                    this.getFamilyMemberByID(sibling[i].id).siblings.push(
                        {
                            "id": id,
                            "type": "blood",
                        }
                    );
                }
            }

            //Add spouse

            console.log("pouses.length: "+spouses.length);
            for (let i = 0; i <= spouses.length - 1; i++) {
                if (this.getFamilyMemberByID(spouses[i].id) !== false && this.getFamilyMemberByID(spouses[i].id) !== false && this.getFamilyMemberByID(spouses[i].id) !== null) {
                    console.log("ad spouse: "+spouses[i].id);
                    this.getFamilyMemberByID(spouses[i].id).spouses.push(
                        {
                            "id": id,
                            "type": "blood",
                        }
                    );
                }
            }

            /*

            //ich glaube das braucht es nicht, da der additional parents nun manuell bestimmt wird

            //Add Parent to already existing children
            for (let i = 0; i <= children.length - 1; i++) {
                if (this.getFamilyMemberByID(children[i].id) !== false && this.getFamilyMemberByID(children[i].id) !== false && this.getFamilyMemberByID(children[i].id) !== null) {
                    this.getFamilyMemberByID(children[i].id).parents.push(
                        {
                            "id": id,
                            "type": "blood",
                        }
                    );}
                }
            }

             */



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
                }
            );

            //If it goes until here, the new member is added.
            console.log("__Added new member " + id + " to FamilyData: \n" + JSON.stringify(myFamilyData) + "\n \n" + "New family member" + "\n \n" + JSON.stringify(this.getLastFamilyMember()));
            return true;
        } else {
            //New member already exists --> Should not happen, because ID is generated on the fly.
            console.log("__Family member " + id + " does already exist");
            return false;
        }
    },

    //This delete certain Family members. It is only allowed to delete spouses, siblings or children
    deleteFamilyMember: function (id) {
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
    }

};

export default familyHelpers;