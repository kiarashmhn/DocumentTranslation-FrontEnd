import React, { Component, Fragment } from "react";
import { Grid } from "@material-ui/core";
import CustomDateInput from "../CustomDateInput/CustomDateInput";
import * as PropTypes from "prop-types";
import FieldInput from "../CustomInput/FieldInput";

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
          <Grid item xs={12} sm={12} md={4} key={"birthDate"}>
            <CustomDateInput
              name={"birthDate"}
              initial={this.state.birthDate}
              onChange={this.handleBirthDateChange}
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
        </Grid>
      </Fragment>
    );
  }
}

Child.propTypes = {
  initialState: PropTypes.object
};
