import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Button, Grid, Typography } from "@material-ui/core";
import ButtonCircularProgress from "../Template/ButtonCircularProgress";
import CustomDateInput from "../CustomDateInput/CustomDateInput";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Paper from "@material-ui/core/Paper";
import theme from "../../theme";
import CustomFileUpload from "../CustomFileUpload/CustomFileUpload";
import Children from "../Children/Children";
import Spouses from "../Spouses/Spouses";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import {
  getCompleteName,
  getFrenchName,
  getPersianName
} from "../../Dictionary";
import FieldInput from "../CustomInput/FieldInput";

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
  submitButton: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(70),
    backgroundColor: "#197163",
    color: "#FFFFFF"
  },
  actionsContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  }
};

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
        title: getCompleteName("uploadIDFiles"),
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
              <Grid item xs={12} sm={12} md={4} key={"nationalId"}>
                <FieldInput
                  name={"nationalId"}
                  value={this.state.nationalId}
                  onChange={e => this.setState({ nationalId: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} key={"certificateId"}>
                <FieldInput
                  name={"certificateId"}
                  value={this.state.certificateId}
                  onChange={e =>
                    this.setState({ certificateId: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} key={"serial"}>
                <FieldInput
                  name={"serial"}
                  value={this.state.serial}
                  onChange={e => this.setState({ serial: e.target.value })}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} key={"name"}>
                <FieldInput
                  name={"name"}
                  value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} key={"lastName"}>
                <FieldInput
                  name={"lastName"}
                  value={this.state.lastName}
                  onChange={e => this.setState({ lastName: e.target.value })}
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
                <FieldInput
                  name={"birthLocation"}
                  value={this.state.birthLocation}
                  onChange={e =>
                    this.setState({ birthLocation: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} key={"registrationLocation"}>
                <FieldInput
                  name={"registrationLocation"}
                  value={this.state.registrationLocation}
                  onChange={e =>
                    this.setState({ registrationLocation: e.target.value })
                  }
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
                <FieldInput
                  name={"fatherName"}
                  value={this.state.fatherName}
                  onChange={e => this.setState({ fatherName: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} key={"fatherId"}>
                <FieldInput
                  name={"fatherId"}
                  value={this.state.fatherId}
                  onChange={e => this.setState({ fatherId: e.target.value })}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                key={"fatherRegistrationLocation"}
              >
                <FieldInput
                  name={"fatherRegistrationLocation"}
                  value={this.state.fatherRegistrationLocation}
                  onChange={e =>
                    this.setState({
                      fatherRegistrationLocation: e.target.value
                    })
                  }
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} key={"motherName"}>
                <FieldInput
                  name={"motherName"}
                  value={this.state.motherName}
                  onChange={e =>
                    this.setState({
                      motherName: e.target.value
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} key={"motherId"}>
                <FieldInput
                  name={"motherId"}
                  value={this.state.motherId}
                  onChange={e =>
                    this.setState({
                      motherId: e.target.value
                    })
                  }
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                key={"motherRegistrationLocation"}
              >
                <FieldInput
                  name={"motherRegistrationLocation"}
                  value={this.state.motherRegistrationLocation}
                  onChange={e =>
                    this.setState({
                      motherRegistrationLocation: e.target.value
                    })
                  }
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
                <FieldInput
                  name={"description"}
                  value={this.state.description}
                  onChange={e =>
                    this.setState({
                      description: e.target.value
                    })
                  }
                  notRequired={true}
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
                <FieldInput
                  name={"address"}
                  value={this.state.address}
                  onChange={e =>
                    this.setState({
                      address: e.target.value
                    })
                  }
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
            disabled={this.state.step === this.state.steps - 1}
          >
            {getCompleteName("next")}
          </Button>
          {this.state.step <= this.state.steps - 1 && (
            <Button
              variant="contained"
              onClick={this.props.onSave}
              style={styles.submitButton}
            >
              {getCompleteName("save")}
            </Button>
          )}
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

  getChildren = () => {
    return this.childrenRef.current
      ? this.childrenRef.current.getState()
        ? { children: this.childrenRef.current.getState().children }
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
      ...this.getChildren(),
      ...this.getMarriages()
    };
  };

  handleNext = event => {
    event.preventDefault();
    let prevState = this.state.step;
    if (prevState === 3) {
      this.setState({
        step: prevState + 1,
        ...this.getMarriages()
      });
    } else if (prevState === 4) {
      this.setState({
        step: prevState + 1,
        ...this.getChildren()
      });
    } else {
      this.setState({
        step: prevState + 1
      });
    }

    this.props.onSave(event);
  };

  handleBack = () => {
    let prevState = this.state.step;
    if (prevState === 3) {
      this.setState({
        step: prevState - 1,
        ...this.getMarriages()
      });
    } else if (prevState === 4) {
      this.setState({
        step: prevState - 1,
        ...this.getChildren()
      });
    } else {
      this.setState({
        step: prevState - 1
      });
    }
  };

  selectStep = index => {
    let prevState = this.state.step;
    if (prevState === 3) {
      this.setState({
        step: index,
        ...this.getMarriages()
      });
    } else if (prevState === 4) {
      this.setState({
        step: index,
        ...this.getChildren()
      });
    } else {
      this.setState({
        step: index
      });
    }
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
                />
                <Typography variant="body1" align="center" component={"span"}>
                  {getPersianName("submit")}
                </Typography>
                <span
                  style={{
                    display: "block",
                    marginBottom: "0",
                    fontSize: 16
                  }}
                />
                <Typography variant="body2" align="center" component={"span"}>
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
