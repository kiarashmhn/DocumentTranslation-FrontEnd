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

const initialState = {
  check: false,
  value: ""
};

export default class Valuable extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    if (this.props.initialState) this.setState(this.props.initialState);
  }

  componentDidUpdate() {
    if (this.props.initialState && this.state === initialState)
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
            <Grid item xs={12} sm={12} md={8}>
              <FormControl required={true}>
                <InputLabel htmlFor={this.props.name}>
                  {getFrenchName(this.props.valueKey)}
                </InputLabel>
                <Input
                  required={!!this.props.valueRequired}
                  id={this.props.name}
                  value={this.state.value}
                  name={this.props.name}
                  onChange={event => this.onChange("value", event)}
                  type={"text"}
                  formNoValidate
                  inputProps={
                    getHint(this.props.valueKey) !== null
                      ? {
                          endAdornment: (
                            <InputAdornment position="end">
                              <CustomTooltip>
                                <div dir={"ltr"}>
                                  {getHint(this.props.name).french}
                                </div>
                                <div dir={"rtl"}>
                                  {getHint(this.props.name).persian}
                                </div>
                              </CustomTooltip>
                            </InputAdornment>
                          )
                        }
                      : {}
                  }
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
  valueRequired: PropTypes.any
};
