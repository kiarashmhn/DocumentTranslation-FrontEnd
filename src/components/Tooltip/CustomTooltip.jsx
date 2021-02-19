import React, { Component } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import HelpIcon from "@material-ui/icons/Help";
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
    return (
      <ClickAwayListener onClickAway={this.handleTooltipClose}>
        <div>
          <Tooltip
            PopperProps={{
              disablePortal: true
            }}
            onClose={this.handleTooltipClose}
            open={this.state.open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={
              <Typography
                style={{ whiteSpace: "pre-line" }}
                dir={this.props.dir ? this.props.dir : "ltr"}
                variant={"caption"}
              >
                {this.props.text}
              </Typography>
            }
            arrow
          >
            <IconButton
              color="primary"
              aria-label="hint"
              component="span"
              onClick={this.handleTooltipOpen}
            >
              <HelpIcon />
            </IconButton>
          </Tooltip>
        </div>
      </ClickAwayListener>
    );
  }
}
CustomTooltip.propTypes = {
  text: PropTypes.string.isRequired,
  dir: PropTypes.string
};
