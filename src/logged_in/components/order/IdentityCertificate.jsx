import React, { Component } from "react";
import PropTypes from "prop-types";
import CustomInput from "../../../custom/CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import ShortTextIcon from "@material-ui/icons/ShortText";
import MultiSingleDropdown from "../../../custom/Dropdown/MultiSingleDropdown";
import moment from "moment-jalaali";
import { Button, Grid, Tooltip, Typography } from "@material-ui/core";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";
import CustomDateInput from "../../../custom/CustomDateInput/CustomDateInput";

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
      gender: "",
      birthDate: moment(),
      birthLocation: "",
      files: [],
      nationalId: "",
      serial: "",
      certificateId: "",
      registrationDate: moment(),
      registrationLocation: "",
      fatherName: "",
      fatherId: "",
      fatherRegistrationLocation: "",
      motherName: "",
      motherId: "",
      motherRegistrationLocation: "",
      maritalStatus: ""
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

  handleGenderChange = selectedGender => {
    this.setState({ gender: selectedGender });
  };

  handleFileChange = files => {
    this.setState({
      files: files
    });
  };

  render() {
    let genders = [
      { value: "1", label: "مرد" },
      { value: "2", label: "زن" }
    ];
    let types = [
      { value: "1", label: "نوزاد (زیر ۱۵ سال)" },
      { value: "2", label: "۱۵ تا ۱۸ سال" },
      { value: "3", label: "بانوان خارجی مزدوج با مرد ایرانی" },
      { value: "4", label: "سایر" }
    ];
    let countries = [
      { value: "1", label: "ایران" },
      { value: "2", label: "فرانسه" }
    ];
    return (
      <form onSubmit={this.props.onSubmit}>
        <Typography variant="body1" color="textSecondary" dir={"rtl"}>
          - نوشتار لاتین نام، نام خانوادگی، تاریخ تولد و دیگر مشخصات خود را با
          پاسپورت یا مدارک دیگر مثل کارت اقامت خود حتما مطابقت دهید.
        </Typography>
        <br />
        <Typography variant="body1" color="textSecondary">
          - On rencontre souvent des difficultés à déterminer la translitération
          exacte des noms et prénoms afghans, les déclarants ne pouvant souvent
          la préciser. Pour réduire les risques d`&apos;erreur, il est fortement
          recommandé de vérifier ses déclarations antérieures auprès des
          administrations (préfecture, OFPRA,…), ses documents officiels déjà
          délivrés par les autorités (récépissé, titre de séjour, passeport…)
          permettant ainsi de concorder l`&apos;orthographe des noms ou prénoms
          à ceux qui ont été déjà enregistrés.
        </Typography>
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
          <Grid item xs={12} sm={12} md={4} key={"gender"}>
            <Tooltip title={"جنسیت"} style={styles.customWidth}>
              <MultiSingleDropdown
                value={this.state.gender}
                isDisabled={false}
                isMultiple={false}
                titleStr={"جنسیت"}
                isAsync={false}
                syncOptions={genders}
                handleChange={this.handleGenderChange}
                isRequired={true}
              />
            </Tooltip>
          </Grid>
        </Grid>
        <Grid container spacing={2} dir={"rtl"}>
          <Grid item xs={12} sm={12} md={4} key={"nationalId"}>
            <CustomInput
              required
              labelText="شماره ملی"
              id="nationalId"
              value={this.state.nationalId}
              onChange={e => this.setState({ nationalId: e.target.value })}
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
              hint={"شماره ملی"}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"certificateId"}>
            <CustomInput
              required
              labelText="شماره شناسنامه"
              id="certificateId"
              value={this.state.certificateId}
              onChange={e => this.setState({ certificateId: e.target.value })}
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
              hint={"شماره شناسنامه"}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"serial"}>
            <CustomInput
              required
              labelText="شماره سریال شناسنامه"
              id="serial"
              value={this.state.serial}
              onChange={e => this.setState({ serial: e.target.value })}
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
              hint={"شماره سریال شناسنامه"}
            />
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
            <CustomDateInput label={"تاریخ تولد"} />
          </Grid>
        </Grid>
        <Grid container spacing={2} dir={"rtl"}>
          <Grid item xs={12} sm={12} md={4} key={"birthLocation"}>
            <CustomInput
              required
              labelText="محل تولد"
              id="birthLocation"
              value={this.state.birthLocation}
              onChange={e => this.setState({ birthLocation: e.target.value })}
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
              hint={"محل تولد"}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"registrationLocation"}>
            <CustomInput
              required
              labelText="محل ثبت"
              id="registrationLocation"
              value={this.state.registrationLocation}
              onChange={e =>
                this.setState({ registrationLocation: e.target.value })
              }
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
              hint={"محل ثبت"}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"registrationDate"}>
            <CustomDateInput label={"تاریخ ثبت"} />
          </Grid>
        </Grid>
        <Grid container spacing={2} dir={"rtl"}>
          <Grid item xs={12} sm={12} md={4} key={"fatherName"}>
            <CustomInput
              required
              labelText="نام پدر"
              id="fatherName"
              value={this.state.fatherName}
              onChange={e => this.setState({ fatherName: e.target.value })}
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
              hint={"نام پدر"}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"fatherId"}>
            <CustomInput
              required
              labelText="شماره شناسنامه یا ملی پدر"
              id="fatherId"
              value={this.state.fatherId}
              onChange={e => this.setState({ fatherId: e.target.value })}
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
              hint={"شماره شناسنامه یا ملی پدر"}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"fatherRegistrationLocation"}>
            <CustomInput
              required
              labelText="محل ثبت شناسنامه پدر"
              id="fatherRegistrationLocation"
              value={this.state.fatherRegistrationLocation}
              onChange={e =>
                this.setState({ fatherRegistrationLocation: e.target.value })
              }
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
              hint={"محل ثبت شناسنامه پدر"}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} dir={"rtl"}>
          <Grid item xs={12} sm={12} md={4} key={"motherName"}>
            <CustomInput
              required
              labelText="نام مادر"
              id="motherName"
              value={this.state.motherName}
              onChange={e => this.setState({ motherName: e.target.value })}
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
              hint={"نام مادر"}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"motherId"}>
            <CustomInput
              required
              labelText="شماره شناسنامه یا ملی مادر"
              id="motherId"
              value={this.state.motherId}
              onChange={e => this.setState({ motherId: e.target.value })}
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
              hint={"شماره شناسنامه یا ملی مادر"}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={"motherRegistrationLocation"}>
            <CustomInput
              required
              labelText="محل ثبت شناسنامه مادر"
              id="motherRegistrationLocation"
              value={this.state.motherRegistrationLocation}
              onChange={e =>
                this.setState({ motherRegistrationLocation: e.target.value })
              }
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
              hint={"محل ثبت شناسنامه مادر"}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} dir={"rtl"}>
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
