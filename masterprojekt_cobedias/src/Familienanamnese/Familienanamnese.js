import React, { Component } from "react";
import Stammbaum from "./Stammbaum";
import FA_anfang from "./FA_anfang";
import PersonAngaben from "./PersonAngaben";

class Familienanamnese extends Component {
  render() {
    return (
      <div>
        <FA_anfang />
        <PersonAngaben />
      </div>
    );
  }
}

export default Familienanamnese;
