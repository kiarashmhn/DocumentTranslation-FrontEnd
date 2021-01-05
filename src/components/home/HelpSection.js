import React, { Component } from "react";
import classNames from "classnames";
import {
  Grid,
  isWidthUp,
  Typography,
  withStyles,
  withWidth
} from "@material-ui/core";
import calculateSpacing from "./calculateSpacing";
import PropTypes from "prop-types";
import { getFrenchName, getPersianName } from "../../Dictionary";
import FullScreenDialog from "../FullScreenDialog";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Help from "./Help";

const styles = theme => ({
  wrapper: {
    paddingTop: `${theme.spacing(10)}px !important`,
    [theme.breakpoints.down("md")]: {
      paddingTop: `${theme.spacing(8)}px !important`
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: `${theme.spacing(6)}px !important`
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: `${theme.spacing(4)}px !important`
    },
    position: "relative",
    backgroundColor: "#FFFFFF",
    paddingBottom: theme.spacing(1)
  },
  card: {
    maxWidth: 345,
    backgroundColor: "#00B8D4",
    width: "50%",
    [theme.breakpoints.down("md")]: {
      width: "70%"
    },
    [theme.breakpoints.down("md")]: {
      width: "80%"
    },
    [theme.breakpoints.down("sm")]: {
      width: "80%"
    },
    [theme.breakpoints.down("xs")]: {
      width: "80%"
    }
  },
  container: {
    marginTop: theme.spacing(1),
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
  title: {
    fontFamily: "MyFont",
    useNextVariants: true
  },
  header: {
    marginBottom: `${theme.spacing(3)}px !important`,
    [theme.breakpoints.down("md")]: {
      marginBottom: `${theme.spacing(2)}px !important`
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: `${theme.spacing(1)}px !important`
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: `${theme.spacing(1)}px !important`
    }
  },
  thirdHeader: {
    marginTop: `${theme.spacing(4)}px !important`,
    [theme.breakpoints.down("md")]: {
      marginTop: `${theme.spacing(3)}px !important`
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: `${theme.spacing(2)}px !important`
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: `${theme.spacing(2)}px !important`
    }
  },
  secondaryHeader: {
    marginBottom: `${theme.spacing(5)}px !important`,
    [theme.breakpoints.down("md")]: {
      marginBottom: `${theme.spacing(4)}px !important`
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: `${theme.spacing(3)}px !important`
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: `${theme.spacing(2)}px !important`
    }
  },
  grid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

const helpers = [
  {
    title: getFrenchName("helpLanguage"),
    mdDelay: "0",
    smDelay: "0",
    language: "french"
  },
  {
    title: getPersianName("helpLanguage"),
    mdDelay: "200",
    smDelay: "200",
    language: "persian"
  }
];

class HelpSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openIdentityDialog: false,
      language: "",
      isLoading: false
    };
  }

  handleOpenDialog = language => {
    this.setState({
      openIdentityDialog: true,
      language: language
    });
  };

  handleCloseDialog = () => {
    this.setState({
      openIdentityDialog: false
    });
  };

  render() {
    const { width, classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <div className={classNames("container-fluid", classes.container)}>
          <Typography variant="h3" align="center" className={classes.header}>
            راهنما
          </Typography>
          <div className={classes.grid}>
            <Grid
              container
              spacing={calculateSpacing(width)}
              alignItems="center"
              direction="row"
              justify="center"
              alignContent={"center"}
            >
              {helpers.map(element => (
                <Grid
                  item
                  xs={6}
                  md={6}
                  data-aos="zoom-in-up"
                  data-aos-delay={
                    isWidthUp("md", width) ? element.mdDelay : element.smDelay
                  }
                  key={element.title}
                  dir={element.language === "persian" ? "ltl" : "rtl"}
                >
                  <Card className={classes.card}>
                    <CardActionArea
                      onClick={() => this.handleOpenDialog(element.language)}
                    >
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          className={classes.title}
                          align="center"
                        >
                          {element.title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
          <FullScreenDialog
            title="test"
            component={<Help language={this.state.language} width={width} />}
            handleClose={this.handleCloseDialog}
            open={this.state.openIdentityDialog}
          />
          <Typography
            variant="h6"
            align="center"
            className={classes.thirdHeader}
          >
            ویدیو آموزش استفاده از سایت
          </Typography>
          <div className={classes.grid}>
            <div
              style={{
                position: "relative",
                paddingBottom: "30%" /* 16:9 */,
                paddingTop: 25,
                marginTop: "20px",
                height: 0,
                width: "80%"
              }}
            >
              <iframe
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%"
                }}
                src={`https://www.aparat.com/video/video/embed/videohash/1WL4S/vt/frame?&recom=none`}
                frameBorder="0"
                allowFullScreen={true}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HelpSection.propTypes = {
  width: PropTypes.string.isRequired,
  classes: PropTypes.object
};

export default withWidth()(
  withStyles(styles, { withTheme: true })(HelpSection)
);
