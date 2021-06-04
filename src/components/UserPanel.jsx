import React, { memo, Fragment, Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Snackbar, withStyles } from "@material-ui/core";
import NavBar from "./navigation/NavBar";
import smoothScrollTop from "../functions/smoothScrollTop";
import CreateOrder from "./order/CreateOrder";
import ListOrder from "./order/ListOrder";
import Api from "./Api/Api";
import * as URLConstant from "../URLConstant";

const styles = theme => ({
  main: {
    marginRight: theme.spacing(9),
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
      marginRight: theme.spacing(0)
    },
    [theme.breakpoints.up("xs")]: {
      marginRight: theme.spacing(0)
    },
    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing(7)
    },
    [theme.breakpoints.up("md")]: {
      marginRight: theme.spacing(8)
    },
    [theme.breakpoints.up("lg")]: {
      marginRight: theme.spacing(9)
    }
  },
  wrapper: {
    margin: theme.spacing(1),
    width: "auto",
    [theme.breakpoints.up("xs")]: {
      width: "95%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4)
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(6),
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto"
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(6),
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto"
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(6),
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  root: {
    backgroundColor: "#e53935",
    cursor: "pointer",
    paddingTop: 0,
    paddingBottom: 0
  }
});

class UserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "dashboard",
      snackBar: false,
      stateBar: false,
      newMsg: false,
      changeState: false
    };
    this.api = new Api();
  }

  componentDidMount() {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function() {
      window.history.pushState(null, null, window.location.href);
    };

    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.selectedTab
    )
      this.setSelectedTab(this.props.location.state.selectedTab);
    else this.selectCreateOrder();

    this.getUser().then(() => {});
  }

  getUser = async () => {
    let self = this;
    await this.api
      .doPost(
        process.env.REACT_APP_HOST_URL +
          process.env.REACT_APP_MAIN_PATH +
          URLConstant.USER_GET,
        {}
      )
      .then(function(res) {
        if (res.data.hasNewMessage) {
          self.setState({ snackBar: true, newMsg: true });
        }
        if (res.data.changeState) {
          self.setState({ stateBar: true, changeState: true });
        }
      });
  };

  setSelectedTab = tab => {
    this.setState({
      selectedTab: tab
    });
  };

  selectCreateOrder = () => {
    smoothScrollTop();
    document.title = "FD - CreateOrder";
    this.setSelectedTab("CreateOrder");
  };

  selectListOrder = () => {
    smoothScrollTop();
    document.title = "FD - ListOrder";
    this.setSelectedTab("ListOrder");
    this.setState({
      stateBar: false,
      snackBar: false,
      newMsg: false,
      changeState: false
    });
  };

  handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackBar: false });
  };

  snackClick = () => {
    smoothScrollTop();
    document.title = "FD - ListOrder";
    this.setState({
      stateBar: false,
      snackBar: false,
      selectedTab: "ListOrder"
    });
  };

  handleCloseState = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ stateBar: false });
  };

  stateClick = () => {
    smoothScrollTop();
    document.title = "FD - ListOrder";
    this.setState({
      stateBar: false,
      snackBar: false,
      selectedTab: "ListOrder"
    });
  };

  render() {
    return (
      <Fragment>
        <NavBar
          selectedTab={this.state.selectedTab}
          selectCreateOrder={this.selectCreateOrder}
          selectListOrder={this.selectListOrder}
          notif={this.state.newMsg || this.state.changeState}
          messages={[]}
        />
        <div className={classNames(this.props.classes.main)}>
          <div className={classNames(this.props.classes.wrapper)}>
            {this.state.selectedTab === "CreateOrder" && <CreateOrder />}
            {this.state.selectedTab === "ListOrder" && <ListOrder />}
          </div>
        </div>
        <Snackbar
          disableWindowBlurListener
          key={"snackbarUser"}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          open={this.state.snackBar}
          autoHideDuration={20000}
          onClose={this.handleClose}
          ContentProps={{
            classes: {
              root: this.props.classes.root
            }
          }}
          message={
            <span onClick={() => this.snackClick()}>
              Vous avez un message/شما یک پیام دارید
            </span>
          }
        />
        <Snackbar
          disableWindowBlurListener
          key={"snackbarUser2"}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          open={this.state.stateBar}
          autoHideDuration={20000}
          onClose={this.handleCloseState}
          ContentProps={{
            classes: {
              root: this.props.classes.root
            }
          }}
          message={
            <span onClick={() => this.stateClick()}>
              Changement d’état de votre commande/تغییری در وضعیت سفارش
            </span>
          }
        />
      </Fragment>
    );
  }
}

UserPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.any
};

export default withStyles(styles, { withTheme: true })(memo(UserPanel));
