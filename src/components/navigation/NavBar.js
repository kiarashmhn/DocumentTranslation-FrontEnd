import React, { Fragment, useRef, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  AppBar,
  Toolbar,
  Typography,
  //Avatar,
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
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import MenuIcon from "@material-ui/icons/Menu";
//import MessagePopperButton from "./MessagePopperButton";
import NavigationDrawer from "../Template/NavigationDrawer";
import ListIcon from "@material-ui/icons/List";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import AuthService from "../../AuthService";
import EditUserDialog from "../register_login/EditUserDialog";
import PersonIcon from "@material-ui/icons/Person";
import Badge from "@material-ui/core/Badge";

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
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      paddingRight: theme.spacing(2)
    },
    [theme.breakpoints.up("md")]: {
      paddingRight: theme.spacing(3)
    },
    [theme.breakpoints.up("lg")]: {
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
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  textPrimary: {
    color: theme.palette.secondary.main,
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
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  justifyCenter: {
    justifyContent: "center"
  },
  permanentDrawerListItem: {
    justifyContent: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  image: {
    display: "block",
    backgroundRepeat: "no-repeat",
    verticalAlign: "middle",
    borderRadius: theme.shape.borderRadius,
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/logged_out/logo.png)`,
    backgroundSize: "contain",
    height: "60px",
    width: "220px"
  }
});

function NavBar(props) {
  const {
    selectedTab,
    //messages,
    classes,
    width,
    selectCreateOrder,
    selectListOrder,
    notif
  } = props;
  // Will be use to make website more accessible by screen readers
  const links = useRef([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const openProfile = useCallback(() => {
    setProfileOpen(true);
  }, [setProfileOpen]);

  const closeProfile = useCallback(() => {
    setProfileOpen(false);
  }, [setProfileOpen]);

  const openMobileDrawer = useCallback(() => {
    setIsMobileOpen(true);
  }, [setIsMobileOpen]);

  const closeMobileDrawer = useCallback(() => {
    setIsMobileOpen(false);
  }, [setIsMobileOpen]);

  const Auth = new AuthService();

  const menuItems = [
    {
      name: "profile",
      persianName: "پروفایل",
      onClick: () => openProfile(),
      icon: {
        desktop: (
          <PersonIcon
            className={profileOpen ? classes.textPrimary : "text-white"}
            fontSize="large"
          />
        ),
        mobile: <PersonIcon className="text-white" />
      }
    },
    {
      name: "ListOrder",
      persianName: "لیست سفارش ها",
      onClick: () => {
        closeMobileDrawer();
        selectListOrder();
      },
      icon: {
        desktop: (
          <Badge color={"error"} variant={"dot"} invisible={!notif}>
            <ListIcon
              className={
                selectedTab === "ListOrder" ? classes.textPrimary : "text-white"
              }
              fontSize="large"
            />
          </Badge>
        ),
        mobile: (
          <Badge color={"error"} variant={"dot"} invisible={!notif}>
            <ListIcon className="text-white" />
          </Badge>
        )
      }
    },
    {
      name: "CreateOrder",
      persianName: "ثبت سفارش",
      onClick: () => {
        closeMobileDrawer();
        selectCreateOrder();
      },
      icon: {
        desktop: (
          <AddShoppingCartIcon
            className={
              selectedTab === "CreateOrder" ? classes.textPrimary : "text-white"
            }
            fontSize="large"
          />
        ),
        mobile: <AddShoppingCartIcon className="text-white" />
      }
    },
    {
      link: "/",
      name: "Logout",
      persianName: "خروج",
      onClick: Auth.logout,
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
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar className={classes.appBarToolbar}>
          <Box display="flex" alignItems="center">
            <Hidden smUp>
              <Box mr={1}>
                <IconButton
                  aria-label="Open Navigation"
                  onClick={openMobileDrawer}
                  color="primary"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Hidden>
            <Link
              to={{ pathname: "/", state: { noRedirect: true } }}
              className={classes.menuLink}
              key={"logo"}
            >
              <div className={classes.image} style={{ cursor: "pointer" }} />
            </Link>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width="100%"
          >
            {/*<MessagePopperButton messages={messages} />*/}
            <ListItem
              disableGutters
              className={classNames(classes.iconListItem, classes.smBordered)}
            >
              {/*<Avatar
                alt="profile picture"
                src={`${process.env.PUBLIC_URL}/images/logged_in/profilePicture.jpg`}
                className={classNames(classes.accountAvatar)}
              />*/}
              {profileOpen && (
                <EditUserDialog
                  name={Auth.getUsername()}
                  onClose={closeProfile}
                />
              )}
              {isWidthUp("sm", width) && (
                <ListItemText
                  className={classes.username}
                  primary={
                    <Typography color="textPrimary">
                      {Auth.getUsername()}
                    </Typography>
                  }
                />
              )}
            </ListItem>
          </Box>
        </Toolbar>
      </AppBar>
      <Hidden xsDown>
        <Drawer //  both drawers can be combined into one for performance
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          open={false}
        >
          <List>
            {menuItems.map((element, index) => {
              if (element.link)
                return (
                  <Link
                    to={element.link}
                    className={classes.menuLink}
                    onClick={element.onClick}
                    key={index}
                    ref={node => {
                      links.current[index] = node;
                    }}
                  >
                    <Tooltip
                      title={element.persianName}
                      placement="left"
                      key={element.persianName}
                    >
                      <ListItem
                        selected={selectedTab === element.name}
                        button
                        divider={index !== menuItems.length - 1}
                        className={classes.permanentDrawerListItem}
                        onClick={() => {
                          links.current[index].click();
                        }}
                        aria-label={
                          element.name === "Logout"
                            ? "Logout"
                            : `Go to ${element.name}`
                        }
                      >
                        <ListItemIcon className={classes.justifyCenter}>
                          {element.icon.desktop}
                        </ListItemIcon>
                      </ListItem>
                    </Tooltip>
                  </Link>
                );
              return (
                <Tooltip
                  title={element.persianName}
                  placement="left"
                  key={element.persianName}
                >
                  <ListItem
                    button
                    selected={selectedTab === element.name}
                    divider={index !== menuItems.length - 1}
                    className={classes.permanentDrawerListItem}
                    key={element.name}
                    onClick={element.onClick}
                    aria-label={
                      element.name === "Logout"
                        ? "Logout"
                        : `Go to ${element.name}`
                    }
                  >
                    <ListItemIcon className={classes.justifyCenter}>
                      {element.icon.desktop}
                    </ListItemIcon>
                  </ListItem>
                </Tooltip>
              );
            })}
          </List>
        </Drawer>
      </Hidden>
      <NavigationDrawer
        menuItems={menuItems.map(element => ({
          link: element.link,
          name: element.name,
          persianName: element.persianName,
          icon: element.icon.mobile,
          onClick: element.onClick
        }))}
        anchor="right"
        open={isMobileOpen}
        selectedItem={selectedTab}
        onClose={closeMobileDrawer}
      />
    </Fragment>
  );
}

NavBar.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  notif: PropTypes.bool,
  selectedTab: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  selectListOrder: PropTypes.func.isRequired,
  selectCreateOrder: PropTypes.func.isRequired
};

export default withWidth()(withStyles(styles, { withTheme: true })(NavBar));
