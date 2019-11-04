import React from "react";
import classNames from "classnames";
import styles from "./FamilyNode.module.css";
import "typeface-roboto";
import localStorage from "local-storage";
import girlAvatar from "../images/001-girl.svg";
import boyAvatar from "../images/049-boy.svg";
import womanAvatar from "../images/003-woman.svg";
import manAvatar from "../images/028-man.svg";
import grandmotherAvatar from "../images/047-grandmother.svg";
import grandfatherAvatar from "../images/002-grandfather.svg";

import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

function FamilyNode({ node, isRoot, deleteFunction, editFunction, style }) {
  // returns the name which should be displayed for a specific family member
  function getName(node) {
    if (node.spitzname && node.spitzname !== "") {
      return node.spitzname;
    } else if (node.vorname && node.vorname !== "") {
      return node.vorname;
    } else if (node.id === "me") {
      return localStorage.get("Vorname");
    } else {
      return node.id;
    }
  }

  function getAvatar(node) {
    if (node.id === "me") {
      if (node.gender === "female") {
        return womanAvatar;
      } else {
        return manAvatar;
      }
    } else if (node.id === "myMother") {
      return grandmotherAvatar;
    } else if (node.id === "myFather") {
      return grandfatherAvatar;
    } else if (node.id.substring(0, 6) === "spouse") {
      if (node.gender === "female") {
        return womanAvatar;
      } else {
        return manAvatar;
      }
    } else if (node.id.substring(0, 7) === "sibling") {
      if (node.gender === "female") {
        return womanAvatar;
      } else {
        return manAvatar;
      }
    } else {
      if (node.gender === "female") {
        return girlAvatar;
      } else {
        return boyAvatar;
      }
    }
  }

  function hideDelete(nodeID) {
    if (nodeID === "me" || nodeID === "myFather" || nodeID === "myMother") {
      return true;
    } else {
      return false;
    }
  }

  function hideEdit(nodeID) {
    if (nodeID === "me") {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className={styles.root} style={style}>
      <div
        className={classNames(
          styles.oneFamilyMemberDiv,
          isRoot && styles.isRoot
        )}
      >
        <img style={{ maxWidth: "91px" }} src={getAvatar(node)} />
      </div>
      <div className={styles.FamilyMemberName}>{getName(node)}</div>
      <div hidden={hideDelete(node.id)}>
        <Fab
          color="primary"
          aria-label="edit"
          onClick={() => deleteFunction(node.id)}
          style={{
            margin: "0 auto",
            height: "20px",
            width: "20px",
            borderRadius: "100px",
            position: "absolute",
            top: "15%",
            right: "1%"
          }}
        >
          <DeleteIcon
            style={{
              margin: "0 auto",
              height: "15px",
              width: "15px"
            }}
          />
        </Fab>
      </div>
      <div hidden={hideEdit(node.id)}>
        <Fab
          color="primary"
          aria-label="edit"
          onClick={() => editFunction(node.id)}
          style={{
            margin: "0 auto",
            height: "20px",
            width: "20px",
            borderRadius: "100px",
            position: "absolute",
            bottom: "15%",
            right: "1%"
          }}
        >
          <EditIcon
            style={{
              margin: "0 auto",
              height: "15px",
              width: "15px"
            }}
          />
        </Fab>
      </div>
    </div>
  );
}

export default FamilyNode;
