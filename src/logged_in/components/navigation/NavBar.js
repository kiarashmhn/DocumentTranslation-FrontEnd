import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Drawer,
  List,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  Tooltip,
  Box,
  withStyles,
  isWidthUp,
  withWidth
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import MessagePopperButton from "./MessagePopperButton";
import NavigationDrawer from "../../../shared/components/NavigationDrawer";
import theme from "../../../theme";
import AuthService from "../../../AuthService";

const styles = theme => ({
  appBar: {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.common.white,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginLeft: 0
    }
  },
  appBarToolbar: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4)
    }
  },
  accountAvatar: {
    backgroundColor: theme.palette.secondary.main,
    height: 24,
    width: 24,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(1.5),
      marginRight: theme.spacing(1.5)
    }
  },
  drawerPaper: {
    height: "100%vh",
    whiteSpace: "nowrap",
    border: 0,
    width: theme.spacing(7),
    overflowX: "hidden",
    marginTop: theme.spacing(8),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    },
    backgroundColor: theme.palette.common.black
  },
  smBordered: {
    [theme.breakpoints.down("xs")]: {
      borderRadius: "50% !important"
    }
  },
  menuLink: {
    textDecoration: "none",
    color: theme.palette.text.primary
  },
  iconListItem: {
    width: "auto",
    borderRadius: theme.shape.borderRadius,
    paddingTop: 11,
    paddingBottom: 11,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  textPrimary: {
    color: theme.palette.primary.main,
    fontFamily: "MyFont",
    useNextVariants: true,
    direction: "rtl"
  },
  mobileItemSelected: {
    backgroundColor: `${theme.palette.primary.main} !important`
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400
  },
  username: {
    paddingLeft: 0,
    paddingRight: theme.spacing(2)
  },
  justifyCenter: {
    justifyContent: "center"
  },
  permanentDrawerListItem: {
    justifyContent: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
});

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobileOpen: false,
      isSideDrawerOpen: false,
      mobileItems: []
    };
    this.auth = new AuthService();
  }

  setIsMobileOpen = value => {
    this.setState({
      isMobileOpen: value
    });
  };

  setIsSideDrawerOpen = value => {
    this.setState({
      isSideDrawerOpen: value
    });
  };

  openMobileDrawer = () => {
    this.setIsMobileOpen(true);
  };

  closeMobileDrawer = () => {
    this.setIsMobileOpen(false);
  };

  render() {
    let menuItems = [
      {
        link: "/userPanel/dashboard",
        name: "داشبورد",
        onClick: this.closeMobileDrawer,
        icon: {
          desktop: (
            <DashboardIcon
              className={
                this.props.selectedTab === "Dashboard"
                  ? this.props.classes.textPrimary
                  : "text-white"
              }
              fontSize="large"
            />
          ),
          mobile: <DashboardIcon className="text-white" />
        }
      },
      {
        link: "/userPanel/CreateOrder",
        name: "ثبت سفارش",
        onClick: this.closeMobileDrawer,
        icon: {
          desktop: (
            <AddShoppingCartIcon
              className={
                this.props.selectedTab === "CreateOrder"
                  ? this.props.classes.textPrimary
                  : "text-white"
              }
              fontSize="large"
            />
          ),
          mobile: <AddShoppingCartIcon className="text-white" />
        }
      },
      {
        link: "/",
        name: "خروج",
        onClick: this.auth.logout,
        icon: {
          desktop: (
            <PowerSettingsNewIcon className="text-white" fontSize="large" />
          ),
          mobile: <PowerSettingsNewIcon className="text-white" />
        }
      }
    ];
    return (
      <Fragment>
        <AppBar position="sticky" className={this.props.classes.appBar}>
          <Toolbar className={this.props.classes.appBarToolbar}>
            <Box display="flex" alignItems="center">
              <Hidden xsDown>
                <Typography
                  variant="h4"
                  className={this.props.classes.brandText}
                  display="inline"
                  color="primary"
                >
                  Document
                </Typography>
                <Typography
                  variant="h4"
                  className={this.props.classes.brandText}
                  display="inline"
                  color="secondary"
                >
                  Translator
                </Typography>
              </Hidden>
            </Box>
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              width="100%"
            >
              <MessagePopperButton messages={this.props.messages} />
              <ListItem
                disableGutters
                className={classNames(
                  this.props.classes.iconListItem,
                  this.props.classes.smBordered
                )}
              >
                <Avatar
                  alt="profile picture"
                  src={`${process.env.PUBLIC_URL}/images/logged_in/profilePicture.jpg`}
                  className={classNames(this.props.classes.accountAvatar)}
                />
                {isWidthUp("sm", this.props.width) && (
                  <ListItemText
                    className={this.props.classes.username}
                    primary={
                      <Typography color="textPrimary" style={theme.typography}>
                        {this.auth.getUsername()}
                      </Typography>
                    }
                  />
                )}
              </ListItem>
              <Hidden smUp>
                <Box mr={1}>
                  <IconButton
                    aria-label="Open Navigation"
                    onClick={this.openMobileDrawer}
                    color="primary"
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>
              </Hidden>
            </Box>
          </Toolbar>
        </AppBar>
        <Hidden xsDown>
          <Drawer //  both drawers can be combined into one for performance
            variant="permanent"
            classes={{
              paper: this.props.classes.drawerPaper
            }}
            open={false}
          >
            <List>
              {menuItems.map((element, index) => (
                <Link
                  to={element.link}
                  className={this.props.classes.menuLink}
                  onClick={element.onClick}
                  key={index}
                >
                  <Tooltip
                    style={theme.typography}
                    title={element.name}
                    placement="right"
                    key={element.name}
                  >
                    <ListItem
                      selected={this.props.selectedTab === element.name}
                      button
                      divider={index !== menuItems.length - 1}
                      className={this.props.classes.permanentDrawerListItem}
                      onClick={() => {}}
                      aria-label={
                        element.name === "Logout"
                          ? "Logout"
                          : `Go to ${element.name}`
                      }
                    >
                      <ListItemIcon
                        className={this.props.classes.justifyCenter}
                      >
                        {element.icon.desktop}
                      </ListItemIcon>
                    </ListItem>
                  </Tooltip>
                </Link>
              ))}
            </List>
          </Drawer>
        </Hidden>
        <NavigationDrawer
          menuItems={menuItems.map(element => ({
            link: element.link,
            name: element.name,
            icon: element.icon.mobile,
            onClick: element.onClick
          }))}
          anchor="right"
          open={this.state.isMobileOpen}
          selectedItem={this.props.selectedTab}
          onClose={this.closeMobileDrawer}
        />
      </Fragment>
    );
  }
}

NavBar.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedTab: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withWidth()(withStyles(styles, { withTheme: true })(NavBar));
