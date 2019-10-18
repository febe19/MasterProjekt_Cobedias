import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import FamilyTree from "./FamilyTreeComponent";
import styles from "./FamilyTree.module.css";

export class Stammbaum extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    color: "white"
  };

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  changeimgcolor = e => {
    this.setState({
      color: "rgba(105,105,105,0.5)"
    });
  };

  render() {
    return (
      <div style={{ backgroundColor: this.state.color, width: "100%" }}>
        <Box display="flex" justifyContent="flex-start" m={1} p={1}>
          <Box p={1}>
            <img
              src={require("../components/images/logo_cobedias.png")}
              style={{ width: "40%" }}
              m={1}
              p={1}
            />
          </Box>
        </Box>

        <FamilyTree />

        <Box
          display="flex"
          justifyContent="flex-end"
          flexDirection="column"
          alignItems="flex-end"
          m={1}
          p={1}
        >
          <Box p={1}>
            <img
              src={require("../components/images/weiblich_hinz.png")}
              style={{ width: "40%" }}
              m={1}
              p={1}
            />
            <img
              src={require("../components/images/mänlich_hinz.png")}
              style={{ width: "45%" }}
              m={1}
              p={1}
            />
          </Box>
          <Box p={1}>
            <img
              src={require("../components/images/weiblich_hinz.png")}
              style={{ width: "40%" }}
              m={1}
              p={1}
            />
            <img
              src={require("../components/images/mänlich_hinz.png")}
              style={{ width: "45%" }}
              m={1}
              p={1}
            />
          </Box>
          <Box p={1}>
            <img
              src={require("../components/images/andere.png")}
              title="Halb"
              style={{ width: "30%" }}
              m={2}
              p={2}
            />
            <img
              src={require("../components/images/andere.png")}
              style={{ width: "30%" }}
              m={2}
              p={2}
            />

            <img
              src={require("../components/images/question.png")}
              m={2}
              p={2}
              onClick={this.changeimgcolor}
            />
          </Box>
        </Box>
      </div>
    );
  }
}

export default Stammbaum;
