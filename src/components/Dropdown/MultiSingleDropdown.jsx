import React from "react";
import AsyncSelect from "react-select/async";
import FormControl from "@material-ui/core/FormControl";
import Select from "react-select";
import PropTypes from "prop-types";
import * as ColorPalette from "../ColorPalette";

import "./Dropdown.module.css";

const pStyle = {
  minWidth: "120",
  width: "100%",
  margin: "27px 0 0 0",
  position: "relative",
  paddingBottom: "10px",
  paddingTop: "3%",
  verticalAlign: "unset",
  textAlign: "right"
};

export default class MultiSingleDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  onChange = value => {
    this.props.handleChange(value);
    this.setState({ value: value });
  };

  render() {
    const props = this.props;

    return (
      <div dir={"rtl"}>
        <FormControl style={pStyle}>
          {props.isAsync ? (
            <AsyncSelect
              value={props.value}
              onChange={this.onChange}
              cacheOptions
              defaultOptions
              isClearable
              className={"select"}
              isRtl={true}
              loadOptions={props.asyncLoadOptions}
              isMulti={props.isMultiple}
              placeholder={props.titleStr ? props.titleStr : "انتخاب کنید"}
              isDisabled={props.isDisabled}
              styles={{
                // Fixes the overlapping problem of the component
                menu: provided => ({ ...provided, zIndex: 9999 })
              }}
              loadingMessage={() => "در حال دریافت ..."}
              noOptionsMessage={() => "موردی یافت نشد!"}
              theme={theme => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: ColorPalette.primary,
                  primary25: ColorPalette.veryLightGray
                }
              })}
            />
          ) : (
            <Select
              value={props.value}
              onChange={this.onChange}
              cacheOptions
              defaultOptions
              isClearable
              className={"select"}
              isRtl={true}
              options={props.syncOptions}
              isMulti={props.isMultiple}
              placeholder={
                props.titleStr ? props.titleStr + " ..." : "انتخاب کنید"
              }
              isDisabled={props.isDisabled}
              styles={{
                menuPortal: base => ({ ...base, zIndex: 9999 })
              }}
              menuPortalTarget={document.body}
              theme={theme => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: ColorPalette.primary,
                  primary25: ColorPalette.veryLightGray
                }
              })}
            />
          )}
          {!this.props.isDisabled && (
            <input
              tabIndex={-1}
              autoComplete="off"
              style={{ opacity: 0, height: 0 }}
              value={this.state.value ? this.state.value : " "}
              required={this.props.isRequired}
              onChange={() => {}}
            />
          )}
        </FormControl>
      </div>
    );
  }
}
MultiSingleDropdown.propTypes = {
  isAsync: PropTypes.bool,
  value: PropTypes.any,
  handleChange: PropTypes.func,
  asyncLoadOptions: PropTypes.any,
  isMultiple: PropTypes.bool,
  titleStr: PropTypes.string,
  isDisabled: PropTypes.bool,
  syncOptions: PropTypes.any,
  isRequired: PropTypes.bool
};
