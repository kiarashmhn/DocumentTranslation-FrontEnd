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
import Children from "../Children/Children";
import Spouses from "../Spouses/Spouses";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import {
  getCompleteName,
  getFrenchName,
  getPersianName
} from "../../Dictionary";

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
    marginTop: theme.spacing(3),
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
  steps: 7,
  name: "",
  lastName: "",
  type: "",
  address: "",
  country: "",
  gender: "",
  birthDate: "",
  birthLocation: "",
  children: [],
  spouses: [],
  divorces: [],
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
  description: ""
};

class IdentityCertificate extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.childrenRef = React.createRef();
    this.spousesRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.initialState)
      this.setState({ ...this.props.initialState, step: 0, steps: 7 });
  }

  componentDidUpdate() {
    if (this.props.initialState && this.state === initialState)
      this.setState({ ...this.props.initialState, step: 0, steps: 7 });
  }

  getSteps = () => {
    return [
      {
        title: getCompleteName("uploadFiles"),
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
      },
      {
        title: getCompleteName("personalInfo"),
        content: (
          <form onSubmit={this.handleNext}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} key={"type"}>
                <Tooltip
                  title={getCompleteName("type")}
                  style={styles.customWidth}
                >
                  <MultiSingleDropdown
                    value={this.state.type}
                    isDisabled={false}
                    isMultiple={false}
                    titleStr={getCompleteName("type")}
                    isAsync={false}
                    syncOptions={types}
                    handleChange={this.handleTypeChange}
                    isRequired={true}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} sm={12} md={4} key={"country"}>
                <Tooltip
                  title={getCompleteName("country")}
                  style={styles.customWidth}
                >
                  <MultiSingleDropdown
                    value={this.state.country}
                    isDisabled={false}
                    isMultiple={false}
                    titleStr={getCompleteName("country")}
                    isAsync={false}
                    syncOptions={countries}
                    handleChange={this.handleCountryChange}
                    isRequired={true}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} sm={12} md={4} key={"gender"}>
                <Tooltip
                  title={getCompleteName("gender")}
                  style={styles.customWidth}
                >
                  <MultiSingleDropdown
                    value={this.state.gender}
                    isDisabled={false}
                    isMultiple={false}
                    titleStr={getCompleteName("gender")}
                    isAsync={false}
                    syncOptions={genders}
                    handleChange={this.handleGenderChange}
                    isRequired={true}
                  />
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} key={"nationalId"}>
                <CustomInput
                  required
                  labelText={getPersianName("nationalId")}
                  helperText={getFrenchName("nationalId")}
                  id="nationalId"
                  value={this.state.nationalId}
                  onChange={e => this.setState({ nationalId: e.target.value })}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CustomTooltip text={getCompleteName("nationalId")} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} key={"certificateId"}>
                <CustomInput
                  required
                  labelText={getPersianName("certificateId")}
                  helperText={getFrenchName("certificateId")}
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
                        <CustomTooltip
                          text={getCompleteName("certificateId")}
                        />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} key={"serial"}>
                <CustomInput
                  required
                  labelText={getPersianName("serial")}
                  helperText={getFrenchName("serial")}
                  id="serial"
                  value={this.state.serial}
                  onChange={e => this.setState({ serial: e.target.value })}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CustomTooltip text={getCompleteName("serial")} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} key={"name"}>
                <CustomInput
                  required
                  labelText={getPersianName("name")}
                  helperText={getFrenchName("name")}
                  id="name"
                  value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value })}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CustomTooltip text={getCompleteName("name")} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} key={"lastName"}>
                <CustomInput
                  required
                  labelText={getPersianName("lastName")}
                  helperText={getFrenchName("lastName")}
                  id="lastName"
                  value={this.state.lastName}
                  onChange={e => this.setState({ lastName: e.target.value })}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CustomTooltip text={getCompleteName("lastName")} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} key={"birthDate"}>
                <CustomDateInput
                  name={"birthDate"}
                  initial={
                    this.props.initialState
                      ? this.props.initialState["birthDate"]
                      : ""
                  }
                  onChange={this.handleBirthDateChange}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} key={"birthLocation"}>
                <CustomInput
                  required
                  labelText={getPersianName("birthLocation")}
                  helperText={getFrenchName("birthLocation")}
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
                        <CustomTooltip
                          text={getCompleteName("birthLocation")}
                        />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} key={"registrationLocation"}>
                <CustomInput
                  required
                  labelText={getPersianName("registrationLocation")}
                  helperText={getFrenchName("registrationLocation")}
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
                        <CustomTooltip
                          text={getCompleteName("registrationLocation")}
                        />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} key={"registrationDate"}>
                <CustomDateInput
                  name={"registrationDate"}
                  initial={
                    this.props.initialState
                      ? this.props.initialState["registrationDate"]
                      : ""
                  }
                  onChange={this.handleRegistrationDateChange}
                />
              </Grid>
            </Grid>
            {this.getStepActions()}
          </form>
        )
      },
      {
        title: getCompleteName("parentsInfo"),
        content: (
          <form onSubmit={this.handleNext}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} key={"fatherName"}>
                <CustomInput
                  required
                  labelText={getPersianName("fatherName")}
                  helperText={getFrenchName("fatherName")}
                  id="fatherName"
                  value={this.state.fatherName}
                  onChange={e => this.setState({ fatherName: e.target.value })}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CustomTooltip text={getCompleteName("fatherName")} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} key={"fatherId"}>
                <CustomInput
                  required
                  labelText={getPersianName("fatherId")}
                  helperText={getFrenchName("fatherId")}
                  id="fatherId"
                  value={this.state.fatherId}
                  onChange={e => this.setState({ fatherId: e.target.value })}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CustomTooltip text={getCompleteName("fatherId")} />
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
                  labelText={getPersianName("fatherRegistrationLocation")}
                  helperText={getFrenchName("fatherRegistrationLocation")}
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
                        <CustomTooltip
                          text={getCompleteName("fatherRegistrationLocation")}
                        />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} key={"motherName"}>
                <CustomInput
                  required
                  labelText={getPersianName("motherName")}
                  helperText={getFrenchName("motherName")}
                  id="motherName"
                  value={this.state.motherName}
                  onChange={e => this.setState({ motherName: e.target.value })}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CustomTooltip text={getCompleteName("motherName")} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} key={"motherId"}>
                <CustomInput
                  required
                  labelText={getPersianName("motherId")}
                  helperText={getFrenchName("motherId")}
                  id="motherId"
                  value={this.state.motherId}
                  onChange={e => this.setState({ motherId: e.target.value })}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CustomTooltip text={getCompleteName("motherId")} />
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
                  labelText={getPersianName("motherRegistrationLocation")}
                  helperText={getFrenchName("motherRegistrationLocation")}
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
                        <CustomTooltip
                          text={getCompleteName("motherRegistrationLocation")}
                        />
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
        title: getCompleteName("spousesInfo"),
        content: (
          <form onSubmit={this.handleNext}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} key={"spouses"}>
                <Spouses
                  ref={this.spousesRef}
                  initialSpouses={this.getMarriagesFromState()}
                />
              </Grid>
            </Grid>
            {this.getStepActions()}
          </form>
        )
      },
      {
        title: getCompleteName("childrenInfo"),
        content: (
          <form onSubmit={this.handleNext}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} key={"children"}>
                <Children
                  ref={this.childrenRef}
                  initialChildren={this.state.children}
                />
              </Grid>
            </Grid>
            {this.getStepActions()}
          </form>
        )
      },
      {
        title: getCompleteName("description"),
        content: (
          <form onSubmit={this.handleNext}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} key={"description"}>
                <CustomInput
                  required
                  labelText={getPersianName("description")}
                  helperText={getFrenchName("description")}
                  id="description"
                  value={this.state.description}
                  onChange={e =>
                    this.setState({
                      description: e.target.value
                    })
                  }
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CustomTooltip text={getCompleteName("description")} />
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
        title: getCompleteName("address"),
        content: (
          <form onSubmit={this.handleNext}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} key={"address"}>
                <CustomInput
                  required
                  labelText={getPersianName("address")}
                  helperText={getFrenchName("address")}
                  id="address"
                  value={this.state.address}
                  onChange={e =>
                    this.setState({
                      address: e.target.value
                    })
                  }
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CustomTooltip text={getCompleteName("address")} />
                      </InputAdornment>
                    )
                  }}
                />
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
            {getCompleteName("back")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            type={"submit"}
            style={styles.button}
          >
            {this.state.step === this.state.steps - 1
              ? getCompleteName("save")
              : getCompleteName("next")}
          </Button>
          {this.state.step < this.state.steps - 1 && (
            <Button
              variant="contained"
              color="primary"
              onClick={this.props.onSave}
              style={styles.button}
            >
              {getCompleteName("save")}
            </Button>
          )}
        </div>
      </div>
    );
  };

  removeSpouse = index => {
    let removed = this.state.spouses.splice(index, 1);
    this.setState({
      spouses: removed
    });
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

  getChildren = () => {
    return this.childrenRef.current
      ? this.childrenRef.current.getState()
        ? this.childrenRef.current.getState().children
        : []
      : [];
  };

  getMarriagesFromState = () => {
    let arr1 = [];
    let arr2 = [];
    if (this.state.spouses) arr1 = this.state.spouses;
    if (this.state.divorces) arr2 = this.state.divorces;
    return arr1.concat(arr2);
  };

  getMarriagesFromComponent = () => {
    return this.spousesRef.current
      ? this.spousesRef.current.getState()
        ? this.spousesRef.current.getState().spouses
        : []
      : [];
  };

  getMarriages = () => {
    let marriages = this.getMarriagesFromComponent();
    let divorces = [];
    let spouses = [];
    if (marriages && marriages.length) {
      for (let i = 0; i < marriages.length; i++)
        if (marriages[i].divorce) divorces.push(marriages[i]);
        else spouses.push(marriages[i]);
    }
    return {
      divorces: divorces,
      spouses: spouses
    };
  };

  getState = () => {
    return {
      ...this.state,
      children: this.getChildren(),
      ...this.getMarriages()
    };
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
        console.log(this.getState());
      }
    );
  };

  handleBack = () => {
    let prevState = this.state.step;
    this.setState({
      step: prevState - 1
    });
  };

  selectStep = index => {
    this.setState({
      step: index
    });
  };

  render() {
    return (
      <Fragment>
        <div style={styles.root}>
          <Stepper activeStep={this.state.step} orientation="vertical">
            {this.getSteps().map((step, index) => (
              <Step key={step.title}>
                <StepLabel>
                  {step.title}
                  <IconButton onClick={() => this.selectStep(index)}>
                    <EditIcon />
                  </IconButton>
                </StepLabel>
                <StepContent>{step.content}</StepContent>
              </Step>
            ))}
          </Stepper>
          {this.state.step === this.getSteps().length && (
            <Paper square elevation={0} style={styles.resetContainer}>
              <Typography>{getCompleteName("allStepsCompleted")}</Typography>
            </Paper>
          )}
          <div
            style={{
              maxWidth: "100%",
              verticalAlign: "middle",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10px",
              paddingBottom: "20px",
              marginTop: "5px"
            }}
          >
            <Button
              onClick={this.props.onSubmit}
              style={styles.button}
              variant="contained"
              color="secondary"
            >
              <p>
                <span
                  style={{
                    display: "block",
                    marginBottom: "2px",
                    fontSize: "100%"
                  }}
                ></span>
                <Typography variant="body1" align="center">
                  {getPersianName("submit")}
                </Typography>
                <span
                  style={{
                    display: "block",
                    marginBottom: "0",
                    fontSize: 16
                  }}
                ></span>
                <Typography variant="body2" align="center">
                  {getFrenchName("submit")}
                </Typography>
              </p>
              {this.props.isLoading && <ButtonCircularProgress />}
            </Button>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default IdentityCertificate;
IdentityCertificate.propTypes = {
  classes: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  initialState: PropTypes.object
};
