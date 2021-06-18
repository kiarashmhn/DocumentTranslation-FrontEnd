import React, { Component } from "react";
import PropTypes from "prop-types";
import CustomDateInput from "./CustomDateInput";
import Grid from "@material-ui/core/Grid";
import { getCompleteName, getHint } from "../../Dictionary";
import ControlledOpenSelect from "../Dropdown/Dropdown";
import FieldInput from "../CustomInput/FieldInput";
import CustomTooltip from "../Tooltip/CustomTooltip";

const initialState = {
  mode: 1,
  age: "",
  inYear: ""
};

export default class ComplexDateInput extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.dateInputRef = React.createRef();
  }

  setStateFromInitial = initial => {
    if (initial.toString().includes("[")) {
      this.setState({
        mode: 2,
        age: initial.substring(0, initial.lastIndexOf("[")),
        inYear: initial.substring(
          initial.lastIndexOf("[") + 1,
          initial.lastIndexOf("]")
        )
      });
    } else {
      this.setState({ mode: 1 });
    }
  };

  componentDidMount() {
    if (this.props.initial) this.setStateFromInitial(this.props.initial);
  }

  componentDidUpdate() {
    if (this.props.initial && this.state === initialState)
      this.setStateFromInitial(this.props.initial);
  }

  getState = () => {
    if (this.state.mode === 1)
      return this.dateInputRef
        ? this.dateInputRef.current
          ? this.dateInputRef.current.getState()
          : ""
        : "";
    else return this.state.age + "[" + this.state.inYear + "]";
  };

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={11} sm={5} md={5}>
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
            title={"Date de naissance ou âge estimé"}
            helperText={"تاریخ تولد یا عمر/ د زیږیدلو نیټه او عمر"}
          />
        </Grid>
        <Grid item xs={1} sm={1} md={1}>
          <div style={{ marginTop: "43px" }}>
            <CustomTooltip>
              <div>{getHint("aBirthDate").french}</div>
              <div dir={"rtl"}>{getHint("aBirthDate").persian}</div>
            </CustomTooltip>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          {this.state.mode === 1 && (
            <CustomDateInput
              hideHelper={true}
              ref={this.dateInputRef}
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
