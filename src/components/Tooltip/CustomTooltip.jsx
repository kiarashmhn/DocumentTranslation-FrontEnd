import React, { Component } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import HelpIcon from "@material-ui/icons/Help";
import ErrorIcon from "@material-ui/icons/Error";
import { IconButton, Typography } from "@material-ui/core";
import PropTypes from "prop-types";

export default class CustomTooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleTooltipClose = () => {
    this.setState({
      open: false
    });
  };

  handleTooltipOpen = () => {
    this.setState({
      open: true
    });
  };

  render() {
    const dir = this.props.dir ? this.props.dir : "ltr";
    return (
      <ClickAwayListener onClickAway={this.handleTooltipClose}>
        <div style={{ maxWidth: "100%", width: "30px" }}>
          <Tooltip
            onClose={this.handleTooltipClose}
            open={this.state.open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={
              <div style={{ dir: dir, direction: dir }}>
                <Typography
                  style={{
                    whiteSpace: "pre-line",
                    direction: this.props.dir ? this.props.dir : "ltr"
                  }}
                  component={"div"}
                  dir={this.props.dir ? this.props.dir : "ltr"}
                  variant={"caption"}
                >
                  {this.props.text ? this.props.text : this.props.children}
                </Typography>
              </div>
            }
            arrow
          >
            <IconButton
              color="primary"
              aria-label="hint"
              component="span"
              onClick={this.handleTooltipOpen}
            >
              {this.props.icon && this.props.icon === "error" ? (
                <ErrorIcon />
              ) : (
                <HelpIcon />
              )}
            </IconButton>
          </Tooltip>
        </div>
      </ClickAwayListener>
    );
  }
}
CustomTooltip.propTypes = {
  text: PropTypes.any,
  children: PropTypes.any,
  icon: PropTypes.string,
  dir: PropTypes.string
};
