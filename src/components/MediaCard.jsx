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
    width: 310
  },
  title: {
    fontFamily: `"MyFont", "OS"`,
    useNextVariants: true,
    display: "block"
  },
  titleWrapper: {
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
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
          {this.props.image && (
            <CardMedia style={styles.media} title={this.props.title}>
              <img
                src={this.props.image}
                alt={"props imageUrl"}
                style={styles.media}
              />
            </CardMedia>
          )}
          <CardContent>
            <div style={styles.titleWrapper}>
              <Typography variant="h6" component={"div"} style={styles.title}>
                {this.props.title}
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                component={"div"}
                style={styles.title}
              >
                {this.props.secondaryTitle}
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}
export default MediaCard;

MediaCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  secondaryTitle: PropTypes.string,
  onClick: PropTypes.func.isRequired
};
