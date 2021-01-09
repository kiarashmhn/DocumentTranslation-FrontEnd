import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import CircularProgress from "@material-ui/core/CircularProgress";

import * as ColorPalette from "../ColorPalette";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  margin: {
    margin: theme.spacing(1)
  }
}));

const ColorCircularProgress = withStyles({
  root: {
    color: ColorPalette.green
  }
})(CircularProgress);

export default function CustomizedProgressBars() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ColorCircularProgress size={17} thickness={7} />
    </div>
  );
}
