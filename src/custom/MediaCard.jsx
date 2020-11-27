import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const styles = {
  root: {
    maxWidth: 345
  },
  media: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: 345
  },
  title: {
    fontFamily: "MyFont",
    useNextVariants: true,
    direction: "rtl"
  }
};

class MediaCard extends Component {
  render() {
    return (
      <Card style={styles.root}>
        <CardActionArea
          onClick={() => {
            this.props.onClick();
          }}
        >
          <CardMedia style={styles.media} title={this.props.title}>
            <img
              src={this.props.image}
              alt={"props imageUrl"}
              style={styles.media}
            />
          </CardMedia>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              style={styles.title}
            >
              {this.props.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              dir={"rtl"}
              style={styles.title}
            >
              {this.props.secondaryTitle}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}
export default MediaCard;

MediaCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  secondaryTitle: PropTypes.string,
  onClick: PropTypes.func.isRequired
};
