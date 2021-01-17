import React from "react";
import AsyncSelect from "react-select/async";
import FormControl from "@material-ui/core/FormControl";

import DDStyles from "./Dropdown.module.css";

const pStyle = {
  // margin: "1px",
  minWidth: "120",
  width: "100%",
  margin: "41px 0 0 0",
  position: "relative",
  paddingBottom: "10px",
  verticalAlign: "unset",
  textAlign: "right"
};

export default class MultipleDropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;

    return (
      <FormControl style={pStyle}>
        <AsyncSelect
          placeholder={props.title ? props.title + " ..." : "انتخاب کنید"}
          value={props.value}
          onChange={props.handleChange}
          cacheOptions
          defaultOptions
          isClearable
          className={DDStyles.basic}
          classNamePrefix="select"
          loadOptions={props.asyncLoadOptions}
          isMulti={true}
        />
      </FormControl>
    );
  }
}
