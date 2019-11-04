import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import FamilyTree from "./FamilyTreeComponent";
import "../App.css";
import Stammbaum from "./Stammbaum";

export class Tutorial_1 extends Component {
  constructor(props) {
    super(props);
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  state = {
    color: "rgba(0, 0, 0, 0.8)",
    showComponent: false,
    panels: []
  };

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
    if (this.state.showComponent) {
      return <Stammbaum />;
    } else {
      return (
        <div className="App" style={{ backgroundColor: this.state.color }}>
          <Box flexDirection="row">
            <Box display="flex" justifyContent="flex-start" m={1} p={1}>
              <img
                src={require("../components/images/Weiter.png")}
                style={{ width: "10%" }}
                m={1}
                p={1}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="flex-end"
              m={1}
              p={1}
              alignItems="flex-end"
              flexDirection="column"
            >
              <img
                src={require("../components/images/Schliessen.png")}
                style={{ width: "5%" }}
                m={1}
                p={1}
                onClick={this._onButtonClick}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="flex-end"
              m={2}
              p={0}
              alignItems="flex-end"
            >
              <h3 className="h3">Schliessen</h3>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            m={1}
            p={1}
            alignItems="center"
            flexDirection="column"
          >
            <FamilyTree />
            <br />
            <h3 className="h3">
              In diesem Familienstammbaum können sämtliche Familienmitglieder
              erfasst werden. Weibliche Familienmitglieder werden Rosa
              angezeigt, männliche hellblau. Die Verwandschaftsverhältnisse sind
              über Linien dargestellt. Die einzelnen Familienmitglieder sind
              über verschiedene Darstellungen ersichtlich.
              <br /> Bei Fehlern in der Eingabe können die Familienmitglieder
              bearbeitet oder gelöscht werden durch angrenzende Symbole.
            </h3>
          </Box>
        </div>
      );
    }
  }
}

export default Tutorial_1;
