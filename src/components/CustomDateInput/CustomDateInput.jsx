import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { getCompleteName, getHint } from "../../Dictionary";
import FormHelperText from "@material-ui/core/FormHelperText";
import FieldInput from "../CustomInput/FieldInput";
import CustomTooltip from "../Tooltip/CustomTooltip";
import * as moment from "jalali-moment";

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
        year: parseInt(initialDate[2], 10),
        month: parseInt(initialDate[1], 10),
        day: parseInt(initialDate[0], 10)
      });
    }
  }

  componentDidUpdate() {
    if (this.props.initial && this.state === initialState) {
      let initialDate = this.props.initial.split("/");
      this.setState({
        year: parseInt(initialDate[2], 10),
        month: parseInt(initialDate[1], 10),
        day: parseInt(initialDate[0], 10)
      });
    }
  }

  getState = () => {
    let date =
      this.getCorrect(this.state.day) +
      "/" +
      this.getCorrect(this.state.month) +
      "/" +
      this.state.year;
    if (parseInt(this.state.year) < 1600)
      date = moment.from(date, "fa", "DD/MM/YYYY").format("DD/MM/YYYY");
    return date;
  };

  getCorrect = number => {
    if (number < 10) return "0" + number;
    return number;
  };

  render() {
    return (
      <Fragment>
        <Grid container spacing={1}>
          <Grid item xs={2} sm={2} md={3} key={"day"}>
            <FieldInput
              type={"number"}
              name={"day"}
              value={this.state.day}
              onChange={e =>
                this.setState({ day: parseInt(e.target.value, 10) }, () => {
                  this.props.onChange(this.getState());
                })
              }
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
          <Grid item xs={2} sm={2} md={3} key={"month"}>
            <FieldInput
              type={"number"}
              name={"month"}
              value={this.state.month}
              onChange={e =>
                this.setState({ month: parseInt(e.target.value, 10) }, () => {
                  this.props.onChange(this.getState());
                })
              }
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
          <Grid item xs={4} sm={4} md={4} key={"year"}>
            <FieldInput
              type={"number"}
              name={"year"}
              value={this.state.year}
              onChange={e =>
                this.setState({ year: parseInt(e.target.value, 10) }, () => {
                  this.props.onChange(this.getState());
                })
              }
            />
          </Grid>
          <Grid item xs={2} sm={2} md={1} key={"hint"}>
            <div style={{ marginTop: "45px", position: "relative" }}>
              <CustomTooltip
                text={getHint("date").french + "\n" + getHint("date").persian}
              />
            </div>
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
            direction: "ltr",
            top: 0,
            marginTop: 0
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
