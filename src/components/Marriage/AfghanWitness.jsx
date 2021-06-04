import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography } from "@material-ui/core";
import { getFrenchName, getPersianName } from "../../Dictionary";
import Grid from "@material-ui/core/Grid";
import FieldInput from "../CustomInput/FieldInput";
import * as PropTypes from "prop-types";
import ComplexDateInput from "../CustomDateInput/ComplexDateInput";
import ProvinceDistrict from "../ProvinceDistrict/ProvinceDistrict";

const initialState = {
  name: "",
  valad: "",
  valadiat: "",
  aBirthDate: "",
  livingLocationTemp: "",
  livingLocationOriginal: ""
};

export default class AfghanWitness extends Component {
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
              key={this.props.id + this.props.idx + "valad"}
            >
              <FieldInput
                name={"valad"}
                value={this.state["valad"]}
                onChange={event => this.onChange("valad", event)}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              key={this.props.id + this.props.idx + "valadiat"}
            >
              <FieldInput
                name={"valadiat"}
                value={this.state["valadiat"]}
                onChange={event => this.onChange("valadiat", event)}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              key={this.props.id + this.props.idx + "aBirthDate"}
            >
              <ComplexDateInput
                name={"aBirthDate"}
                initial={this.state.aBirthDate}
                required={true}
                onChange={value => this.onChange("aBirthDate", value)}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              key={this.props.id + this.props.idx + "livingLocationTemp"}
            >
              <ProvinceDistrict
                province={
                  this.state.livingLocationTemp
                    ? this.state.livingLocationTemp.province
                    : null
                }
                district={
                  this.state.livingLocationTemp
                    ? this.state.livingLocationTemp.district
                    : null
                }
                village={
                  this.state.livingLocationTemp
                    ? this.state.livingLocationTemp.village
                    : null
                }
                name={"livingLocationTemp"}
                provinceKey={"province"}
                districtKey={"district"}
                villageKey={"village"}
                required={false}
                onChange={v => this.setState({ livingLocationTemp: v })}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              key={this.props.id + this.props.idx + "livingLocationOriginal"}
            >
              <ProvinceDistrict
                province={
                  this.state.livingLocationOriginal
                    ? this.state.livingLocationOriginal.province
                    : null
                }
                district={
                  this.state.livingLocationOriginal
                    ? this.state.livingLocationOriginal.district
                    : null
                }
                village={
                  this.state.livingLocationOriginal
                    ? this.state.livingLocationOriginal.village
                    : null
                }
                name={"livingLocationOriginal"}
                provinceKey={"province"}
                districtKey={"district"}
                villageKey={"village"}
                required={false}
                onChange={v => this.setState({ livingLocationOriginal: v })}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}
AfghanWitness.propTypes = {
  id: PropTypes.any.isRequired,
  idx: PropTypes.any.isRequired,
  initialState: PropTypes.any,
  onChange: PropTypes.func.isRequired
};
