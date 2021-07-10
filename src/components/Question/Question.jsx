import React, { Component, Fragment } from "react";
import { Grid } from "@material-ui/core";
import * as PropTypes from "prop-types";
import FieldInput from "../CustomInput/FieldInput";

const initialState = {
  french: "",
  persian: "",
  fAns: "",
  pAns: ""
};

export default class Question extends Component {
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

  render() {
    return (
      <Fragment>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} key={"french"}>
            <FieldInput
              name={"frenchQuestion"}
              value={this.state.french}
              onChange={e =>
                this.setState({
                  french: e.target.value
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} key={"persian"}>
            <FieldInput
              name={"persianQuestion"}
              value={this.state.persian}
              onChange={e =>
                this.setState({
                  persian: e.target.value
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} key={"fAns"}>
            <FieldInput
              name={"fAns"}
              value={this.state.fAns}
              onChange={e =>
                this.setState({
                  fAns: e.target.value
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} key={"pAns"}>
            <FieldInput
              name={"pAns"}
              value={this.state.pAns}
              onChange={e =>
                this.setState({
                  pAns: e.target.value
                })
              }
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

Question.propTypes = {
  initialState: PropTypes.object
};
