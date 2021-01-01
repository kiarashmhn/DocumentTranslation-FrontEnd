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
  root: {
    maxWidth: 345
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
  secondaryHeader: {
    marginBottom: `${theme.spacing(10)}px !important`,
    [theme.breakpoints.down("md")]: {
      marginBottom: `${theme.spacing(8)}px !important`
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: `${theme.spacing(6)}px !important`
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: `${theme.spacing(4)}px !important`
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
          <Typography
            variant="h6"
            align="center"
            className={classes.secondaryHeader}
          >
            راهنمای استفاده از سایت
          </Typography>
          <div className={classNames("container-fluid", classes.grid)}>
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
                  md={4}
                  data-aos="zoom-in-up"
                  data-aos-delay={
                    isWidthUp("md", width) ? element.mdDelay : element.smDelay
                  }
                  key={element.title}
                >
                  <Card
                    className={classes.root}
                    style={{ backgroundColor: "#00B8D4" }}
                  >
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
                  <FullScreenDialog
                    title="test"
                    component={
                      <Help language={this.state.language} width={width} />
                    }
                    handleClose={this.handleCloseDialog}
                    open={this.state.openIdentityDialog}
                  />
                </Grid>
              ))}
            </Grid>
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
