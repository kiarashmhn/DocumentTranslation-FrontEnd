import React, { Component, Fragment } from "react";
import * as PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
  withStyles,
  withWidth
} from "@material-ui/core";
import calculateSpacing from "../home/calculateSpacing";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Clear";
import { getCompleteName } from "../../Dictionary";

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
    marginTop: `${theme.spacing(8)}px !important`,
    [theme.breakpoints.down("md")]: {
      marginTop: `${theme.spacing(6)}px !important`
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: `${theme.spacing(4)}px !important`
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: `${theme.spacing(4)}px !important`
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

const methods = [
  {
    title: "واریز به حساب",
    frenchTitle: "Déposer sur le compte",
    content: <Fragment />
  },
  {
    title: "ارسال چک",
    frenchTitle: "Envoyez un chèque",
    content: <Fragment />
  },
  {
    title: "از طریق درگاه پرداخت",
    frenchTitle: "Via la passerelle de paiement",
    content: <Fragment />
  }
];

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      isLoading: false,
      idx: 0
    };
  }

  handleOpenDialog = idx => {
    this.setState({
      openDialog: true,
      idx: idx
    });
  };

  handleCloseDialog = () => {
    this.setState({
      openDialog: false
    });
  };

  render() {
    const { width, classes } = this.props;
    return (
      <Fragment>
        <Typography
          gutterBottom
          variant="h4"
          component="h2"
          align="center"
          style={{ whiteSpace: "pre-line" }}
        >
          Payer
        </Typography>
        <Typography
          gutterBottom
          variant="h4"
          component="h2"
          align="center"
          style={{ whiteSpace: "pre-line" }}
        >
          پرداخت هزینه
        </Typography>
        <div className={classes.thirdHeader}>
          <Grid
            container
            spacing={calculateSpacing(width)}
            alignItems="center"
            justify="center"
            alignContent={"center"}
          >
            <Grid item xs={6} md={3}>
              <Typography
                gutterBottom
                variant="h6"
                component="h6"
                align="center"
              >
                {this.props.type.price +
                  "€" +
                  " : " +
                  getCompleteName("amount")}
              </Typography>
            </Grid>
          </Grid>
        </div>
        <div className={classes.thirdHeader}>
          <Typography gutterBottom variant="h6" component="h6" align="center">
            Méthodes de payement
          </Typography>
        </div>
        <div className={classes.secondaryHeader}>
          <Typography gutterBottom variant="h6" component="h6" align="center">
            روش های پرداخت
          </Typography>
        </div>
        <Grid
          container
          spacing={calculateSpacing(width)}
          alignItems="center"
          justify="center"
          alignContent={"center"}
        >
          {methods.map((element, idx) => (
            <Grid item xs={6} md={3} key={"step" + idx}>
              <Card style={{ backgroundColor: "#D2D2D2" }}>
                <CardActionArea onClick={() => this.handleOpenDialog(idx)}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="body1"
                      component="h2"
                      align="center"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {element.frenchTitle}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body1"
                      component="h2"
                      align="center"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {element.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Dialog
          open={this.state.openDialog}
          scroll="paper"
          onClose={this.handleCloseDialog}
          hideBackdrop
        >
          <DialogActions>
            <IconButton
              aria-label="delete"
              color="secondary"
              onClick={this.handleCloseDialog}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </DialogActions>
          <DialogContent>
            <Typography
              variant="h6"
              color="primary"
              paragraph
              style={{ whiteSpace: "pre-line" }}
              align={"center"}
            >
              {methods[this.state.idx].frenchTitle}
            </Typography>
            <Typography
              variant="h6"
              color="primary"
              paragraph
              style={{ whiteSpace: "pre-line" }}
              align={"center"}
            >
              {methods[this.state.idx].title}
            </Typography>
            {methods[this.state.idx].content}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

Payment.propTypes = {
  width: PropTypes.string.isRequired,
  orderId: PropTypes.number.isRequired,
  type: PropTypes.object.isRequired,
  classes: PropTypes.any.isRequired,
  amount: PropTypes.any
};

export default withWidth()(withStyles(styles, { withTheme: true })(Payment));
