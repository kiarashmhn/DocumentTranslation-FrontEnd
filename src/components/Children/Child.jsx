import React, { Component, Fragment } from "react";
import { Grid } from "@material-ui/core";
import CustomInput from "../CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomTooltip from "../Tooltip/CustomTooltip";
import CustomDateInput from "../CustomDateInput/CustomDateInput";
import * as PropTypes from "prop-types";
import { getFrenchName, getPersianName } from "../../Dictionary";

const initialState = {
  name: "",
  certificateId: "",
  birthLocation: "",
  birthDate: ""
};

export default class Child extends Component {
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

  handleBirthDateChange = newDate => {
    this.setState({
      birthDate: newDate
    });
  };

  render() {
    return (
      <Fragment>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4} key={"name"}>
            <CustomInput
              required
              labelText={getPersianName("name")}
              helperText={getFrenchName("name")}
              id="name"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CustomTooltip text={getFrenchName("name")} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"certificateId"}>
            <CustomInput
              required
              labelText={getPersianName("certificateId")}
              helperText={getFrenchName("certificateId")}
              id="certificateId"
              value={this.state.certificateId}
              onChange={e => this.setState({ certificateId: e.target.value })}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CustomTooltip text={getFrenchName("certificateId")} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"birthDate"}>
            <CustomDateInput
              name={"birthDate"}
              initial={this.state.birthDate}
              onChange={this.handleBirthDateChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"birthLocation"}>
            <CustomInput
              required
              labelText={getPersianName("birthLocation")}
              helperText={getFrenchName("birthLocation")}
              id="birthLocation"
              value={this.state.birthLocation}
              onChange={e => this.setState({ birthLocation: e.target.value })}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CustomTooltip text={getFrenchName("birthLocation")} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

Child.propTypes = {
  initialState: PropTypes.object
};
