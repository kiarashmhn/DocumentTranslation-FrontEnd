import React, { Component } from "react";
import * as PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import { getCompleteName, getHint } from "../../Dictionary";
import CustomTooltip from "../Tooltip/CustomTooltip";
import CustomDateInput from "../CustomDateInput/CustomDateInput";

const initialState = {
  check: false,
  date: null
};

export default class LicenseType extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.initialState
      ? this.props.initialState
      : initialState;
  }

  componentDidMount() {
    if (this.props.initialState) this.setState(this.props.initialState);
  }

  componentDidUpdate() {
    if (this.props.initialState && this.state === initialState)
      this.setState(this.props.initialState);
  }

  onChange = (key, event) => {
    this.setState(
      {
        [key]: event.target.value
      },
      () => {
        this.props.onChange(this.state);
      }
    );
  };

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} key={this.props.name + "key"}>
          <div
            style={{
              marginTop: "43px",
              alignItems: "center",
              display: "inline-flex"
            }}
          >
            <Checkbox
              checked={!!this.state.check}
              onChange={e =>
                this.setState({ check: e.target.checked }, () => {
                  this.props.onChange(this.state);
                })
              }
              name={this.props.name + "name"}
              color="secondary"
            />
            <span style={{ display: "contents" }}>
              {getCompleteName(this.props.name)}
              {getHint(this.props.name) && (
                <CustomTooltip>
                  <div>{getHint(this.props.name).french}</div>
                  <div dir={"rtl"}>{getHint(this.props.name).persian}</div>{" "}
                </CustomTooltip>
              )}
            </span>
          </div>
        </Grid>
        {this.state.check && (
          <Grid item xs={12} sm={12} md={4} key={this.props.valueKey + "key"}>
            <CustomDateInput
              name={this.props.valueKey}
              initial={
                this.props.initialState ? this.props.initialState.date : ""
              }
              onChange={value => this.onChange("date", value)}
            />
          </Grid>
        )}
      </Grid>
    );
  }
}

LicenseType.propTypes = {
  name: PropTypes.any.isRequired,
  valueKey: PropTypes.any.isRequired,
  initialState: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  valueRequired: PropTypes.any,
  defaultValue: PropTypes.any
};
