import React, { Component } from "react";
import PropTypes from "prop-types";
import CustomDateInput from "./CustomDateInput";
import Grid from "@material-ui/core/Grid";
import {
  getCompleteName,
  getFrenchName,
  getPersianName
} from "../../Dictionary";
import ControlledOpenSelect from "../Dropdown/Dropdown";
import FieldInput from "../CustomInput/FieldInput";

export default class ComplexDateInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 1,
      age: "",
      inYear: ""
    };
    this.dateInputRef = React.createRef();
  }

  getState = () => {
    if (this.state.mode > 1) return this.dateInputRef.current.getState();
    return this.state.age + "[" + this.state.inYear + "]";
  };

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={6}>
          <ControlledOpenSelect
            required={this.props.required}
            value={this.state.mode}
            keyId={"mode"}
            onChange={event => this.setState({ mode: event.target.value })}
            names={[
              {
                value: 1,
                displayName: getCompleteName("exactDate")
              },
              {
                value: 2,
                displayName: getCompleteName("approximateDate")
              }
            ]}
            title={
              getFrenchName("entryMode") +
              " " +
              getFrenchName(this.props.name).toLowerCase()
            }
            helperText={
              getPersianName("entryMode") +
              " " +
              getPersianName(this.props.name)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          {this.state.mode === 1 && (
            <CustomDateInput
              name={this.props.name}
              onChange={() => this.props.onChange(this.getState())}
              initial={this.props.initial}
            />
          )}
          {this.state.mode === 2 && (
            <Grid container spacing={1}>
              <Grid item xs={6} sm={6} md={6}>
                <FieldInput
                  name={"age"}
                  value={this.state.age}
                  onChange={event =>
                    this.setState({ age: event.target.value }, () => {
                      this.props.onChange(this.getState());
                    })
                  }
                  notRequired={!this.props.required}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <FieldInput
                  name={"inYear"}
                  value={this.state.inYear}
                  onChange={event =>
                    this.setState({ inYear: event.target.value }, () => {
                      this.props.onChange(this.getState());
                    })
                  }
                  notRequired={!this.props.required}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  }
}
ComplexDateInput.propTypes = {
  name: PropTypes.string.isRequired,
  initial: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired
};
