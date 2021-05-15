import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  withStyles,
  IconButton,
  Typography,
  withWidth,
  isWidthUp,
  Toolbar
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { getCompleteName } from "../../Dictionary";

const styles = theme => ({
  closeIcon: {
    marginRight: theme.spacing(0.5)
  },
  headSection: {
    width: 200
  },
  blackList: {
    backgroundColor: theme.palette.common.black,
    height: "100%"
  },
  noDecoration: {
    textDecoration: "none !important"
  }
});

class NavigationDrawer extends Component {
  constructor(props) {
    super(props);
  }

  resize = () => {
    window.onresize = () => {
      if (isWidthUp("sm", this.props.width) && this.props.open) {
        this.props.onClose();
      }
    };
  };

  render() {
    const {
      open,
      onClose,
      anchor,
      classes,
      menuItems,
      selectedItem,
      theme
    } = this.props;

    this.resize();

    return (
      <Drawer variant="temporary" open={open} onClose={onClose} anchor={anchor}>
        <Toolbar className={classes.headSection}>
          <ListItem
            style={{
              paddingTop: theme.spacing(0),
              paddingBottom: theme.spacing(0),
              height: "100%",
              justifyContent: anchor === "left" ? "flex-start" : "flex-end"
            }}
            disableGutters
          >
            <ListItemIcon className={classes.closeIcon}>
              <IconButton onClick={onClose} aria-label="Close Navigation">
                <CloseIcon color="primary" />
              </IconButton>
            </ListItemIcon>
          </ListItem>
        </Toolbar>
        <List className={classes.blackList}>
          {menuItems.map(element => {
            if (element.mobileHide) return null;
            if (element.link) {
              return (
                <Link
                  key={element.name}
                  to={element.link}
                  className={classes.noDecoration}
                  onClick={
                    element.onClick
                      ? () => {
                          element.onClick();
                          this.props.onClose();
                        }
                      : onClose
                  }
                >
                  <ListItem
                    button
                    selected={selectedItem === element.name}
                    /**
                     * We disable ripple as it will make a weird animation
                     * with primary and secondary color
                     */
                    disableRipple
                    disableTouchRipple
                  >
                    <ListItemIcon>{element.icon}</ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" className="text-white">
                          {element.persianName}
                        </Typography>
                      }
                    />
                  </ListItem>
                </Link>
              );
            }
            return (
              <ListItem button key={element.name} onClick={element.onClick}>
                <ListItemIcon>{element.icon}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" className="text-white">
                      {element.persianName}
                    </Typography>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    );
  }
}

NavigationDrawer.propTypes = {
  anchor: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  selectedItem: PropTypes.string
};

export default withWidth()(
  withStyles(styles, { withTheme: true })(NavigationDrawer)
);
