import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
  root: {
    width: "5%",
    "& > * + *": {
      marginTop: theme.spacing(0.2)
    },
    height: "auto",
    margin: "4% auto 0 auto",
    position: "relative"
  }
}));

export default function LinearIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress />
      <LinearProgress color="secondary" />
    </div>
  );
}
