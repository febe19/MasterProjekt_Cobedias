const myFamilyData =
    [
        {
            "id": "me",
            "gender": "male",
            "parents": [],
            "siblings": [],
            "spouses": [],
            "children": []
        }
    ]

const familyHelpers = {

    //Returns the FamilyData aka. "all family objects" --> Is used to draw the tree.
    getFamilyData: function () {
        return myFamilyData;
    },

    //Returns the number of family members
    getNumberFamilyMember: function () {
        console.log("Return number Family member: " + myFamilyData.length);
        return myFamilyData.length;
    },

    //Get the ID of the last added family member
    getLastFamilyMember: function () {
        console.log("Last Added Family Member: " + JSON.stringify(myFamilyData[myFamilyData.length - 1]));
        return myFamilyData[myFamilyData.length - 1];
    },

    //This allows adding an all new family Member
    addFamilyMember: function (id, gender, parents, siblings, spouses, children) {
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
        console.log("Added new member to FamilyData: " + JSON.stringify(myFamilyData));
    },

    //Updating Family Members by ID
    updateMyFamilyMember: function (id, gender, parents, siblings, spouses, children) {
        console.log("Update of Family Member: " + id);

        //Iterate over Family members
        for (var i = 0; i <= myFamilyData.length - 1; i++) {

            //If ID is the same --> found.
            if (myFamilyData[i].id === id) {
                console.log("  Found Item at position: " + i);

                //Update Gender
                if (gender !== null) {
                    console.log("  Update gender of " + myFamilyData[i].id + " from " + myFamilyData[i].gender + " to " + gender);
                    myFamilyData[i].gender = gender;
                }

                //Update parents
                if (parents !== null) {
                    console.log("  Update Parents of " + myFamilyData[i].id + " from " + JSON.stringify(myFamilyData[i].parents) + " to " + parents);
                    myFamilyData[i].parents = parents;
                }

                //Update siblings
                if (siblings !== null) {
                    console.log("  Update siblings of " + myFamilyData[i].id + " from " + JSON.stringify(myFamilyData[i].siblings) + " to " + siblings);
                    myFamilyData[i].siblings = siblings;
                }

                //Update spouse
                if (spouses !== null) {
                    console.log("  Update spouse of " + myFamilyData[i].id + " from " + JSON.stringify(myFamilyData[i].spouses) + " to " + spouses);
                    myFamilyData[i].spouses = spouses;
                }

                //Update children
                if (children !== null) {
                    console.log("  Update children of " + myFamilyData[i].id + " from " + JSON.stringify(myFamilyData[i].children) + " to " + children);
                    myFamilyData[i].children = children;
                }
            }
        }
    }

}

export default familyHelpers;