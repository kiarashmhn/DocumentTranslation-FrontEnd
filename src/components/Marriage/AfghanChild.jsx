import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import FieldInput from "../CustomInput/FieldInput";
import * as PropTypes from "prop-types";
import ComplexDateInput from "../CustomDateInput/ComplexDateInput";
import ProvinceDistrict from "../ProvinceDistrict/ProvinceDistrict";
import TazkaraInfo from "../TazkaraInfo/TazkaraInfo";

const initialState = {
  name: "",
  valad: "",
  valadiat: "",
  nationality: "Afghane / افغان",
  aBirthDate: "",
  registeredTazkaraInformation: "",
  livingLocationTemp: "",
  livingLocationOriginal: ""
};

export default class AfghanChild extends Component {
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
    this.setState({
      [key]: event.target.value
    });
  };

  onEdit = (key, value) => {
    this.setState({ [key]: value });
  };

  render() {
    return (
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} key={"afghanChildName"}>
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
              key={"afghanChildValadtazkaraInfo"}
            >
              <TazkaraInfo
                name={"registeredTazkaraInformation"}
                initial={this.props.initialState}
                onChange={v => this.onEdit("registeredTazkaraInformation", v)}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              key={"afghanChildValadnationality"}
            >
              <FieldInput
                name={"nationality"}
                value={this.state["nationality"]}
                onChange={event => this.onChange("nationality", event)}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              key={"afghanChildValadaBirthDate"}
            >
              <ComplexDateInput
                name={"aBirthDate"}
                initial={this.state.aBirthDate}
                required={true}
                onChange={value => this.onEdit("aBirthDate", value)}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              key={"afghanChildValadlivingLocationTemp"}
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
                initial={this.state.livingLocationTemp}
                name={"livingLocationTemp"}
                provinceKey={"province"}
                districtKey={"district"}
                villageKey={"village"}
                required={false}
                onChange={v => this.onEdit("livingLocationTemp", v)}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              key={"afghanChildValadlivingLocationOriginal"}
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
                initial={this.state.livingLocationOriginal}
                name={"livingLocationOriginal"}
                provinceKey={"province"}
                districtKey={"district"}
                villageKey={"village"}
                required={false}
                onChange={v => this.onEdit("livingLocationOriginal", v)}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}
AfghanChild.propTypes = {
  initialState: PropTypes.any
};
