import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import FamilyTree from "./FamilyTreeComponent";

export class Tutorial_1 extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    color: "rgba(105,105,105,0.5)"
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
      <div style={{ backgroundColor: this.state.color }}>
        <Box display="flex" justifyContent="flex-start" m={1} p={1}>
          <img
            src={require("../components/images/logo_cobedias.png")}
            style={{ width: "20%" }}
            m={1}
            p={1}
          />
        </Box>
        <FamilyTree />
      </div>
    );
  }
}

export default Tutorial_1;
