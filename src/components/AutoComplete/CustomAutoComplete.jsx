import React, { Component } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PropTypes from "prop-types";
import {
  getCompleteName,
  getFrenchName,
  getPersianName
} from "../../Dictionary";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

export default class CustomAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value ? this.props.value : "",
      inputValue: this.props.value ? this.props.value : ""
    };
  }

  onChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    return (
      <Autocomplete
        id="controllable-states-demo"
        freeSolo
        selectOnFocus
        clearOnBlur
        value={this.state.value}
        onChange={(event, newValue) => {
          this.setState({ value: newValue });
          this.props.onChange(event);
        }}
        inputValue={this.state.inputValue}
        onInputChange={(event, newInputValue) => {
          this.setState({ inputValue: newInputValue });
        }}
        options={this.props.options.map(option => getCompleteName(option.key))}
        renderInput={params => (
          <div style={{ marginTop: "27px" }}>
            <TextField
              {...params}
              label={getFrenchName(this.props.name)}
              InputProps={{ ...params.InputProps }}
            />
            <FormHelperText style={{ color: "#000000" }}>
              {getPersianName(this.props.name)}
            </FormHelperText>
          </div>
        )}
      />
    );
  }
}
CustomAutoComplete.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  options: PropTypes.array.isRequired,
  initial: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.any
};
