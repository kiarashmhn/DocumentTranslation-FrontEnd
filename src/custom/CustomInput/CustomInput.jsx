import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import customInputStyle from "./customInputStyle";

import styles from "./CustomInput.module.css";
import Tooltip from "@material-ui/core/Tooltip";

function CustomInput({ ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success,
    theme,
    value,
    onChange,
    onClick,
    required,
    name,
    disabled,
    type,
    hint
  } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underlineWarning]: theme == "orange" && !success,
    [classes.underline]: true
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined
  });

  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
      required={required}
    >
      {labelText !== undefined ? (
        <InputLabel
          classes={{ root: styles.right }}
          className={classes.labelRoot + labelClasses + styles.right}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Tooltip title={hint} style={classes.customWidth}>
        <Input
          classes={{
            root: marginTop,
            disabled: classes.disabled,
            underline: underlineClasses
          }}
          id={id}
          value={value ? value : ""}
          name={name}
          onChange={onChange}
          onClick={onClick}
          disabled={disabled}
          type={type ? type : "text"}
          formNoValidate
          {...inputProps}
        />
      </Tooltip>
      {error ? (
        <Clear className={classes.feedback + " " + classes.labelRootError} />
      ) : success ? (
        <Check className={classes.feedback + " " + classes.labelRootSuccess} />
      ) : null}
    </FormControl>
  );
}

CustomInput.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
  theme: PropTypes.any,
  required: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  hint: PropTypes.string.isRequired
};

export default withStyles(customInputStyle)(CustomInput);
