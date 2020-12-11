import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import CustomInput from "../CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import MultiSingleDropdown from "../Dropdown/MultiSingleDropdown";
import { Button, Grid, Tooltip, Typography } from "@material-ui/core";
import ButtonCircularProgress from "../Template/ButtonCircularProgress";
import CustomDateInput from "../CustomDateInput/CustomDateInput";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Paper from "@material-ui/core/Paper";
import theme from "../../theme";
import CustomFileUpload from "../CustomFileUpload/CustomFileUpload";
import CustomTooltip from "../Tooltip/CustomTooltip";

const styles = {
  customWidth: {
    maxWidth: 1000
  },
  noMaxWidth: {
    maxWidth: "none"
  },
  root: {
    width: "100%"
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  }
};

const genders = [
  { value: "1", label: "مرد" },
  { value: "2", label: "زن" }
];

const types = [
  { value: "1", label: "نوزاد (زیر ۱۵ سال)" },
  { value: "2", label: "۱۵ تا ۱۸ سال" },
  { value: "3", label: "بانوان خارجی مزدوج با مرد ایرانی" },
  { value: "4", label: "سایر" }
];

const countries = [
  { value: "1", label: "ایران" },
  { value: "2", label: "فرانسه" }
];

const initialState = {
  step: 0,
  steps: 4,
  name: "",
  lastName: "",
  type: "",
  address: "",
  country: "",
  gender: "",
  birthDate: "",
  birthLocation: "",
  files: [],
  nationalId: "",
  serial: "",
  certificateId: "",
  registrationDate: "",
  registrationLocation: "",
  fatherName: "",
  fatherId: "",
  fatherRegistrationLocation: "",
  motherName: "",
  motherId: "",
  motherRegistrationLocation: "",
  maritalStatus: ""
};

class IdentityCertificate extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  getSteps = () => {
    return [
      {
        title: "شروع درخواست",
        content: (
          <form onSubmit={this.handleNext}>
            <Typography variant="body1" color="textSecondary" dir={"rtl"}>
              - نوشتار لاتین نام، نام خانوادگی، تاریخ تولد و دیگر مشخصات خود را
              با پاسپورت یا مدارک دیگر مثل کارت اقامت خود حتما مطابقت دهید.
            </Typography>
            <br />
            <Typography variant="body1" color="textSecondary">
              - On rencontre souvent des difficultés à déterminer la
              translitération exacte des noms et prénoms afghans, les déclarants
              ne pouvant souvent la préciser. Pour réduire les risques
              d`&apos;erreur, il est fortement recommandé de vérifier ses
              déclarations antérieures auprès des administrations (préfecture,
              OFPRA,…), ses documents officiels déjà délivrés par les autorités
              (récépissé, titre de séjour, passeport…) permettant ainsi de
              concorder l`&apos;orthographe des noms ou prénoms à ceux qui ont
              été déjà enregistrés.
            </Typography>
            {this.getStepActions()}
          </form>
        )
      },
      {
        title: "اطلاعات اولیه",
        content: (
          <form onSubmit={this.handleNext}>
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
                        <CustomTooltip text={"N° d'identité national"} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} key={"certificateId"}>
                <CustomInput
                  required
                  labelText="شماره شناسنامه"
                  id="certificateId"
                  value={this.state.certificateId}
                  onChange={e =>
                    this.setState({ certificateId: e.target.value })
                  }
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CustomTooltip text={"N° de l’Acte de l’état civil"} />
                      </InputAdornment>
                    )
                  }}
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
                        <CustomTooltip text={"Numéro séquentiel"} />
                      </InputAdornment>
                    )
                  }}
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
                        <CustomTooltip text={"Prénom"} />
                      </InputAdornment>
                    )
                  }}
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
                        <CustomTooltip text={"Nom"} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} key={"birthDate"}>
                <CustomDateInput
                  label={"تاریخ تولد"}
                  hint={"Date de naissance"}
                  onChange={this.handleBirthDateChange}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} dir={"rtl"}>
              <Grid item xs={12} sm={12} md={4} key={"birthLocation"}>
                <CustomInput
                  required
                  labelText="محل تولد"
                  id="birthLocation"
                  value={this.state.birthLocation}
                  onChange={e =>
                    this.setState({ birthLocation: e.target.value })
                  }
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CustomTooltip text={"Lieu de naissance"} />
                      </InputAdornment>
                    )
                  }}
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
                        <CustomTooltip text={"Lieu d’enregistrement"} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} key={"registrationDate"}>
                <CustomDateInput
                  label={"تاریخ ثبت"}
                  hint={"Date d’enregistrement"}
                  onChange={this.handleRegistrationDateChange}
                />
              </Grid>
            </Grid>
            {this.getStepActions()}
          </form>
        )
      },
      {
        title: "اطلاعات والدین",
        content: (
          <form onSubmit={this.handleNext}>
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
                        <CustomTooltip text={"Prénom du père"} />
                      </InputAdornment>
                    )
                  }}
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
                        <CustomTooltip text={"N° de l’Acte de l’état civil "} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                key={"fatherRegistrationLocation"}
              >
                <CustomInput
                  required
                  labelText="محل صدور شناسنامه پدر"
                  id="fatherRegistrationLocation"
                  value={this.state.fatherRegistrationLocation}
                  onChange={e =>
                    this.setState({
                      fatherRegistrationLocation: e.target.value
                    })
                  }
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CustomTooltip text={"Lieu d’émission"} />
                      </InputAdornment>
                    )
                  }}
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
                        <CustomTooltip text={"Prénom de la mère"} />
                      </InputAdornment>
                    )
                  }}
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
                        <CustomTooltip text={"N° de l’Acte de l’état civil"} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                key={"motherRegistrationLocation"}
              >
                <CustomInput
                  required
                  labelText="محل صدور شناسنامه مادر"
                  id="motherRegistrationLocation"
                  value={this.state.motherRegistrationLocation}
                  onChange={e =>
                    this.setState({
                      motherRegistrationLocation: e.target.value
                    })
                  }
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CustomTooltip text={"Lieu d’émission"} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
            {this.getStepActions()}
          </form>
        )
      },
      {
        title: "بارگذاری تصاویر",
        content: (
          <form onSubmit={this.handleNext}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} key={"files"}>
                <CustomFileUpload onChange={this.onFileChange} />
              </Grid>
            </Grid>
            {this.getStepActions()}
          </form>
        )
      }
    ];
  };

  getStepActions = () => {
    return (
      <div style={styles.actionsContainer}>
        <div>
          <Button
            variant="contained"
            color="secondary"
            disabled={this.state.step === 0}
            onClick={this.handleBack}
            style={styles.button}
          >
            مرحله قبل
          </Button>
          <Button
            variant="contained"
            color="primary"
            type={"submit"}
            style={styles.button}
          >
            {this.state.step === this.state.steps - 1 ? "پایان" : "مرحله بعد"}
          </Button>
        </div>
      </div>
    );
  };

  onFileChange = e => {
    this.setState({
      files: e.target.files
    });
  };

  handleBirthDateChange = newDate => {
    this.setState({
      birthDate: newDate
    });
  };

  handleRegistrationDateChange = newDate => {
    this.setState({
      registrationDate: newDate
    });
  };

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

  handleNext = event => {
    event.preventDefault();
    let prevState = this.state.step;
    this.setState(
      {
        step: prevState + 1
      },
      () => {
        console.log(this.state);
      }
    );
  };

  handleBack = () => {
    let prevState = this.state.step;
    this.setState({
      step: prevState - 1
    });
  };

  handleReset = () => {
    this.setState(initialState);
  };

  render() {
    return (
      <Fragment>
        <div style={styles.root}>
          <Stepper activeStep={this.state.step} orientation="vertical">
            {this.getSteps().map(step => (
              <Step key={step.title}>
                <StepLabel>{step.title}</StepLabel>
                <StepContent>{step.content}</StepContent>
              </Step>
            ))}
          </Stepper>
          {this.state.step === this.getSteps().length && (
            <Paper square elevation={0} style={styles.resetContainer}>
              <Typography>همه مراحل با موفقیت تکمیل شدند</Typography>
              <Button
                onClick={this.props.onSubmit}
                style={styles.button}
                variant="contained"
                color="secondary"
              >
                ثبت درخواست
                {this.props.isLoading && <ButtonCircularProgress />}
              </Button>
            </Paper>
          )}
        </div>
      </Fragment>
    );
  }
}
export default IdentityCertificate;
IdentityCertificate.propTypes = {
  classes: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};
