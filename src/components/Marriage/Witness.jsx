import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FieldInput from "../CustomInput/FieldInput";
import Grid from "@material-ui/core/Grid";
import * as PropTypes from "prop-types";
import { getFrenchName, getPersianName } from "../../Dictionary";
import { Typography } from "@material-ui/core";

const initialState = {
  name: "",
  lastName: "",
  fatherName: "",
  nationalId: "",
  placeofIssueIDCertificate: "",
  job: "",
  livingPlace: ""
};

export default class Witness extends Component {
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
      <Card variant="outlined">
        <CardContent>
          <Typography>
            {getFrenchName(this.props.id) + " " + this.props.idx}
          </Typography>
          <Typography>
            {getPersianName(this.props.id) + " " + this.props.idx}
          </Typography>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              key={this.props.id + this.props.idx + "name"}
            >
              <FieldInput
                name={"name"}
                value={this.state["name"]}
                onChange={event => this.onChange("name", event)}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              key={this.props.id + this.props.idx + "lastName"}
            >
              <FieldInput
                name={"lastName"}
                value={this.state["lastName"]}
                onChange={event => this.onChange("lastName", event)}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              key={this.props.id + this.props.idx + "fatherName"}
            >
              <FieldInput
                name={"fatherName"}
                value={this.state["fatherName"]}
                onChange={event => this.onChange("fatherName", event)}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              key={this.props.id + this.props.idx + "nationalId"}
            >
              <FieldInput
                name={"nationalId"}
                value={this.state["nationalId"]}
                onChange={event => this.onChange("nationalId", event)}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              key={this.props.id + this.props.idx + "placeofIssueIDCertificate"}
            >
              <FieldInput
                name={"placeofIssueIDCertificate"}
                value={this.state["placeofIssueIDCertificate"]}
                onChange={event =>
                  this.onChange("placeofIssueIDCertificate", event)
                }
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              key={this.props.id + this.props.idx + "job"}
            >
              <FieldInput
                name={"job"}
                value={this.state["job"]}
                onChange={event => this.onChange("job", event)}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              key={this.props.id + this.props.idx + "livingPlace"}
            >
              <FieldInput
                name={"livingPlace"}
                value={this.state["livingPlace"]}
                onChange={event => this.onChange("livingPlace", event)}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}
Witness.propTypes = {
  id: PropTypes.any.isRequired,
  idx: PropTypes.any.isRequired,
  initialState: PropTypes.any,
  onChange: PropTypes.func.isRequired
};
