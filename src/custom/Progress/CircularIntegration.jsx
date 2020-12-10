import React, { Component } from "react";
import * as PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";

import Button from "components/CustomButtons/Button.jsx";

import classes from "./circularIntegration.module.css";

export default class CircularIntegration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  setLoading = someLoding => {
    this.setState({ loading: someLoding });
  };

  getState = () => {
    return this.state;
  };

  render() {
    return (
      <div className={classes.parent}>
        <div className={classes.child}>
          <Button
            color={this.props.buttonColor ? this.props.buttonColor : "primary"}
            variant="contained"
            disabled={this.state.loading || this.props.disabled}
            type={this.props.buttonType ? this.props.buttonType : "submit"}
            onClick={this.props.handleOnClick}
          >
            {this.props.title}
          </Button>
          {this.state.loading && (
            <CircularProgress
              size={24}
              style={{
                color: this.props.loadingColor
                  ? this.props.loadingColor
                  : "#9c27b0"
              }}
              className={classes.circularProg}
            />
          )}
        </div>
      </div>
    );
  }
}

CircularIntegration.propTypes = {
  title: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func,
  disabled: PropTypes.bool,
  buttonType: PropTypes.string,
  buttonColor: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
    "white",
    "transparent",
    "black"
  ]),
  loadingColor: PropTypes.string
};
