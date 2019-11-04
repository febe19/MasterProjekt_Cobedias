import React, { Component } from "react";
import FA_anfang from "./FA_anfang";
import PersonAngaben from "./PersonAngaben";
import Stammbaum from "./Stammbaum";
import Tutorial_1 from "./Tutorial_1";

//traversy:UserForm
export class Familienanamnese extends Component {
  state = {
    step: 1,
    vorName: "",
    nachName: ""
  };

  //Gehe zu nächster Seite
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  //Gehe zu vorheriger Seite
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  //Umgang mit Wechseln in Feldern
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    //Defactoring

    const { step } = this.state;
    const { vorName, nachName } = this.state;
    const values = { vorName, nachName };

    switch (step) {
      case 1:
        return (
          <FA_anfang
            nextStep={this.nextStep.bind(this)}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <PersonAngaben
            nextStep={this.nextStep.bind(this)}
            handleChange={this.handleChange}
            values={values}
          />
        );

      case 3: //TODO: Change Step back to 1
        return (
          <Stammbaum
            nextStep={this.nextStep.bind(this)}
            prevStep={this.prevStep.bind(this)}
            handleChange={this.handleChange}
            values={values}
          />
        );
    }
  }
}

export default Familienanamnese;
