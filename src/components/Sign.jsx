import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import ControlledOpenSelect from "./Dropdown/Dropdown";
import { getCompleteName, getFrenchName, getPersianName } from "../Dictionary";
import PropTypes from "prop-types";
import FieldInput from "./CustomInput/FieldInput";
import CustomDateInput from "./CustomDateInput/CustomDateInput";

const initialState = {
  ministryConfirm: "",
  confirmDate: "",
  confirmNumber: ""
};
export default class Sign extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    if (this.props.initial) this.setState(this.props.initial);
  }

  componentDidUpdate() {
    if (this.props.initial && this.state === initialState)
      this.setState(this.props.initial);
  }

  onChange = (key, e) => {
    if (key === "ministryConfirm")
      this.setState({ confirmDate: "", confirmNumber: "" });
    this.setState({ [key]: e.target.value }, () => {
      this.props.onChange(this.state);
    });
  };

  onEdit = (key, value) => {
    this.setState({ [key]: value }, () => {
      this.props.onChange(this.state);
    });
  };

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} key={"ministryConfirm"}>
          <ControlledOpenSelect
            required
            value={this.state["ministryConfirm"]}
            keyId={"ministryConfirm"}
            onChange={event => this.onChange("ministryConfirm", event)}
            names={[
              {
                value: "yes",
                displayName: getCompleteName("yes")
              },
              {
                value: "no",
                displayName: getCompleteName("no")
              }
            ]}
            title={getFrenchName("ministryConfirm")}
            helperText={getPersianName("ministryConfirm")}
          />
        </Grid>
        {this.state.ministryConfirm === "yes" && (
          <Grid item xs={12} sm={12} md={4} key={"confirmNumber"}>
            <FieldInput
              name={"confirmNumber"}
              value={this.state["confirmNumber"]}
              onChange={event => this.onChange("confirmNumber", event)}
            />
          </Grid>
        )}
        {this.state.ministryConfirm === "yes" && (
          <Grid item xs={12} sm={12} md={4} key={"confirmNumber"}>
            <CustomDateInput
              name={"confirmDate"}
              initial={this.state.confirmDate}
              onChange={v => this.onEdit("confirmDate", v)}
            />
          </Grid>
        )}
      </Grid>
    );
  }
}
Sign.propTypes = {
  onChange: PropTypes.any.isRequired,
  initial: PropTypes.any
};
