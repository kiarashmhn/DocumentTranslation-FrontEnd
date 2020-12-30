import React, { Component, Fragment } from "react";
import { Grid } from "@material-ui/core";
import CustomInput from "../CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomTooltip from "../Tooltip/CustomTooltip";
import CustomDateInput from "../CustomDateInput/CustomDateInput";
import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";
import { getFrenchName, getPersianName } from "../../Dictionary";

const initialState = {
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

export default class Spouse extends Component {
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
          <Grid item xs={12} sm={12} md={4} key={"lastName"}>
            <CustomInput
              required
              labelText={getPersianName("lastName")}
              helperText={getFrenchName("lastName")}
              id="lastName"
              value={this.state.lastName}
              onChange={e => this.setState({ lastName: e.target.value })}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CustomTooltip text={getFrenchName("lastName")} />
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
          <Grid item xs={12} sm={12} md={4} key={"marriageDate"}>
            <CustomDateInput
              name={"marriageDate"}
              initial={this.state.marriageDate}
              onChange={this.handleMarriageDateChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"marriageLocation"}>
            <CustomInput
              required
              labelText={getPersianName("marriageLocation")}
              helperText={getFrenchName("marriageLocation")}
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
                    <CustomTooltip text={getFrenchName("marriageLocation")} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"officeNumber"}>
            <CustomInput
              required
              labelText={getPersianName("officeNumber")}
              helperText={getFrenchName("officeNumber")}
              id="officeNumber"
              value={this.state.officeNumber}
              onChange={e => this.setState({ officeNumber: e.target.value })}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CustomTooltip text={getFrenchName("officeNumber")} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"registrationNumber"}>
            <CustomInput
              required
              labelText={getPersianName("registrationNumber")}
              helperText={getFrenchName("registrationNumber")}
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
                    <CustomTooltip text={getFrenchName("registrationNumber")} />
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
              <span>طلاق؟ / divorce?</span>
            </div>
          </Grid>
          {this.state.divorce && (
            <Grid item xs={12} sm={12} md={4} key={"divorceRegistrationNumber"}>
              <CustomInput
                required
                labelText={getPersianName("divorceRegistrationNumber")}
                helperText={getFrenchName("divorceRegistrationNumber")}
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
                      <CustomTooltip
                        text={getFrenchName("divorceRegistrationNumber")}
                      />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          )}
          {this.state.divorce && (
            <Grid item xs={12} sm={12} md={4} key={"divorceDate"}>
              <CustomDateInput
                name={"divorceDate"}
                initial={this.state.divorceDate}
                onChange={this.handleDivorceDateChange}
              />
            </Grid>
          )}
          {this.state.divorce && (
            <Grid item xs={12} sm={12} md={4} key={"divorceLocation"}>
              <CustomInput
                required
                labelText={getPersianName("divorceLocation")}
                helperText={getFrenchName("divorceLocation")}
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
                      <CustomTooltip text={getFrenchName("divorceLocation")} />
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
