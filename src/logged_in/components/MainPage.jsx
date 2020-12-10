import React, { memo, Fragment, Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core";
import Routing from "./Routing";
import NavBar from "./navigation/NavBar";
import smoothScrollTop from "../../shared/functions/smoothScrollTop";

const styles = theme => ({
  main: {
    marginLeft: theme.spacing(9),
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0
    }
  }
});

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: null
    };
  }

  componentDidMount() {
    this.selectCreateOrder();
  }

  setSelectedTab = tab => {
    this.setState(
      {
        selectedTab: tab
      },
      () => {
        console.log(this.state.selectedTab);
      }
    );
  };

  selectCreateOrder = () => {
    smoothScrollTop();
    document.title = "DT - CreateOrder";
    this.setSelectedTab("CreateOrder");
  };

  selectListOrder = () => {
    smoothScrollTop();
    document.title = "DT - ListOrder";
    this.setSelectedTab("ListOrder");
  };

  render() {
    return (
      <Fragment>
        <NavBar selectedTab={this.state.selectedTab} messages={[]} />
        <main className={classNames(this.props.classes.main)}>
          <Routing
            selectCreateOrder={this.selectCreateOrder}
            selectListOrder={this.selectListOrder}
          />
        </main>
      </Fragment>
    );
  }
}

MainPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(memo(MainPage));
