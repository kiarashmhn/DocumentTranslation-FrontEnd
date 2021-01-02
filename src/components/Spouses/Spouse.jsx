import React, { Component, Fragment } from "react";
import { Grid } from "@material-ui/core";
import CustomDateInput from "../CustomDateInput/CustomDateInput";
import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";
import FieldInput from "../CustomInput/FieldInput";

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
            <FieldInput
              name={"name"}
              value={this.state.name}
              onChange={e =>
                this.setState({
                  name: e.target.value
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"lastName"}>
            <FieldInput
              name={"lastName"}
              value={this.state.lastName}
              onChange={e =>
                this.setState({
                  lastName: e.target.value
                })
              }
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
            <FieldInput
              name={"certificateId"}
              value={this.state.certificateId}
              onChange={e =>
                this.setState({
                  certificateId: e.target.value
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"birthLocation"}>
            <FieldInput
              name={"birthLocation"}
              value={this.state.birthLocation}
              onChange={e =>
                this.setState({
                  birthLocation: e.target.value
                })
              }
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
            <FieldInput
              name={"marriageLocation"}
              value={this.state.marriageLocation}
              onChange={e =>
                this.setState({
                  marriageLocation: e.target.value
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"officeNumber"}>
            <FieldInput
              name={"officeNumber"}
              value={this.state.officeNumber}
              onChange={e =>
                this.setState({
                  officeNumber: e.target.value
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"registrationNumber"}>
            <FieldInput
              name={"registrationNumber"}
              value={this.state.registrationNumber}
              onChange={e =>
                this.setState({
                  registrationNumber: e.target.value
                })
              }
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
              <FieldInput
                name={"divorceRegistrationNumber"}
                value={this.state.divorceRegistrationNumber}
                onChange={e =>
                  this.setState({
                    divorceRegistrationNumber: e.target.value
                  })
                }
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
              <FieldInput
                name={"divorceLocation"}
                value={this.state.divorceLocation}
                onChange={e =>
                  this.setState({
                    divorceLocation: e.target.value
                  })
                }
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
