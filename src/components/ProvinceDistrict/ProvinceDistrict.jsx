import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import {
  getCompleteName,
  getFrenchName,
  getPersianName
} from "../../Dictionary";
import ControlledOpenSelect from "../Dropdown/Dropdown";
import * as PropTypes from "prop-types";
import provinces, { getDistricts } from "../order/Provinces";
import FormHelperText from "@material-ui/core/FormHelperText";
import FieldInput from "../CustomInput/FieldInput";

export default class ProvinceDistrict extends Component {
  constructor(props) {
    super(props);
    this.state = {
      province: this.props.province ? this.props.province : "",
      district: this.props.district ? this.props.district : "",
      village: this.props.village ? this.props.village : ""
    };
  }

  getState = () => {
    return {
      province: this.state.province,
      district: this.state.district,
      village: this.state.village
    };
  };

  render() {
    return (
      <Fragment>
        <div
          style={{
            display: "flex",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
            direction: "ltr",
            paddingTop: 10,
            bottom: 0
          }}
        >
          <FormHelperText
            style={{
              color: "#000000",
              marginTop: "2px"
            }}
          >
            {getCompleteName(this.props.name)}
          </FormHelperText>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4} key={"province"}>
            <ControlledOpenSelect
              required={this.props.required}
              value={this.state.province}
              keyId={"province"}
              onChange={event =>
                this.setState({ province: event.target.value, district: "" })
              }
              names={Object.keys(provinces).map(function(option) {
                let p = provinces[option];
                return {
                  value: p.french,
                  displayName: p.french + " / " + p.persian
                };
              })}
              title={getFrenchName(this.props.provinceKey)}
              helperText={getPersianName(this.props.provinceKey)}
              disabled={false}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"district"}>
            <ControlledOpenSelect
              required={this.props.required}
              value={this.state.district}
              keyId={"district"}
              onChange={event =>
                this.setState({ district: event.target.value })
              }
              names={getDistricts(this.state.province).map(function(option) {
                return {
                  value: option.french,
                  displayName: option.french + " / " + option.persian
                };
              })}
              title={getFrenchName(this.props.districtKey)}
              helperText={getPersianName(this.props.districtKey)}
              disabled={!this.state.province}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"village"}>
            <FieldInput
              name={this.props.villageKey}
              value={this.state.village}
              onChange={event => this.setState({ village: event.target.value })}
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
ProvinceDistrict.propTypes = {
  required: PropTypes.any,
  name: PropTypes.string.isRequired,
  provinceKey: PropTypes.string.isRequired,
  districtKey: PropTypes.string.isRequired,
  villageKey: PropTypes.string.isRequired,
  district: PropTypes.string,
  village: PropTypes.string,
  province: PropTypes.string
};
