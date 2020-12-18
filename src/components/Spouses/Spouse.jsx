import React, { Component, Fragment } from "react";
import { Grid } from "@material-ui/core";
import CustomInput from "../CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomTooltip from "../Tooltip/CustomTooltip";
import CustomDateInput from "../CustomDateInput/CustomDateInput";
import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";

export default class Spouse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lastName: "",
      certificateId: "",
      birthLocation: "",
      birthDate: "",
      marriageDate: "",
      marriageLocation: "",
      officeNumber: "",
      registrationNumber: "",
      divorce: false,
      divorceDate: "",
      divorceLocation: "",
      divorceRegistrationNumber: ""
    };
  }

  componentDidMount() {
    if (this.props.initialState)
      this.setState({
        name: this.props.initialState.name,
        lastName: this.props.initialState.lastName,
        certificateId: this.props.initialState.certificateId,
        birthLocation: this.props.initialState.birthLocation,
        birthDate: this.props.initialState.birthDate,
        marriageDate: this.props.initialState.marriageDate,
        marriageLocation: this.props.initialState.marriageLocation,
        officeNumber: this.props.initialState.officeNumber,
        registrationNumber: this.props.initialState.registrationNumber,
        divorce: this.props.initialState.divorce === "true",
        divorceDate: this.props.initialState.divorceDate,
        divorceLocation: this.props.initialState.divorceLocation,
        divorceRegistrationNumber: this.props.initialState
          .divorceRegistrationNumber
      });
  }

  handleBirthDateChange = newDate => {
    this.setState({
      birthDate: newDate
    });
  };

  handleMarriageDateChange = newDate => {
    this.setState({
      marriageDate: newDate
    });
  };

  handleDivorceDateChange = newDate => {
    this.setState({
      divorceDate: newDate
    });
  };

  handleDivorceChange = e => {
    this.setState({
      divorce: e.target.checked
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
          <Grid item xs={12} sm={12} md={4} key={"lastName"}>
            <CustomInput
              required
              labelText="نام خانوادگی"
              id="lastName"
              value={this.state.lastName}
              onChange={e => this.setState({ lastName: e.target.value })}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CustomTooltip text={"Nom"} />
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
          <Grid item xs={12} sm={12} md={4} key={"marriageDate"}>
            <CustomDateInput
              label={"تاریخ عقد"}
              hint={"Date de mariage"}
              onChange={this.handleMarriageDateChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"marriageLocation"}>
            <CustomInput
              required
              labelText="محل از‌دواج"
              id="marriageLocation"
              value={this.state.marriageLocation}
              onChange={e =>
                this.setState({ marriageLocation: e.target.value })
              }
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CustomTooltip text={"Lieu de mariage"} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"officeNumber"}>
            <CustomInput
              required
              labelText="شماره دفتر"
              id="officeNumber"
              value={this.state.officeNumber}
              onChange={e => this.setState({ officeNumber: e.target.value })}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CustomTooltip text={"N° de l’étude notariale"} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"registrationNumber"}>
            <CustomInput
              required
              labelText="شماره ثبت"
              id="registrationNumber"
              value={this.state.registrationNumber}
              onChange={e =>
                this.setState({ registrationNumber: e.target.value })
              }
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CustomTooltip text={"N° d’enregistrement"} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"divorce"}>
            <div style={{ marginTop: "43px", alignItems: "center" }}>
              <Checkbox
                checked={this.state.divorce}
                onChange={this.handleDivorceChange}
                name="divorce"
                color="secondary"
              />
              <span>طلاق؟</span>
            </div>
          </Grid>
          {this.state.divorce && (
            <Grid item xs={12} sm={12} md={4} key={"divorceRegistrationNumber"}>
              <CustomInput
                required
                labelText="شماره ثبت طلاق"
                id="divorceRegistrationNumber"
                value={this.state.divorceRegistrationNumber}
                onChange={e =>
                  this.setState({ divorceRegistrationNumber: e.target.value })
                }
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CustomTooltip text={"N° d’enregistrement"} />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          )}
          {this.state.divorce && (
            <Grid item xs={12} sm={12} md={4} key={"divorceDate"}>
              <CustomDateInput
                label={"تاریخ طلاق"}
                hint={"Date de divorce"}
                onChange={this.handleDivorceDateChange}
              />
            </Grid>
          )}
          {this.state.divorce && (
            <Grid item xs={12} sm={12} md={4} key={"divorceLocation"}>
              <CustomInput
                required
                labelText="محل طلاق"
                id="divorceLocation"
                value={this.state.divorceLocation}
                onChange={e =>
                  this.setState({ divorceLocation: e.target.value })
                }
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CustomTooltip text={"Lieu de divorce"} />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          )}
        </Grid>
      </Fragment>
    );
  }
}

Spouse.propTypes = {
  initialState: PropTypes.object
};
