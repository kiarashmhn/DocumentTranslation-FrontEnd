import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const createStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  title: {
    fontFamily: "MyFont",
    useNextVariants: true,
    direction: "rtl"
  },
  media: {
    height: 140
  }
});

function MediaCard(props) {
  const classes = createStyles();
  const { onClick, imageUrl, title, secondaryTitle } = props;
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={onClick}>
        <CardMedia className={classes.media} image={imageUrl} title={title} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.title}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            dir={"rtl"}
          >
            {secondaryTitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
export default MediaCard;

MediaCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  secondaryTitle: PropTypes.string,
  onClick: PropTypes.func.isRequired
};
