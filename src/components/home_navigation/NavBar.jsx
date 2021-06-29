import React, { Component, memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Hidden,
  IconButton,
  withStyles,
  Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
//import BookIcon from "@material-ui/icons/Book";
import NavigationDrawer from "../Template/NavigationDrawer";
import "../../index.css";
import { getFrenchName, getPersianName } from "../../Dictionary";

const styles = theme => ({
  appBar: {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.common.white
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  menuButtonText: {
    fontFamily: `"MyFont","OS"`,
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
    color: theme.palette.primary.main
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400
  },
  noDecoration: {
    textDecoration: "none !important"
  },
  image: {
    display: "block",
    backgroundRepeat: "no-repeat",
    verticalAlign: "middle",
    borderRadius: theme.shape.borderRadius,
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/logged_out/logo.png)`,
    backgroundSize: "contain",
    height: "60px",
    width: "240px"
  }
});

class NavBar extends Component {
  render() {
    const {
      classes,
      openRegisterDialog,
      openLoginDialog,
      handleMobileDrawerOpen,
      handleMobileDrawerClose,
      mobileDrawerOpen,
      selectedTab,
      selectFeatures,
      selectAbout,
      selectHomeSection,
      selectHelp
    } = this.props;
    const menuItems = [
      {
        name: "FAQ",
        link: "/FAQ",
        onClick: () => {},
        icon: <LiveHelpIcon className="text-white" />
      },
      {
        name: "aboutUs",
        link: "/",
        onClick: selectAbout,
        icon: <HomeIcon className="text-white" />
      },
      {
        name: "help",
        link: "/",
        onClick: selectHelp,
        icon: <HomeIcon className="text-white" />
      },
      {
        name: "features",
        link: "/",
        onClick: selectFeatures,
        icon: <HomeIcon className="text-white" />
      },
      {
        link: "/",
        name: "homePage",
        onClick: selectHomeSection,
        icon: <HomeIcon className="text-white" />
      },
      /*{
        link: "/blog",
        name: "بلاگ",
        icon: <BookIcon className="text-white" />
      },*/
      {
        name: "register",
        onClick: openRegisterDialog,
        icon: <HowToRegIcon className="text-white" />
      },
      {
        name: "login",
        onClick: openLoginDialog,
        icon: <LockOpenIcon className="text-white" />
      }
    ];
    return (
      <div>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <div
              className={classes.image}
              onClick={selectHomeSection}
              style={{ cursor: "pointer" }}
            />
            <div>
              <Hidden mdUp>
                <IconButton
                  className={classes.menuButton}
                  onClick={handleMobileDrawerOpen}
                  aria-label="Open Navigation"
                >
                  <MenuIcon color="primary" />
                </IconButton>
              </Hidden>
              <Hidden smDown>
                {menuItems.map(element => {
                  if (element.name !== "login") {
                    if (element.link) {
                      return (
                        <Link
                          key={element.name}
                          to={{
                            pathname: element.link,
                            state: { noRedirect: true }
                          }}
                          className={classes.noDecoration}
                          onClick={
                            element.onClick
                              ? () => {
                                  this.props.handleMobileDrawerClose();
                                  element.onClick();
                                }
                              : handleMobileDrawerClose
                          }
                        >
                          <Button
                            color="secondary"
                            classes={{ text: classes.menuButtonText }}
                            style={{ textTransform: "none" }}
                          >
                            <div style={{ display: "block" }}>
                              <Typography
                                variant="body1"
                                align="center"
                                component={"span"}
                                style={{
                                  display: "block"
                                }}
                              >
                                {getFrenchName(element.name)}
                              </Typography>
                              <Typography
                                variant="body1"
                                align="center"
                                component={"span"}
                                style={{
                                  display: "block"
                                }}
                              >
                                {getPersianName(element.name)}
                              </Typography>
                            </div>
                          </Button>
                        </Link>
                      );
                    }
                    return (
                      <Button
                        color="secondary"
                        onClick={element.onClick}
                        classes={{ text: classes.menuButtonText }}
                        key={element.name}
                        style={{ textTransform: "none" }}
                      >
                        <div style={{ display: "block" }}>
                          <Typography
                            variant="body1"
                            align="center"
                            component={"span"}
                            style={{
                              display: "block"
                            }}
                          >
                            {getFrenchName(element.name)}
                          </Typography>
                          <Typography
                            variant="body1"
                            align="center"
                            component={"span"}
                            style={{
                              display: "block"
                            }}
                          >
                            {getPersianName(element.name)}
                          </Typography>
                        </div>
                      </Button>
                    );
                  } else if (element.name === "login") {
                    return (
                      <Button
                        color="secondary"
                        onClick={element.onClick}
                        classes={{ text: classes.menuButtonText }}
                        key={element.name}
                        style={{ textTransform: "none" }}
                      >
                        <div style={{ display: "block", lineHeight: "18pt" }}>
                          <span
                            id="textSpan1"
                            style={{
                              fontWeight: "bold",
                              display: "block",
                              align: "center"
                            }}
                          >
                            {getFrenchName(element.name)}
                          </span>
                          <span
                            id="textSpan2"
                            style={{
                              fontWeight: "bold",
                              display: "block",
                              align: "center"
                            }}
                          >
                            {getPersianName(element.name)}
                          </span>
                        </div>
                      </Button>
                    );
                  }
                })}
              </Hidden>
            </div>
          </Toolbar>
        </AppBar>
        <NavigationDrawer
          menuItems={menuItems}
          anchor="right"
          open={mobileDrawerOpen}
          selectedItem={selectedTab}
          onClose={handleMobileDrawerClose}
        />
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleMobileDrawerOpen: PropTypes.func,
  handleMobileDrawerClose: PropTypes.func,
  mobileDrawerOpen: PropTypes.bool,
  selectedTab: PropTypes.string,
  openRegisterDialog: PropTypes.func.isRequired,
  openLoginDialog: PropTypes.func.isRequired,
  selectFeatures: PropTypes.func.isRequired,
  selectAbout: PropTypes.func.isRequired,
  selectHelp: PropTypes.func.isRequired,
  selectHomeSection: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(memo(NavBar));
