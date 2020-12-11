import React, { Component } from "react";

import moment from "moment-jalaali";
import * as PropTypes from "prop-types";
import InputLabel from "@material-ui/core/InputLabel";
import DatePicker from "react-datepicker2";

import styles from "./customDate.module.css";
import "./datePopup.css";

class CustomDate extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className={
          this.props.dynamicClassName
            ? styles[this.props.dynamicClassName]
            : styles.dateLabel
        }
      >
        <InputLabel>{this.props.placeholder}</InputLabel>
        <DatePicker
          required={this.props.required}
          disabled={this.props.disabled}
          timePicker={false}
          className={styles.customDatePickerWidth}
          isGregorian={false}
          inputJalaaliFormat="jYYYY-jMM-jDD"
          onChange={this.props.onChange}
          value={
            this.props.value
              ? typeof value === "string"
                ? moment(
                    moment(this.props.value, "YYYY-MM-DD")
                      .locale("fa")
                      .format("jYYYY-jMM-jDD"),
                    "jYYYY-jMM-jDD"
                  )
                : this.props.value
              : this.props.emptyInit
              ? ""
              : moment()
          }
        />
      </div>
    );
  }
}

CustomDate.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  dynamicClassName: PropTypes.string,
  emptyInit: PropTypes.bool
};

export default CustomDate;
