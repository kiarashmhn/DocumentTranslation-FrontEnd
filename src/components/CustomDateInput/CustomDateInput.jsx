import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import CustomInput from "../CustomInput/CustomInput";
import { Typography } from "@material-ui/core";
import { grayColor } from "../../theme";
import PropTypes from "prop-types";
import CustomTooltip from "../Tooltip/CustomTooltip";

export default class CustomDateInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: "",
      month: "",
      day: ""
    };
  }

  getState = () => {
    return this.state.year + "/" + this.state.month + "/" + this.state.day;
  };

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={2} sm={2} md={2} key={this.props.label}>
          <Typography
            style={{
              marginTop: "58px",
              textAlign: "center",
              color: grayColor[8] + " !important",
              fontWeight: "400",
              fontSize: "14px",
              lineHeight: "1.42857"
            }}
          >
            {this.props.label}
          </Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={2} key={"day"}>
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
        <Grid item xs={"auto"} sm={"auto"} md={"auto"} key={"slash2"}>
          <Typography
            variant="body1"
            color="textSecondary"
            style={{ marginTop: "58px", textAlign: "center" }}
          >
            /
          </Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={2} key={"month"}>
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
        <Grid item xs={3} sm={3} md={3} key={"year"}>
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
        <Grid item xs={1} sm={1} md={1} key={"date_hint"}>
          <div style={{ marginTop: "43px", position: "relative" }}>
            <CustomTooltip text={this.props.hint} />
          </div>
        </Grid>
      </Grid>
    );
  }
}

CustomDateInput.propTypes = {
  label: PropTypes.string.isRequired,
  hint: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
