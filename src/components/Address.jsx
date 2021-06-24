import React, { Component } from "react";
import * as PropTypes from "prop-types";
import FieldInput from "./CustomInput/FieldInput";
import Grid from "@material-ui/core/Grid";
import ControlledOpenSelect from "./Dropdown/Dropdown";
import { getCompleteName, getFrenchName, getPersianName } from "../Dictionary";

const initialState = {
  tempAddress: "",
  tempName: "",
  tempCity: "",
  tempPostalCode: "",
  address: "",
  nameOrCompany: "",
  postalCode: "",
  city: "",
  otherAddress: false
};

export default class Address extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  updateState = () => {
    if (this.props.initial && this.state === initialState)
      this.setState({
        tempAddress: this.props.initial.tempAddress
          ? this.props.initial.tempAddress
          : "",
        tempName: this.props.initial.tempName
          ? this.props.initial.tempName
          : "",
        tempCity: this.props.initial.tempCity
          ? this.props.initial.tempCity
          : "",
        tempPostalCode: this.props.initial.tempPostalCode
          ? this.props.initial.tempPostalCode
          : "",
        address: this.props.initial.address ? this.props.initial.address : "",
        nameOrCompany: this.props.initial.nameOrCompany
          ? this.props.initial.nameOrCompany
          : "",
        city: this.props.initial.city ? this.props.initial.city : "",
        postalCode: this.props.initial.postalCode
          ? this.props.initial.postalCode
          : "",
        otherAddress: this.props.initial.otherAddress
          ? this.props.initial.otherAddress
          : false
      });
  };

  componentDidMount() {
    this.updateState();
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.updateState();
  }

  changeState = () => {
    this.props.onChange({
      tempAddress: this.state.tempAddress,
      tempName: this.state.tempName,
      tempCity: this.state.tempCity,
      tempPostalCode: this.state.tempPostalCode,
      address:
        this.state.address.length > 0
          ? this.state.address
          : this.state.tempAddress,
      nameOrCompany:
        this.state.nameOrCompany.length > 0
          ? this.state.nameOrCompany
          : this.state.tempName,
      city: this.state.city.length > 0 ? this.state.city : this.state.tempCity,
      postalCode:
        this.state.postalCode.length > 0
          ? this.state.postalCode
          : this.state.tempPostalCode,
      otherAddress: this.state.otherAddress
    });
  };

  onChange = (e, key) => {
    this.setState(
      {
        [key]: e.target.value
      },
      () => {
        this.changeState();
      }
    );
  };

  onChangeReset = (e, key) => {
    this.setState({
      [key]: e.target.value,
      address: "",
      nameOrCompany: "",
      postalCode: "",
      city: ""
    });
  };

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} md={8}>
          <FieldInput
            name={"nameOrCompany"}
            value={this.state["tempName"]}
            onChange={event => this.onChange(event, "tempName")}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FieldInput
            name={"address"}
            value={this.state["tempAddress"]}
            onChange={event => this.onChange(event, "tempAddress")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FieldInput
            name={"postalCode"}
            value={this.state["tempPostalCode"]}
            onChange={event => this.onChange(event, "tempPostalCode")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FieldInput
            name={"city"}
            value={this.state["tempCity"]}
            onChange={event => this.onChange(event, "tempCity")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <ControlledOpenSelect
            value={this.state["otherAddress"]}
            keyId={"otherAddress"}
            onChange={event => this.onChangeReset(event, "otherAddress")}
            names={[
              { value: true, displayName: getCompleteName("yes") },
              { value: false, displayName: getCompleteName("no") }
            ]}
            title={getFrenchName("otherAddress")}
            helperText={getPersianName("otherAddress")}
          />
        </Grid>
        {this.state.otherAddress && (
          <Grid item xs={12} sm={8} md={8}>
            <FieldInput
              name={"nameOrCompany"}
              value={this.state["nameOrCompany"]}
              onChange={event => this.onChange(event, "nameOrCompany")}
            />
          </Grid>
        )}
        {this.state.otherAddress && (
          <Grid item xs={12} sm={12} md={12}>
            <FieldInput
              name={"address"}
              value={this.state["address"]}
              onChange={event => this.onChange(event, "address")}
            />
          </Grid>
        )}
        {this.state.otherAddress && (
          <Grid item xs={12} sm={6} md={4}>
            <FieldInput
              name={"postalCode"}
              value={this.state["postalCode"]}
              onChange={event => this.onChange(event, "postalCode")}
            />
          </Grid>
        )}
        {this.state.otherAddress && (
          <Grid item xs={12} sm={6} md={4}>
            <FieldInput
              name={"city"}
              value={this.state["city"]}
              onChange={event => this.onChange(event, "city")}
            />
          </Grid>
        )}
      </Grid>
    );
  }
}

Address.propTypes = {
  initial: PropTypes.any,
  onChange: PropTypes.func
};
