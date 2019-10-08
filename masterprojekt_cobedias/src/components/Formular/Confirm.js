import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/List";
import { List, ListItem } from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export class Confirm extends Component {
  continue = e => {
    e.preventDefault();
    //Process form//
    this.props.nextStep();
  };
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    const {
      values: { firstName, lastName, email, occupation, city, bio }
    } = this.props;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Bestätigung der Daten" />
          <List>
            <ListItem primaryText="Vorname" secondaryText={firstName} />
            <ListItem primaryText="Nachname" secondaryText={lastName} />
            <ListItem primaryText="Email" secondaryText={email} />
            <ListItem primaryText="Beruf" secondaryText={occupation} />
            <ListItem primaryText="Wohnort" secondaryText={city} />
            <ListItem primaryText="Bio" secondaryText={bio} />
          </List>
          <br />
          <RaisedButton
            label="Bestätigung"
            primary={true}
            style={styles.button}
            onClick={this.continue}
          />
          <RaisedButton
            label="Zurück"
            primary={false}
            style={styles.button}
            onClick={this.back}
          />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  button: {
    margin: 15
  }
};

export default Confirm;
