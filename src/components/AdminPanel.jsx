import React, { memo, Fragment, Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core";
import smoothScrollTop from "../functions/smoothScrollTop";
import ListOrder from "./order/ListOrder";
import AdminNavBar from "./navigation/AdminNavBar";

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
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto"
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto"
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
});

class AdminPanel extends Component {
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
    this.selectListOrder();
  }

  setSelectedTab = tab => {
    this.setState({
      selectedTab: tab
    });
  };

  selectListOrder = () => {
    smoothScrollTop();
    document.title = "FD - ListOrder";
    this.setSelectedTab("ListOrder");
  };

  render() {
    return (
      <Fragment>
        <AdminNavBar
          selectedTab={this.state.selectedTab}
          selectListOrder={this.selectListOrder}
          messages={[]}
        />
        <div className={classNames(this.props.classes.main)}>
          <div className={classNames(this.props.classes.wrapper)}>
            {this.state.selectedTab === "ListOrder" && (
              <ListOrder type={"ADMIN"} />
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

AdminPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(memo(AdminPanel));
