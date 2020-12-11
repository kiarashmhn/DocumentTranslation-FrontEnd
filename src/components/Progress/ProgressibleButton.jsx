import React, { Component } from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import DynamicallyIcon from "../../utils/DynamicallyIcon";
import CircularIndeterminate from "./CircularProgress";

import IconButton from "@material-ui/core/IconButton";

const useStyles = () => ({
  zeroPadding: {
    padding: "0px"
  }
});

class ProgressibleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  setLoding = loading => {
    this.setState({ loading: loading });
  };

  handleLoding = () => {
    this.setState({ loading: true }, () => {
      this.props.passedFunction();
    });
  };
  render() {
    // eslint-disable-next-line react/prop-types
    const { classes } = this.props;
    return (
      <>
        {this.state.loading ? (
          <CircularIndeterminate />
        ) : (
          <IconButton
            href={""}
            onClick={() => this.handleLoding()}
            className={classes.zeroPadding}
            style={{ color: this.props.color }}
          >
            <DynamicallyIcon icon={this.props.icon} />
          </IconButton>
        )}
      </>
    );
  }
}

export default withStyles(useStyles)(ProgressibleButton);

ProgressibleButton.propTypes = {
  passedFunction: PropTypes.func,
  icon: PropTypes.any,
  color: PropTypes.string
};
