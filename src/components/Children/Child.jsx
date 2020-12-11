import React, { Component, Fragment } from "react";
import { Grid } from "@material-ui/core";
import CustomInput from "../CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomTooltip from "../Tooltip/CustomTooltip";
import CustomDateInput from "../CustomDateInput/CustomDateInput";

export default class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      certificateId: "",
      birthLocation: "",
      birthDate: ""
    };
  }

  handleBirthDateChange = newDate => {
    this.setState({
      birthDate: newDate
    });
  };

  render() {
    return (
      <Fragment>
        <Grid container spacing={2} dir={"rtl"}>
          <Grid item xs={12} sm={12} md={4} key={"name"}>
            <CustomInput
              required
              labelText="نام"
              id="name"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CustomTooltip text={"Prénom"} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"certificateId"}>
            <CustomInput
              required
              labelText="شماره شناسنامه یا ملی"
              id="certificateId"
              value={this.state.certificateId}
              onChange={e => this.setState({ certificateId: e.target.value })}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CustomTooltip text={"N° de l’Acte de l’état civil"} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"birthDate"}>
            <CustomDateInput
              label={"تاریخ تولد"}
              hint={"Date de naissance"}
              onChange={this.handleBirthDateChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"birthLocation"}>
            <CustomInput
              required
              labelText="محل تولد"
              id="birthLocation"
              value={this.state.birthLocation}
              onChange={e => this.setState({ birthLocation: e.target.value })}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CustomTooltip text={"Lieu de naissance"} />
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
