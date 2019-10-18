import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import FamilyTree from "./FamilyTreeComponent";
import styles from "./FamilyTree.module.css";
import Toggle from "./Tutorial_1";

export class Stammbaum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "white",
      showComponent: false,
      panels: []
    };
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  _onButtonClick() {
    const nextId = this.state.panels.length + 1;
    this.setState({
      showComponent: true,
      panels: this.state.panels.concat([nextId])
    });
  }

  render() {
    return (
      <div style={{ backgroundColor: this.state.color }}>
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
              onClick={this._onButtonClick}
            />
            {this.state.panels.map(panelID => (
              <Toggle />
            ))}
          </Box>
        </Box>
      </div>
    );
  }
}

export default Stammbaum;
