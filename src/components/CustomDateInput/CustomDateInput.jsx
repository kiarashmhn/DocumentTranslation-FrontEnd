import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import CustomInput from "../CustomInput/CustomInput";
import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import CustomTooltip from "../Tooltip/CustomTooltip";
import { getCompleteName } from "../../Dictionary";
import FormHelperText from "@material-ui/core/FormHelperText";

const initialState = {
  year: "",
  month: "",
  day: ""
};

export default class CustomDateInput extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    if (this.props.initial) {
      let initialDate = this.props.initial.split("/");
      this.setState({
        year: initialDate[0],
        month: initialDate[1],
        day: initialDate[2]
      });
    }
  }

  componentDidUpdate() {
    if (this.props.initial && this.state === initialState) {
      let initialDate = this.props.initial.split("/");
      this.setState({
        year: initialDate[0],
        month: initialDate[1],
        day: initialDate[2]
      });
    }
  }

  getState = () => {
    return this.state.year + "/" + this.state.month + "/" + this.state.day;
  };

  render() {
    return (
      <Fragment>
        <Grid container spacing={1}>
          <Grid item xs={3} sm={3} md={4} key={"year"}>
            <CustomInput
              required
              type={"number"}
              labelText="سال"
              id="year"
              value={this.state.year}
              onChange={e =>
                this.setState({ year: e.target.value }, () => {
                  this.props.onChange(this.getState());
                })
              }
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{ maxLength: 4 }}
              hint={"سال"}
            />
          </Grid>
          <Grid item xs={"auto"} sm={"auto"} md={"auto"} key={"slash2"}>
            <Typography
              variant="body1"
              color="textSecondary"
              style={{ marginTop: "58px", textAlign: "center" }}
            >
              /
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={3} key={"month"}>
            <CustomInput
              required
              type={"number"}
              labelText="ماه"
              id="month"
              value={this.state.month}
              onChange={e =>
                this.setState({ month: e.target.value }, () => {
                  this.props.onChange(this.getState());
                })
              }
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{ maxLength: 2, min: 1, max: 12 }}
              hint={"ماه"}
            />
          </Grid>
          <Grid item xs={"auto"} sm={"auto"} md={"auto"} key={"slash1"}>
            <Typography
              variant="body1"
              color="textSecondary"
              style={{ marginTop: "58px", textAlign: "center" }}
            >
              /
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={3} key={"day"}>
            <CustomInput
              required
              type={"number"}
              labelText="روز"
              id="day"
              value={this.state.day}
              onChange={e =>
                this.setState({ day: e.target.value }, () => {
                  this.props.onChange(this.getState());
                })
              }
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{ maxLength: 2 }}
              hint={"روز"}
            />
          </Grid>
          <Grid item xs={1} sm={1} md={1} key={"date_hint"}>
            <div style={{ marginTop: "43px", position: "relative" }}>
              <CustomTooltip text={getCompleteName(this.props.name)} />
            </div>
          </Grid>
        </Grid>
        <div
          style={{
            position: "relative",
            alignItems: "center",
            direction: "ltr",
            top: 0
          }}
        >
          <FormHelperText
            style={{
              color: "#000000",
              marginTop: "2px"
            }}
          >
            {getCompleteName(this.props.name)}
          </FormHelperText>
        </div>
      </Fragment>
    );
  }
}

CustomDateInput.propTypes = {
  name: PropTypes.string.isRequired,
  initial: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
