import React, { Component } from "react";
import FA_anfang from "./FA_anfang";
import PersonAngaben from "./PersonAngaben";

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
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <PersonAngaben
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );

      case 3:
        return <h1> Stammbaum</h1>;

      case 4:
        return <h1> Stammbaum</h1>;
    }
  }
}

export default Familienanamnese;
