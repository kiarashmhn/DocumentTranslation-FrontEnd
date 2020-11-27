import React, { Component } from "react";
import PropTypes from "prop-types";
import CustomInput from "../../../custom/CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import ShortTextIcon from "@material-ui/icons/ShortText";
import MultiSingleDropdown from "../../../custom/Dropdown/MultiSingleDropdown";
import CustomDate from "../../../custom/Date/CustomDate";
import moment from "moment-jalaali";
import { Button, Grid, Tooltip } from "@material-ui/core";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";

const styles = {
  customWidth: {
    maxWidth: 500
  },
  noMaxWidth: {
    maxWidth: "none"
  }
};

class IdentityCertificate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      name: "",
      lastName: "",
      type: "",
      address: "",
      country: "",
      birthDate: moment(),
      files: []
    };
  }

  getState = () => {
    return this.state;
  };

  handleTypeChange = selectedType => {
    this.setState({ type: selectedType });
  };

  handleCountryChange = selectedCountry => {
    this.setState({ country: selectedCountry });
  };

  dateOnChange = date => {
    this.setState({
      birthDate: date
    });
  };

  handleFileChange = files => {
    this.setState({
      files: files
    });
  };

  render() {
    let types = [
      { value: "1", label: "نوزاد (زیر ۱۵ سال)" },
      { value: "2", label: "۱۵ تا ۱۸ سال" },
      { value: "3", label: "بانوان خارجی مزدوج با مرد ایرانی" }
    ];
    let countries = [
      { value: "1", label: "ایران" },
      { value: "2", label: "فرانسه" }
    ];
    return (
      <form onSubmit={this.props.onSubmit}>
        <Grid container spacing={2} dir={"rtl"}>
          <Grid item xs={12} sm={12} md={4} key={"type"}>
            <Tooltip title={"نوع شناسنامه"} style={styles.customWidth}>
              <MultiSingleDropdown
                value={this.state.type}
                isDisabled={false}
                isMultiple={false}
                titleStr={"نوع شناسنامه"}
                isAsync={false}
                syncOptions={types}
                handleChange={this.handleTypeChange}
                isRequired={true}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"country"}>
            <Tooltip title={"کشور محل سکونت"} style={styles.customWidth}>
              <MultiSingleDropdown
                value={this.state.country}
                isDisabled={false}
                isMultiple={false}
                titleStr={"کشور محل سکونت"}
                isAsync={false}
                syncOptions={countries}
                handleChange={this.handleCountryChange}
                isRequired={true}
              />
            </Tooltip>
          </Grid>
        </Grid>
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
                    <ShortTextIcon />
                  </InputAdornment>
                )
              }}
              hint={"نام"}
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
                    <ShortTextIcon />
                  </InputAdornment>
                )
              }}
              hint={"نام خانوادگی"}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"birthDate"}>
            <Tooltip title={"تاریخ تولد"} style={styles.customWidth}>
              <CustomDate
                onChange={dateObject => this.dateOnChange(dateObject)}
                placeholder={"تاریخ تولد"}
                value={this.state.birthDate}
                disabled={false}
                required={true}
                emptyInit={true}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={12} md={8} key={"address"}>
            <CustomInput
              required
              labelText="نشانی در خارج از کشور"
              id="address"
              value={this.state.address}
              onChange={e => this.setState({ address: e.target.value })}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ShortTextIcon />
                  </InputAdornment>
                )
              }}
              hint={"نشانی در خارج از کشور"}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          disabled={this.state.isLoading}
          size="large"
        >
          ثبت سفارش
          {this.state.isLoading && <ButtonCircularProgress />}
        </Button>
      </form>
    );
  }
}
export default IdentityCertificate;
IdentityCertificate.propTypes = {
  classes: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
};
