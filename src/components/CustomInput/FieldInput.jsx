import React, { Component } from "react";
import { getFrenchName, getHint, getPersianName } from "../../Dictionary";
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomTooltip from "../Tooltip/CustomTooltip";
import CustomInput from "./CustomInput";
import PropTypes from "prop-types";

export default class FieldInput extends Component {
  render() {
    return (
      <CustomInput
        type={this.props.type ? this.props.type : "text"}
        required={!this.props.notRequired}
        labelText={getFrenchName(this.props.name)}
        helperText={getPersianName(this.props.name)}
        id={this.props.name + new Date()}
        value={this.props.value}
        onChange={this.props.onChange}
        formControlProps={{
          fullWidth: true
        }}
        inputProps={
          getHint(this.props.name)
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <CustomTooltip>
                      <div>{getHint(this.props.name).french}</div>
                      <div dir={"rtl"}>{getHint(this.props.name).persian}</div>
                    </CustomTooltip>
                  </InputAdornment>
                )
              }
            : {}
        }
      />
    );
  }
}
FieldInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  notRequired: PropTypes.bool,
  type: PropTypes.string
};
