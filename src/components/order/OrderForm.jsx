import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Button, Grid, Typography } from "@material-ui/core";
import {
  getCompleteName,
  getFrenchName,
  getPersianName
} from "../../Dictionary";
import theme from "../../theme";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import StepContent from "@material-ui/core/StepContent";
import Paper from "@material-ui/core/Paper";
import ButtonCircularProgress from "../Template/ButtonCircularProgress";
import NodeGenerator from "../NodeGenerator/NodeGenerator";

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

class OrderForm extends Component {
  constructor(props) {
    super(props);
    let initialState = this.props.initialState ? this.props.initialState : {};
    this.state = {
      step: 0,
      steps: this.props.form.steps,
      ...initialState
    };
    this.nodeGenRef = React.createRef();
  }

  getState = () => {
    return this.state;
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
              onClick={this.handleSave}
              style={styles.submitButton}
            >
              {getCompleteName("save")}
            </Button>
          )}
        </div>
      </div>
    );
  };

  handleNext = event => {
    event.preventDefault();
    let prevState = this.state.step;
    this.setState(
      {
        step: prevState + 1,
        ...this.nodeGenRef.getState()
      },
      () => {
        this.props.onSave();
      }
    );
  };

  handleBack = () => {
    let prevState = this.state.step;
    this.setState({
      step: prevState - 1
    });
  };

  handleSave = event => {
    event.preventDefault();
    let nodeGenState = this.nodeGenRef.getState();
    this.setState(
      {
        ...nodeGenState
      },
      () => {
        this.props.onSave();
      }
    );
  };

  handleSubmit = event => {
    event.preventDefault();
    let nodeGenState = this.nodeGenRef.getState();
    this.setState(
      {
        ...nodeGenState
      },
      () => {
        this.props.onSubmit();
      }
    );
  };

  selectStep = (e, index) => {
    e.preventDefault();
    this.setState({
      step: index
    });
  };

  getSteps = () => {
    return this.props.form.content;
  };

  setRef = e => {
    if (e !== null) this.nodeGenRef = e;
    return this.nodeGenRef;
  };

  render() {
    return (
      <Fragment>
        <div style={styles.root}>
          <Stepper
            activeStep={this.state.step}
            orientation="vertical"
            nonLinear={true}
          >
            {this.getSteps().map((step, index) => (
              <Step key={step.title}>
                <StepLabel>
                  {getCompleteName(step.title)}
                  <IconButton onClick={e => this.selectStep(e, index)}>
                    <EditIcon />
                  </IconButton>
                </StepLabel>
                <StepContent>
                  <form onSubmit={this.handleNext}>
                    <Grid container spacing={2}>
                      <NodeGenerator
                        ref={this.setRef}
                        elements={step.content}
                        externalInitializationData={this.state}
                        id={this.props.itemId ? this.props.itemId : ""}
                      />
                    </Grid>
                    {this.getStepActions()}
                  </form>
                </StepContent>
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
              onClick={this.handleSubmit}
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
OrderForm.propTypes = {
  classes: PropTypes.object,
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  initialState: PropTypes.object,
  itemId: PropTypes.any
};
export default OrderForm;
