import React, { Component } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FieldInput from "../CustomInput/FieldInput";
import PropTypes from "prop-types";
import { getCompleteName } from "../../Dictionary";

export default class CustomAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value ? this.props.value : ""
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
        id="free-solo-demo"
        freeSolo
        options={this.props.options.map(option => getCompleteName(option))}
        renderInput={params => (
          <FieldInput
            {...params}
            name={this.props.name}
            value={this.state.value}
            onChange={() => this.props.onChange()}
            notRequired={!!this.props.required}
          />
        )}
      />
    );
  }
}
CustomAutoComplete.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  options: PropTypes.array.isRequired,
  initial: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired
};
