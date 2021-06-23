import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import {
  getCompleteName,
  getFrenchName,
  getPersianName
} from "../../Dictionary";
import ControlledOpenSelect from "../Dropdown/Dropdown";
import FieldInput from "../CustomInput/FieldInput";
import provinces from "../order/Provinces";

const initialState = {
  type: "",
  value: ""
};

export default class DocumentPlace extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    if (this.props.initial) this.setState(this.props.initial);
  }

  componentDidUpdate() {
    if (this.props.initial && this.state === initialState)
      this.setState(this.props.initial);
  }

  onChange = (key, e) => {
    if (key === "type") this.setState({ value: "" });
    this.setState({ [key]: e.target.value }, () => {
      this.props.onChange(this.state);
    });
  };

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} key={"DocumentPlaceType"}>
          <ControlledOpenSelect
            required
            value={this.state["type"]}
            keyId={"type"}
            onChange={event => this.onChange("type", event)}
            names={[
              {
                value: "court",
                displayName: getCompleteName("court")
              },
              {
                value: "embassy",
                displayName: getCompleteName("embassy")
              },
              {
                value: "otherPlace",
                displayName: getCompleteName("otherPlace")
              }
            ]}
            title={getFrenchName("whichOffice")}
            helperText={getPersianName("whichOffice")}
          />
        </Grid>
        {this.state.type === "court" && (
          <Grid item xs={12} sm={12} md={4} key={"DocumentPlaceType1"}>
            <ControlledOpenSelect
              required
              value={this.state["value"]}
              keyId={"value1"}
              onChange={event => this.onChange("value", event)}
              names={Object.keys(provinces).map(k => {
                return {
                  displayName:
                    provinces[k].french + " / " + provinces[k].persian,
                  value: provinces[k].french
                };
              })}
              title={getFrenchName("whichProvince")}
              helperText={getPersianName("whichProvince")}
            />
          </Grid>
        )}
        {this.state.type === "embassy" && (
          <Grid item xs={12} sm={12} md={4} key={"DocumentPlaceType2"}>
            <ControlledOpenSelect
              required
              value={this.state["value"]}
              keyId={"value1"}
              onChange={event => this.onChange("value", event)}
              names={[
                {
                  displayName: getCompleteName("islamabad"),
                  value: "islamabad"
                },
                {
                  displayName: getCompleteName("tehran"),
                  value: "tehran"
                },
                {
                  displayName: getCompleteName("doushanbe"),
                  value: "doushanbe"
                },
                {
                  displayName: getCompleteName("moscow"),
                  value: "moscow"
                }
              ]}
              title={getFrenchName("whichAmbassy")}
              helperText={getPersianName("whichAmbassy")}
            />
          </Grid>
        )}
        {this.state.type === "otherPlace" && (
          <Grid item xs={12} sm={12} md={4} key={"DocumentPlaceType3"}>
            <FieldInput
              name={"write"}
              value={this.state["value"]}
              onChange={event => this.onChange("value", event)}
            />
          </Grid>
        )}
      </Grid>
    );
  }
}

DocumentPlace.propTypes = {
  onChange: PropTypes.any.isRequired,
  initial: PropTypes.any
};
