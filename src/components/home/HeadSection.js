import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  Grid,
  //isWidthUp,
  //Typography,
  withStyles,
  withWidth
} from "@material-ui/core";
import WaveBorder from "../../shared/components/WaveBorder";
import ZoomImage from "../../shared/components/ZoomImage";

/*const features = [
  {
    title: "شناسنامه",
    image: image,
    secondaryTitle: "درخواست ترجمه شناسنامه",
    details: "شتسذزنشتسزتنشذسزتش"
  },
  {
    title: "شناسنامه2",
    image: image,
    secondaryTitle: "درخواست ترجمه شناسنامه2",
    details: "شتسذزنشتسزتنشذسزتش2222"
  },
  {
    title: "شناسنام3ه",
    image: image,
    secondaryTitle: "درخواست ترجمه شناسنام3ه",
    details: "شتسذزنشتسزتنشذسزتش3333"
  }
];*/

const styles = theme => ({
  wrapper: {
    paddingTop: `${theme.spacing(10)}px !important`,
    position: "relative",
    backgroundColor: theme.palette.secondary.main,
    paddingBottom: theme.spacing(1)
  },
  wrapper2: {
    paddingTop: `${theme.spacing(0)}px !important`,
    position: "relative",
    backgroundColor: theme.palette.secondary.main,
    paddingBottom: theme.spacing(1)
  },
  image: {
    maxWidth: "100%",
    verticalAlign: "middle",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4]
  },
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(1)
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(1)
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(1)
    }
  },
  containerFix: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "none !important"
    }
  },
  waveBorder: {
    paddingTop: theme.spacing(1)
  }
});

class HeadSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      dialogDetails: ""
    };
  }

  handleOpenDialog = () => {
    this.setState({
      openDialog: true
    });
  };

  handleCloseDialog = () => {
    this.setState({
      openDialog: false
    });
  };

  render() {
    const { classes, theme } = this.props;
    return (
      <Fragment>
        <div className={classes.wrapper}>
          <div className={classNames("container-fluid", classes.container)}>
            <Grid item md={12}>
              <ZoomImage
                src={`${process.env.PUBLIC_URL}/images/logged_out/banner.png`}
                className={classes.image}
                alt="header example"
              />
            </Grid>
          </div>
        </div>
        {/*<div className={classes.wrapper2}>
          <div className={classNames("container-fluid", classes.container)}>
            <Grid
              container
              spacing={calculateSpacing(width)}
              dir={"row"}
              justify="center"
            >
              {features.map(element => (
                <Grid
                  item
                  xs={6}
                  md={4}
                  data-aos="zoom-in-up"
                  data-aos-delay={100}
                  key={element.title}
                >
                  <MediaCard
                    title={element.title}
                    onClick={this.handleOpenDialog}
                    secondaryTitle={element.secondaryTitle}
                  />
                  <CustomDialogs
                    title="test"
                    component={
                      <Typography variant="body1" color="textSecondary">
                        {element.details}
                      </Typography>
                    }
                    handleClose={this.handleCloseDialog}
                    open={this.state.openDialog}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>*/}
        <WaveBorder
          upperColor={theme.palette.secondary.main}
          lowerColor="#FFFFFF"
          className={classes.waveBorder}
          animationNegativeDelay={2}
        />
      </Fragment>
    );
  }
}

HeadSection.propTypes = {
  classes: PropTypes.object,
  width: PropTypes.string,
  theme: PropTypes.object
};

export default withWidth()(
  withStyles(styles, { withTheme: true })(HeadSection)
);
