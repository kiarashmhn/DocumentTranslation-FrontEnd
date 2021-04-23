import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { getCompleteName } from "../../Dictionary";
import FormHelperText from "@material-ui/core/FormHelperText";
import FieldInput from "../CustomInput/FieldInput";

const initialState = {
  volumeNumber: "",
  pageNumber: "",
  registerNumber: ""
};

export default class TazkaraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    if (this.props.initial && this.props.initial[this.props.name]) {
      this.setState({
        volumeNumber: this.props.initial[this.props.name].volumeNumber
          ? this.props.initial[this.props.name].volumeNumber
          : "",
        pageNumber: this.props.initial[this.props.name].pageNumber
          ? this.props.initial[this.props.name].pageNumber
          : "",
        registerNumber: this.props.initial[this.props.name].registerNumber
          ? this.props.initial[this.props.name].registerNumber
          : ""
      });
    }
  }

  componentDidUpdate() {
    if (
      this.props.initial &&
      this.props.initial[this.props.name] &&
      this.state === initialState
    ) {
      this.setState({
        volumeNumber: this.props.initial[this.props.name].volumeNumber
          ? this.props.initial[this.props.name].volumeNumber
          : "",
        pageNumber: this.props.initial[this.props.name].pageNumber
          ? this.props.initial[this.props.name].pageNumber
          : "",
        registerNumber: this.props.initial[this.props.name].registerNumber
          ? this.props.initial[this.props.name].registerNumber
          : ""
      });
    }
  }

  getState = () => {
    return { [this.props.name]: this.state };
  };

  render() {
    return (
      <Fragment>
        <Grid container spacing={1}>
          <Grid item xs={6} sm={6} md={4} key={"day"}>
            <FieldInput
              type={"text"}
              name={"volumeNumber"}
              value={this.state.volumeNumber}
              onChange={e => this.setState({ volumeNumber: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} key={"pageNumber"}>
            <FieldInput
              type={"number"}
              name={"pageNumber"}
              value={this.state.pageNumber}
              onChange={e => this.setState({ pageNumber: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} key={"registerNumber"}>
            <FieldInput
              type={"number"}
              name={"registerNumber"}
              value={this.state.registerNumber}
              onChange={e => this.setState({ registerNumber: e.target.value })}
            />
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

TazkaraInfo.propTypes = {
  name: PropTypes.string.isRequired,
  initial: PropTypes.any
};
