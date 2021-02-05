import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Typography, withStyles } from "@material-ui/core";

const styles = theme => ({
  iconWrapper: {
    borderRadius: theme.shape.borderRadius,
    textAlign: "center",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1) * 1.5
  }
});

function FeatureCard(props) {
  const {
    classes,
    Icon,
    color,
    headline,
    frenchHeadline,
    text,
    frenchText
  } = props;
  return (
    <Fragment>
      <div
        // We will set color and fill here, due to some prios complications
        className={classes.iconWrapper}
        style={{
          color: color,
          fill: color,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {Icon}
      </div>
      {frenchHeadline && (
        <Typography variant="h5" paragraph align={"center"} color={color}>
          {frenchHeadline}
        </Typography>
      )}
      <Typography variant="h5" paragraph align={"center"} color={color}>
        {headline}
      </Typography>
      {frenchText && (
        <Typography
          variant="body1"
          color="textSecondary"
          style={{ whiteSpace: "pre-line" }}
          align={"center"}
        >
          {frenchText}
        </Typography>
      )}
      <Typography
        variant="body1"
        color="textSecondary"
        style={{ whiteSpace: "pre-line" }}
        align={"center"}
      >
        {text}
      </Typography>
    </Fragment>
  );
}

FeatureCard.propTypes = {
  classes: PropTypes.object.isRequired,
  Icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  frenchHeadline: PropTypes.string,
  text: PropTypes.string.isRequired,
  frenchText: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(FeatureCard);
