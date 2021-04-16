import React, { Component } from "react";
import * as PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import {
  getCompleteName,
  getFrenchName,
  getHint,
  getPersianName
} from "../../Dictionary";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomTooltip from "../Tooltip/CustomTooltip";
import theme, { grayColor } from "../../theme";

const initialState = defaultValue => {
  return {
    check: false,
    value: defaultValue
  };
};

export default class Valuable extends Component {
  constructor(props) {
    super(props);
    this.state = initialState(
      this.props.defaultValue
        ? getCompleteName(this.props.defaultValue)
          ? getCompleteName(this.props.defaultValue)
          : ""
        : ""
    );
  }

  componentDidMount() {
    if (this.props.initialState) this.setState(this.props.initialState);
  }

  componentDidUpdate() {
    let initial = initialState(
      this.props.defaultValue ? this.props.defaultValue : ""
    );

    if (this.props.initialState && this.state === initial)
      this.setState(this.props.initialState);
  }

  onChange = (key, event) => {
    this.setState(
      {
        [key]: event.target.value
      },
      () => {
        this.props.onChange(this.state);
      }
    );
  };

  getHintProp = () => {
    return getHint(this.props.name)
      ? {
          endAdornment: (
            <InputAdornment position="end">
              <CustomTooltip>
                <div dir={"ltr"}>{getHint(this.props.name).french}</div>
                <div dir={"rtl"}>{getHint(this.props.name).persian}</div>
              </CustomTooltip>
            </InputAdornment>
          )
        }
      : {};
  };

  render() {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4}>
            <div style={{ marginTop: "23px" }}>
              <Checkbox
                checked={!!this.state.check}
                onChange={e =>
                  this.setState({
                    check: e.target.checked
                  })
                }
                name={"check"}
                color="secondary"
              />
              <span>{getCompleteName(this.props.name)}</span>
            </div>
          </Grid>
          {this.state.check && (
            <Grid item xs={12} sm={12} md={4}>
              <FormControl
                fullWidth
                required={!!this.props.valueRequired}
                style={{
                  margin: 0,
                  position: "relative",
                  left: 0,
                  verticalAlign: "unset"
                }}
              >
                <InputLabel
                  htmlFor={this.props.name}
                  style={{
                    ...theme.typography,
                    color: grayColor[8] + " !important",
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "1.42857"
                  }}
                >
                  {getFrenchName(this.props.valueKey)}
                </InputLabel>
                <Input
                  fullWidth
                  required={!!this.props.valueRequired}
                  id={this.props.name}
                  value={this.state.value}
                  name={this.props.name}
                  onChange={event => this.onChange("value", event)}
                  type={"text"}
                  formNoValidate
                  {...this.getHintProp()}
                />
                <FormHelperText style={{ color: "#000000" }}>
                  {getPersianName(this.props.valueKey)}
                </FormHelperText>
              </FormControl>
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

Valuable.propTypes = {
  name: PropTypes.any.isRequired,
  valueKey: PropTypes.any.isRequired,
  initialState: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  valueRequired: PropTypes.any,
  defaultValue: PropTypes.any
};
