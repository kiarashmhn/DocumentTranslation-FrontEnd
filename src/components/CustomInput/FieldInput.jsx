import React, { Component } from "react";
import { getFrenchName, getHint, getPersianName } from "../../Dictionary";
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomTooltip from "../Tooltip/CustomTooltip";
import CustomInput from "./CustomInput";
import PropTypes from "prop-types";

export default class FieldInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <CustomInput
        required
        labelText={getPersianName(this.props.name)}
        helperText={getFrenchName(this.props.name)}
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
                    <CustomTooltip
                      text={
                        getHint(this.props.name).persian +
                        "\n" +
                        getHint(this.props.name).french
                      }
                    />
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
  value: PropTypes.object.isRequired
};
