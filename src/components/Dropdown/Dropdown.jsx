/* eslint-disable */
import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import * as Validator from "../utils/Validator";

import styles from "./Dropdown.module.css";
import FormHelperText from "@material-ui/core/FormHelperText";
import {getCompleteName} from "../../Dictionary";

const useStyles = {
  button: {
    display: "block",
    marginTop: "2px"
  },
  formControl: {
    minWidth: "120",
    width: "100%",
    margin: "27px 0 0 0",
    position: "relative",
    paddingBottom: "10px",
    verticalAlign: "unset"
  }
};

const pStyle = {
  minWidth: "120",
  width: "100%",
  margin: "27px 0 0 0",
  position: "relative",
  paddingBottom: "10px",
  verticalAlign: "unset",
  textAlign: "left"
};

const anStyle = {
  left: 0
};

export default function ControlledOpenSelect(props) {
  const classes = useStyles;
  // const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const { value, onChange, required, disabled } = props;

  // function handleChange(event) {
  //     setAge(event.target.value);
  // }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  function createInnerElements(names) {
    return names.map(name => (
      <MenuItem key={name.value} value={name.value}>
        {name.displayName}
      </MenuItem>
    ));
  }

  return (
    // <GridItem xs={12} sm={12} md={3}>
    <FormControl required={required} style={pStyle}>
      <InputLabel htmlFor={props.keyId} style={anStyle}>
        {props.title}
      </InputLabel>
      <Select
        classes={{ icon: styles.test }}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        // value={age}
        value={Validator.justNotNullNotUndefined(value) ? value : ""}
        // onChange={handleChange}
        onChange={onChange}
        disabled={disabled}
        inputProps={{
          id: `${props.keyId}`,
          name: `${props.keyId}`
        }}
      >
        {!props.emptyChoice && !required && (
          <MenuItem value="">
            <em>{getCompleteName("none")}</em>
          </MenuItem>
        )}
        {createInnerElements(props.names)}
      </Select>
      {required && (
        <input
          tabIndex={-1}
          autoComplete={props.autoComplete}
          value={value}
          required={required}
          style={{
            opacity: 0,
            width: "100%",
            height: 0
          }}
          onChange={e => onChange({ value: e.target.value })}
        />
      )}
      <FormHelperText style={{ color: "#000000" }}>
        {props.helperText}
      </FormHelperText>
    </FormControl>
    // </GridItem>
  );
}
