import React, { Component, memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Hidden,
  IconButton,
  withStyles
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import LockOpenIcon from "@material-ui/icons/LockOpen";
//import BookIcon from "@material-ui/icons/Book";
import NavigationDrawer from "../Template/NavigationDrawer";
import "../../index.css";

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
    fontFamily: "MyFont",
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
        name: "درباره ما",
        link: "/",
        onClick: selectAbout,
        icon: <HomeIcon className="text-white" />,
        mobileHide: true
      },
      {
        name: "راهنما",
        link: "/",
        onClick: selectHelp,
        icon: <HomeIcon className="text-white" />,
        mobileHide: true
      },
      {
        name: "امکانات",
        link: "/",
        onClick: selectFeatures,
        icon: <HomeIcon className="text-white" />,
        mobileHide: true
      },
      {
        link: "/",
        name: "صفحه اصلی",
        onClick: selectHomeSection,
        icon: <HomeIcon className="text-white" />
      },
      /*{
        link: "/blog",
        name: "بلاگ",
        icon: <BookIcon className="text-white" />
      },*/
      {
        name: "ثبت نام",
        onClick: openRegisterDialog,
        icon: <HowToRegIcon className="text-white" />
      },
      {
        name: "ورود",
        onClick: openLoginDialog,
        icon: <LockOpenIcon className="text-white" />
      }
    ];
    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <div>
              <Typography
                variant="h4"
                className={classes.brandText}
                display="inline"
                color="primary"
              >
                Document
              </Typography>
              <Typography
                variant="h4"
                className={classes.brandText}
                display="inline"
                color="secondary"
              >
                Translator
              </Typography>
            </div>
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
                  if (element.link) {
                    return (
                      <Link
                        key={element.name}
                        to={element.link}
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
                          size="large"
                          classes={{ text: classes.menuButtonText }}
                        >
                          {element.name}
                        </Button>
                      </Link>
                    );
                  }
                  return (
                    <Button
                      color="secondary"
                      size="large"
                      onClick={element.onClick}
                      classes={{ text: classes.menuButtonText }}
                      key={element.name}
                    >
                      {element.name}
                    </Button>
                  );
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
