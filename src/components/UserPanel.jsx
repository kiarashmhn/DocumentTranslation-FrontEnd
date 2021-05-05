import React, { memo, Fragment, Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core";
import NavBar from "./navigation/NavBar";
import smoothScrollTop from "../functions/smoothScrollTop";
import CreateOrder from "./order/CreateOrder";
import ListOrder from "./order/ListOrder";

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
  }
});

class UserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "dashboard"
    };
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
  }

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
  };

  render() {
    return (
      <Fragment>
        <NavBar
          selectedTab={this.state.selectedTab}
          selectCreateOrder={this.selectCreateOrder}
          selectListOrder={this.selectListOrder}
          messages={[]}
        />
        <div className={classNames(this.props.classes.main)}>
          <div className={classNames(this.props.classes.wrapper)}>
            {this.state.selectedTab === "CreateOrder" && <CreateOrder />}
            {this.state.selectedTab === "ListOrder" && <ListOrder />}
          </div>
        </div>
      </Fragment>
    );
  }
}

UserPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.any
};

export default withStyles(styles, { withTheme: true })(memo(UserPanel));
