import React from "react";
import PropTypes from "prop-types";
import { Typography, withStyles } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

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

function shadeColor(hex, percent) {
  const f = parseInt(hex.slice(1), 16);

  const t = percent < 0 ? 0 : 255;

  const p = percent < 0 ? percent * -1 : percent;

  const R = f >> 16;

  const G = (f >> 8) & 0x00ff;

  const B = f & 0x0000ff;
  return `#${(
    0x1000000 +
    (Math.round((t - R) * p) + R) * 0x10000 +
    (Math.round((t - G) * p) + G) * 0x100 +
    (Math.round((t - B) * p) + B)
  )
    .toString(16)
    .slice(1)}`;
}

function FeatureCard(props) {
  const {
    classes,
    Icon,
    color,
    headline,
    frenchHeadline,
    text,
    frenchText,
    onClick
  } = props;
  return (
    <Card style={styles.root}>
      <CardActionArea
        onClick={() => {
          onClick();
        }}
      >
        <CardContent>
          <div
            style={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div
              // We will set color and fill here, due to some prios complications
              className={classes.iconWrapper}
              style={{
                color: color,
                fill: color,
                backgroundColor: shadeColor(color, 0.5)
              }}
            >
              {Icon}
            </div>
          </div>
          {frenchHeadline && (
            <Typography
              variant="h6"
              align={"center"}
              style={{ whiteSpace: "pre-line" }}
            >
              {frenchHeadline}
            </Typography>
          )}
          <Typography
            variant="h6"
            paragraph
            align={"center"}
            style={{ whiteSpace: "pre-line" }}
          >
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
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

FeatureCard.propTypes = {
  classes: PropTypes.object.isRequired,
  Icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  frenchHeadline: PropTypes.string,
  text: PropTypes.string.isRequired,
  frenchText: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(FeatureCard);
