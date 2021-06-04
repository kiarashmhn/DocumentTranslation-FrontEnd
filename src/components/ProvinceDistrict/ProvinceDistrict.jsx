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
      country: this.props.country ? this.props.country : "afghanistan",
      province: this.props.province ? this.props.province : "",
      district: this.props.district ? this.props.district : "",
      village: this.props.village ? this.props.village : ""
    };
  }

  getState = () => {
    return {
      country: this.state.country,
      [this.props.provinceKey]: this.state.province,
      [this.props.districtKey]: this.state.district,
      [this.props.villageKey]: this.state.village
    };
  };

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value }, () => {
      if (this.props.onChange) this.props.onChange(this.getState());
    });
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
          {this.props.showCountry && (
            <Grid item xs={12} sm={12} md={4} key={"country"}>
              <ControlledOpenSelect
                required={this.props.required}
                value={this.state.country}
                keyId={"country"}
                onChange={event =>
                  this.setState(
                    { province: "", district: "", village: "" },
                    () => {
                      this.onChange("country", event);
                    }
                  )
                }
                names={[
                  {
                    value: "afghanistan",
                    displayName: getCompleteName("afghanistan")
                  },
                  { value: "others", displayName: getCompleteName("others") }
                ]}
                title={getFrenchName("country2")}
                helperText={getPersianName("country2")}
                disabled={false}
              />
            </Grid>
          )}
          {this.state.country === "afghanistan" && (
            <Grid item xs={12} sm={12} md={4} key={"province"}>
              <ControlledOpenSelect
                required={this.props.required}
                value={this.state.province}
                keyId={"province"}
                onChange={event =>
                  this.setState({ district: "" }, () => {
                    this.onChange("province", event);
                  })
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
                disabled={this.props.showCountry && !this.state.country}
              />
            </Grid>
          )}
          {this.state.country === "afghanistan" && (
            <Grid item xs={12} sm={12} md={4} key={"district"}>
              <ControlledOpenSelect
                required={this.props.required}
                value={this.state.district}
                keyId={"district"}
                onChange={event => this.onChange("district", event)}
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
          )}
          {this.state.country === "afghanistan" && (
            <Grid item xs={12} sm={12} md={4} key={"village"}>
              <FieldInput
                name={this.props.villageKey}
                value={this.state.village}
                notRequired={!this.props.required}
                onChange={event => this.onChange("village", event)}
              />
            </Grid>
          )}
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
  showCountry: PropTypes.bool,
  onChange: PropTypes.func,
  district: PropTypes.string,
  village: PropTypes.string,
  province: PropTypes.string,
  country: PropTypes.string
};
