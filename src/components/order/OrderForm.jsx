import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Button, Grid, Typography, withStyles } from "@material-ui/core";
import {
  getCompleteName,
  getFrenchName,
  getHint,
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
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
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
  submitButton: {
    marginTop: theme.spacing(1),
    float: "right",
    position: "relative"
  },
  actionsContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  }
};

const customStyles = theme => ({
  stepLabel: {
    marginLeft: theme.spacing(0),
    left: theme.spacing(0)
  }
});

class OrderForm extends Component {
  constructor(props) {
    super(props);
    let initialState = this.props.initialState ? this.props.initialState : {};
    this.state = {
      step: 0,
      steps: this.props.form.steps,
      approval: false,
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
            <div style={{ display: "inline" }}>
              <div style={styles.submitButton}>
                <div style={{ display: "inline-block" }}>
                  <Button
                    variant="contained"
                    onClick={this.handleSave}
                    style={{ backgroundColor: "#197163", color: "#FFFFFF" }}
                  >
                    {getCompleteName("save")}
                  </Button>
                </div>
                <div style={{ display: "inline-block" }}>
                  <CustomTooltip>
                    <div>{getHint("save").french}</div>
                    <div dir={"rtl"}>{getHint("save").persian}</div>
                  </CustomTooltip>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  onRefresh = () => {
    this.nodeGenRef.onRefresh();
  };

  handleNext = () => {
    let prevState = this.state.step;
    let nodeGenState = this.nodeGenRef.getState();

    this.setState(
      {
        ...nodeGenState,
        step: prevState + 1
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

  handleSubmit = () => {
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
    this.setState(
      {
        step: index
      },
      () => {
        console.log(this.state);
      }
    );
  };

  getSteps = () => {
    return this.props.form.content;
  };

  setRef = e => {
    if (e !== null) this.nodeGenRef = e;
    return this.nodeGenRef;
  };

  renderSubmit = () => {
    return (
      <div>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            marginTop: "40px"
          }}
        >
          <Checkbox
            checked={!!this.state.approval}
            onChange={e =>
              this.setState({
                approval: e.target.checked
              })
            }
            name={"approval"}
            color="secondary"
          />
          <Typography
            variant="body1"
            align="center"
            style={{ marginTop: "17px" }}
            component={"div"}
          >
            J’accepte des{" "}
            <Link to={{ pathname: "/LegalNotes" }} target={"_blank"}>
              {" "}
              <Box
                fontStyle="bold"
                fontWeight="fontWeightMedium"
                display="inline"
              >
                mentions légales de vente
              </Box>
            </Link>{" "}
            et{" "}
            <Link
              to={{
                pathname: "/DataPrivacy"
              }}
              target={"_blank"}
            >
              {" "}
              <Box
                fontStyle="bold"
                fontWeight="fontWeightMedium"
                display="inline"
              >
                de protection des données
              </Box>
            </Link>
            .
          </Typography>
        </div>
        <Typography
          variant="body1"
          align="center"
          dir={"rtl"}
          component={"div"}
        >
          <Link to={{ pathname: "/LegalNotes" }} target={"_blank"}>
            {" "}
            <Box
              fontStyle="bold"
              fontWeight="fontWeightMedium"
              display="inline"
            >
              قوانین فروش
            </Box>
          </Link>{" "}
          و{" "}
          <Link
            to={{
              pathname: "/DataPrivacy"
            }}
            target={"_blank"}
          >
            {" "}
            <Box
              fontStyle="bold"
              fontWeight="fontWeightMedium"
              display="inline"
            >
              حفاظت از داده‌های شخصی
            </Box>
          </Link>{" "}
          را قبول دارم.
        </Typography>
        <div
          style={{
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
            type={"submit"}
            style={{ ...styles.button, ...{ textTransform: "none" } }}
            variant="contained"
            color="secondary"
            disabled={!this.state.approval}
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
                {this.props.code === "DD"
                  ? getFrenchName("submitOrder")
                  : getFrenchName("submit")}
              </Typography>
              <span
                style={{
                  display: "block",
                  marginBottom: "0",
                  fontSize: 16
                }}
              />
              <Typography variant="body2" align="center" component={"span"}>
                {this.props.code === "DD"
                  ? getPersianName("submitOrder")
                  : getPersianName("submit")}
              </Typography>
            </p>
            {this.props.isLoading && <ButtonCircularProgress />}
          </Button>
          {this.props.code !== "DD" && (
            <div style={{ maxWidth: "100%", position: "relative" }}>
              <CustomTooltip>
                <div>
                  Les informations seront enregistrées et vous passerez à
                  l’étape du paiement. Cependant, avant le paiement, vous aurez
                  la possibilité de modifier les informations saisies via liste
                  commandes.
                </div>
                <div dir={"rtl"}>
                  با فشار بر این دکمه، اطلاعات شما موقتا ثبت میشود و به قسمت
                  پرداخت وارد می شوید. البته قبل از پرداخت، می توانید برای تصحیح
                  آنها از طریق لیست سفارشها اقدام کنید.
                </div>
              </CustomTooltip>
            </div>
          )}
        </div>
      </div>
    );
  };

  onSubmit = e => {
    e.preventDefault();
    this.state.step === this.state.steps - 1
      ? this.handleSubmit()
      : this.handleNext();
  };

  render() {
    let classes = this.props.classes;
    return (
      <Fragment>
        <div style={{ width: "100%" }}>
          <Stepper
            activeStep={this.state.step}
            orientation="vertical"
            nonLinear={true}
          >
            {this.getSteps().map((step, index) => (
              <Step key={step.title}>
                <StepLabel classes={{ label: classes.stepLabel }}>
                  {getCompleteName(step.title)}
                  <IconButton onClick={e => this.selectStep(e, index)}>
                    <EditIcon />
                  </IconButton>
                </StepLabel>
                <StepContent>
                  <form onSubmit={this.onSubmit}>
                    <Grid container spacing={2}>
                      <NodeGenerator
                        ref={this.setRef}
                        elements={step.content}
                        externalInitializationData={this.state}
                        id={this.props.itemId ? this.props.itemId : ""}
                      />
                    </Grid>
                    {this.getStepActions()}
                    {this.state.step === this.state.steps - 1 &&
                      this.renderSubmit()}
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
        </div>
      </Fragment>
    );
  }
}
OrderForm.propTypes = {
  classes: PropTypes.object,
  form: PropTypes.object.isRequired,
  code: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  initialState: PropTypes.object,
  itemId: PropTypes.any
};
export default withStyles(customStyles, { withTheme: true })(OrderForm);
