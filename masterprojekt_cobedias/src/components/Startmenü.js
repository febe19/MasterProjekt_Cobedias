import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

//use templates
import "bootstrap/dist/css/bootstrap.min.css";

// material-ui for flexbox,templates and other things
// https://css-tricks.com/snippets/css/a-guide-to-flexbox/
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div style={{ width: "100%" }}>
      <img
        src={require("./images/logo_cobedias.png")}
        style={{ width: "10%" }}
        m={1}
        p={1}
      />
      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}></Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Button
          variant="contained"
          m={1}
          p={1}
          color="secondary"
          href="https://material-ui.com/api/button/"
        >
          Familienanamnese
        </Button>
        <Button variant="contained" m={1} p={1} color="primary">
          Sozialanamnese
        </Button>
      </Box>
    </div>
  );
}
