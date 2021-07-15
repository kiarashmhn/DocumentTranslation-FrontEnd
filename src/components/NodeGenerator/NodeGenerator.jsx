import React, { Component } from "react";
import * as PropTypes from "prop-types";
import { isFunction } from "../utils/Validator";
import Grid from "@material-ui/core/Grid";
import FieldInput from "../CustomInput/FieldInput";
import CustomDateInput from "../CustomDateInput/CustomDateInput";
import CustomFileUpload from "../CustomFileUpload/CustomFileUpload";
import Children from "../Children/Children";
import Spouses from "../Spouses/Spouses";
import {
  getCompleteName,
  getFrenchName,
  getHint,
  getPersianName
} from "../../Dictionary";
import Checkbox from "@material-ui/core/Checkbox";
import ControlledOpenSelect from "../Dropdown/Dropdown";
import FileHandler from "../File/FileHandler";
import ProvinceDistrict from "../ProvinceDistrict/ProvinceDistrict";
import TazkaraInfo from "../TazkaraInfo/TazkaraInfo";
import ComplexDateInput from "../CustomDateInput/ComplexDateInput";
import CustomAutoComplete from "../AutoComplete/CustomAutoComplete";
import Witness from "../Marriage/Witness";
import Valuable from "../Marriage/Valuable";
import CustomTooltip from "../Tooltip/CustomTooltip";
import LicenseType from "../Marriage/LicenseType";
import AfghanWitness from "../Marriage/AfghanWitness";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import Address from "../Address";
import DocumentPlace from "../DocumentPlace/DocumentPlace";
import AfghanChildren from "../Marriage/AfghanChildren";
import Sign from "../Sign";
import Questions from "../Question/Questions";
import CustomFileDownload from "../File/CustomFileDownload";

export default class NodesGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.constructState() };
    this.childrenRef = React.createRef();
    this.afghanChildrenRef = React.createRef();
    this.questionRef = React.createRef();
    this.spousesRef = React.createRef();
    this.fileHandlerRef = React.createRef();
    this.additionalFileHandlerRef = React.createRef();
  }

  constructState = () => {
    let temp = {};
    for (let element of this.props.elements)
      if (element.type === "boolean") temp[element.key] = false;
      else temp[element.key] = "";

    return temp;
  };

  componentDidMount() {
    this.initiateState();
  }

  initiateState = () => {
    let temp = this.props.externalInitializationData
      ? this.props.externalInitializationData
      : {};
    for (let element of this.props.elements)
      temp[element.key] = this.preparingInitValue(element);

    this.setState({
      ...temp
    });
  };

  addressOnChange = value => {
    this.setState({ ...this.state, ...value });
  };

  preparingInitValue = element => {
    if (element.type === "boolean")
      return !!(
        this.props.externalInitializationData &&
        this.props.externalInitializationData[element.key] === "true"
      );
    else
      return this.props.externalInitializationData &&
        (this.props.externalInitializationData[element.key] ||
          this.props.externalInitializationData[element.key] === 0)
        ? this.props.externalInitializationData[element.key]
        : element.value
        ? element.value
        : "";
  };

  onRefresh = () => {
    if (this.fileHandlerRef && this.fileHandlerRef.current)
      this.fileHandlerRef.current.reset();
    if (this.additionalFileHandlerRef && this.additionalFileHandlerRef.current)
      this.additionalFileHandlerRef.current.reset();
  };

  elementOnChange = (event, element) => {
    const {
      target: { value }
    } = event;
    this.onChange(value, element);
  };

  onChange = (value, element) => {
    this.setState({ [element.key]: this.prepareValue(value, element.type) });
    if (isFunction(element.onChange)) element.onChange();
  };

  fileOnChange = (event, element) => {
    this.onChange(event.target.files, element);
  };

  checkBoxOnChange = (e, element) => {
    this.setState({
      [element.key]: e.target.checked
    });
  };

  prepareValue = (value, type) => {
    switch (type) {
      case "long":
      case "number":
        return parseInt(value);
      default:
        return value;
    }
  };

  getChildrenState = () => {
    return this.childrenRef.current
      ? this.childrenRef.current.getState()
        ? { children: this.childrenRef.current.getState().children }
        : { children: [] }
      : { children: [] };
  };

  getAfghanChildrenState = () => {
    return this.afghanChildrenRef.current
      ? this.afghanChildrenRef.current.getState()
        ? {
            afghanChildren: this.afghanChildrenRef.current.getState()
              .afghanChildren
          }
        : { afghanChildren: [] }
      : { afghanChildren: [] };
  };

  getQuestionsState = () => {
    return this.questionRef.current
      ? this.questionRef.current.getState()
        ? {
            questions: this.questionRef.current.getState().questions
          }
        : { questions: [] }
      : { questions: [] };
  };

  getInitialArrayByKey = key => {
    return this.props.externalInitializationData
      ? this.props.externalInitializationData[key]
        ? this.props.externalInitializationData[key]
        : []
      : [];
  };

  getInitialQuestions = () => {
    return this.props.externalInitializationData
      ? this.props.externalInitializationData.questions
        ? this.props.externalInitializationData.questions.questions
        : []
      : [];
  };

  getSpousesState = () => {
    return this.spousesRef.current
      ? this.spousesRef.current.getState()
        ? { spouses: this.spousesRef.current.getState().spouses }
        : { spouses: [] }
      : { spouses: [] };
  };

  getState = () => {
    let state = this.state;

    let children = this.getChildrenState();
    if (children.children.length > 0) state = { ...state, ...children };

    let afghanChildren = this.getAfghanChildrenState();
    if (afghanChildren.afghanChildren.length > 0)
      state = { ...state, ...afghanChildren };

    let questions = this.getQuestionsState();
    if (questions.questions.length > 0)
      state = { ...state, ...{ questions: questions } };

    let marriages = this.getSpousesState();
    if (marriages.spouses.length > 0) state = { ...state, ...marriages };

    let files = this.fileHandlerRef
      ? this.fileHandlerRef.current
        ? this.fileHandlerRef.current.getState()
        : []
      : [];
    if (files.length > 0) state = { ...state, ...{ files: files } };

    let additionalFiles = this.additionalFileHandlerRef
      ? this.additionalFileHandlerRef.current
        ? this.additionalFileHandlerRef.current.getState()
        : []
      : [];
    if (additionalFiles.length > 0)
      state = { ...state, ...{ additionalFiles: additionalFiles } };

    return state;
  };

  isNotRequired = element => {
    if (element.required) return false;
    if (element.notRequired) return true;
    if (element.notRequiredField) return !!this.state[element.notRequiredField];
    if (element.requiredField) return !this.state[element.requiredField];
    return false;
  };

  createNodes = elements => {
    return elements.map(element => {
      switch (element.type) {
        case "textarea":
        case "string":
          return (
            <Grid
              item
              xs={element.xsGrid ? element.xsGrid : 12}
              sm={element.smGrid ? element.smGrid : 12}
              md={element.grid ? element.grid : 12}
              key={element.key}
            >
              <Typography>
                <div style={{ display: "grid" }}>
                  <div style={{ display: "inline-flex" }}>
                    <div style={{ paddingTop: "14px" }}>
                      {getFrenchName(element.key)}
                    </div>
                    {getHint(element.key) && (
                      <div style={{ padding: "0px 10px" }}>
                        <CustomTooltip>
                          <div>{getHint(element.key).french}</div>
                        </CustomTooltip>
                      </div>
                    )}
                  </div>
                  <div style={{ display: "inline-flex" }}>
                    {getHint(element.key) && (
                      <div style={{ padding: "0px 10px" }}>
                        {" "}
                        <CustomTooltip>
                          <div dir={"rtl"}>{getHint(element.key).persian}</div>
                        </CustomTooltip>
                      </div>
                    )}
                    <div style={{ paddingTop: "14px" }} dir={"rtl"}>
                      {getPersianName(element.key)}
                    </div>
                  </div>
                </div>
              </Typography>
            </Grid>
          );
        case "text":
          return (
            <Grid
              item
              xs={element.xsGrid ? element.xsGrid : 12}
              sm={element.smGrid ? element.smGrid : 12}
              md={element.grid ? element.grid : 4}
              key={element.key}
            >
              <FieldInput
                name={element.key}
                value={this.state[element.key]}
                onChange={event => this.elementOnChange(event, element)}
                notRequired={this.isNotRequired(element)}
                type={element.inputType}
              />
            </Grid>
          );
        case "autoComplete":
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={element.grid ? element.grid : 4}
              key={element.key}
            >
              <CustomAutoComplete
                name={element.key}
                options={element.options}
                value={this.state[element.key]}
                onChange={event => this.elementOnChange(event, element)}
                required={element.required}
              />
            </Grid>
          );
        case "date":
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={element.grid ? element.grid : 4}
              key={element.key}
            >
              <CustomDateInput
                name={element.key}
                initial={
                  this.props.externalInitializationData
                    ? this.props.externalInitializationData[element.key]
                    : ""
                }
                onChange={value => this.onChange(value, element)}
                hideHelper={element.hideHelper}
              />
            </Grid>
          );
        case "complexDate":
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={element.grid ? element.grid : 8}
              key={element.key}
            >
              <ComplexDateInput
                name={element.key}
                initial={
                  this.props.externalInitializationData
                    ? this.props.externalInitializationData[element.key]
                    : ""
                }
                required={!!element.required}
                onChange={value => this.onChange(value, element)}
              />
            </Grid>
          );
        case "file":
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={element.grid ? element.grid : 12}
              key={element.key}
            >
              <CustomFileUpload
                single={true}
                onChange={event => this.fileOnChange(event, element)}
                required={element.required}
              />
            </Grid>
          );
        case "fileDownload":
          return (
            <Grid
              item
              xs={12}
              sm={element.smGrid ? element.smGrid : 12}
              md={element.grid ? element.grid : 12}
              key={element.key}
            >
              <CustomFileDownload id={element.id} name={element.name} />
            </Grid>
          );
        case "fileHandler":
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={element.grid ? element.grid : 12}
              key={element.key}
            >
              <FileHandler
                ref={this.fileHandlerRef}
                orderId={this.props.id}
                type={element.fileType}
                required={element.required}
              />
            </Grid>
          );
        case "additionalFileHandler":
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={element.grid ? element.grid : 12}
              key={element.key}
            >
              <FileHandler
                ref={this.additionalFileHandlerRef}
                orderId={this.props.id}
                type={element.fileType}
                tooltipKey={element.tooltipKey}
              />
            </Grid>
          );
        case "children":
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={element.grid ? element.grid : 12}
              key={element.key}
            >
              <Children
                ref={this.childrenRef}
                initialChildren={this.getInitialArrayByKey(element.key)}
              />
            </Grid>
          );
        case "sign":
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={element.grid ? element.grid : 12}
              key={element.key}
            >
              <Sign
                onChange={v => this.addressOnChange(v)}
                initial={this.props.externalInitializationData}
              />
            </Grid>
          );
        case "afghanChildren":
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={element.grid ? element.grid : 12}
              key={element.key}
            >
              <AfghanChildren
                ref={this.afghanChildrenRef}
                initialAfghanChildren={this.getInitialArrayByKey(element.key)}
              />
            </Grid>
          );
        case "questions":
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={element.grid ? element.grid : 12}
              key={element.key}
            >
              <Questions
                ref={this.questionRef}
                initialQuestions={this.getInitialQuestions()}
              />
            </Grid>
          );
        case "spouses":
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={element.grid ? element.grid : 12}
              key={element.key}
            >
              <Spouses
                ref={this.spousesRef}
                initialSpouses={this.getInitialArrayByKey(element.key)}
              />
            </Grid>
          );
        case "provinceDistrict":
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={element.grid ? element.grid : 12}
              key={element.key}
            >
              <ProvinceDistrict
                initial={
                  this.props.externalInitializationData
                    ? this.props.externalInitializationData[element.key]
                    : null
                }
                name={element.name}
                provinceKey={element.provinceKey}
                districtKey={element.districtKey}
                villageKey={element.villageKey}
                required={!element.notRequired}
                onChange={v => this.onChange(v, element)}
                showCountry={element.showCountry}
              />
            </Grid>
          );
        case "select":
          if (!getHint(element.key))
            return (
              <Grid
                item
                xs={element.xsGrid ? element.xsGrid : 12}
                sm={element.smGrid ? element.smGrid : 12}
                md={element.grid ? element.grid : 4}
                key={element.key}
              >
                <ControlledOpenSelect
                  required={!this.isNotRequired(element)}
                  value={this.state[element.key]}
                  keyId={element.key}
                  onChange={event => this.elementOnChange(event, element)}
                  names={element.options.map(option => ({
                    value: option.value,
                    displayName: getCompleteName(option.key)
                  }))}
                  title={getFrenchName(element.key)}
                  helperText={getPersianName(element.key)}
                  disabled={element.readOnly}
                />
              </Grid>
            );
          else
            return (
              <Grid
                item
                xs={element.xsGrid ? element.xsGrid : 12}
                sm={element.smGrid ? element.smGrid : 12}
                md={element.grid ? element.grid : 4}
                key={element.key}
              >
                <Grid container spacing={0}>
                  <Grid item xs={11} sm={11} md={11}>
                    <ControlledOpenSelect
                      required={element.required}
                      value={this.state[element.key]}
                      keyId={element.key}
                      onChange={event => this.elementOnChange(event, element)}
                      names={element.options.map(option => ({
                        value: option.value,
                        displayName: getCompleteName(option.key)
                      }))}
                      title={getFrenchName(element.key)}
                      helperText={getPersianName(element.key)}
                      disabled={element.readOnly}
                    />
                  </Grid>
                  <Grid item xs={1} sm={1} md={1}>
                    <div style={{ marginTop: "43px" }}>
                      <CustomTooltip>
                        <div>{getHint(element.key).french}</div>
                        <div dir={"rtl"}>{getHint(element.key).persian}</div>
                      </CustomTooltip>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            );
        case "check":
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={element.grid ? element.grid : 4}
              key={element.key}
            >
              <div
                style={{
                  marginTop: "43px",
                  alignItems: "center",
                  display: "inline-flex"
                }}
              >
                <Checkbox
                  checked={!!this.state[element.key]}
                  onChange={e => this.checkBoxOnChange(e, element)}
                  name={element.key + "name"}
                  color="secondary"
                />
                <span style={{ display: "contents" }}>
                  {getCompleteName(element.key)}
                  {getHint(element.key) && (
                    <CustomTooltip>
                      <div>{getHint(element.key).french}</div>
                      <div dir={"rtl"}>{getHint(element.key).persian}</div>{" "}
                    </CustomTooltip>
                  )}
                </span>
              </div>
            </Grid>
          );
        case "tazkaraInfo":
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={element.grid ? element.grid : 4}
              key={element.key}
            >
              <TazkaraInfo
                name={element.key}
                initial={this.props.externalInitializationData}
                onChange={v => this.onChange(v, element)}
              />
            </Grid>
          );
        case "witness":
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={element.grid ? element.grid : 12}
              key={element.key}
            >
              <Witness
                id={element.key}
                idx={"1"}
                onChange={value =>
                  this.setState({ [element.key + "1"]: value })
                }
                initialState={
                  this.props.externalInitializationData
                    ? this.props.externalInitializationData[element.key + "1"]
                    : null
                }
                options={element.options}
              />
              <Witness
                id={element.key}
                idx={"2"}
                onChange={value =>
                  this.setState({ [element.key + "2"]: value })
                }
                initialState={
                  this.props.externalInitializationData
                    ? this.props.externalInitializationData[element.key + "2"]
                    : null
                }
                options={element.options}
              />
              <Witness
                id={element.key}
                idx={"3"}
                onChange={value =>
                  this.setState({ [element.key + "3"]: value })
                }
                initialState={
                  this.props.externalInitializationData
                    ? this.props.externalInitializationData[element.key + "3"]
                    : null
                }
                options={element.options}
              />
            </Grid>
          );
        case "representer":
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={element.grid ? element.grid : 12}
              key={element.key}
            >
              <Witness
                id={element.key}
                idx={"1"}
                onChange={value =>
                  this.setState({ [element.key + "1"]: value })
                }
                initialState={
                  this.props.externalInitializationData
                    ? this.props.externalInitializationData[element.key + "1"]
                    : null
                }
                options={element.options}
              />
              <Witness
                id={element.key}
                idx={"2"}
                onChange={value =>
                  this.setState({ [element.key + "2"]: value })
                }
                initialState={
                  this.props.externalInitializationData
                    ? this.props.externalInitializationData[element.key + "2"]
                    : null
                }
                options={element.options}
              />
            </Grid>
          );
        case "documentPlace":
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={element.grid ? element.grid : 12}
              key={element.key}
            >
              <DocumentPlace
                onChange={value => this.setState({ [element.key]: value })}
                initial={
                  this.props.externalInitializationData
                    ? this.props.externalInitializationData[element.key]
                    : null
                }
              />
            </Grid>
          );
        case "afghanRepresenter":
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={element.grid ? element.grid : 12}
              key={element.key}
            >
              <AfghanWitness
                id={element.key}
                idx={"1"}
                onChange={value =>
                  this.setState({ [element.key + "1"]: value })
                }
                initialState={
                  this.props.externalInitializationData
                    ? this.props.externalInitializationData[element.key + "1"]
                    : null
                }
              />
              <AfghanWitness
                id={element.key}
                idx={"2"}
                onChange={value =>
                  this.setState({ [element.key + "2"]: value })
                }
                initialState={
                  this.props.externalInitializationData
                    ? this.props.externalInitializationData[element.key + "2"]
                    : null
                }
              />
              <AfghanWitness
                id={element.key}
                idx={"3"}
                onChange={value =>
                  this.setState({ [element.key + "3"]: value })
                }
                initialState={
                  this.props.externalInitializationData
                    ? this.props.externalInitializationData[element.key + "3"]
                    : null
                }
              />
            </Grid>
          );
        case "afghanWitness":
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={element.grid ? element.grid : 12}
              key={element.key}
            >
              <AfghanWitness
                id={element.key}
                idx={"1"}
                onChange={value =>
                  this.setState({ [element.key + "1"]: value })
                }
                initialState={
                  this.props.externalInitializationData
                    ? this.props.externalInitializationData[element.key + "1"]
                    : null
                }
              />
              <AfghanWitness
                id={element.key}
                idx={"2"}
                onChange={value =>
                  this.setState({ [element.key + "2"]: value })
                }
                initialState={
                  this.props.externalInitializationData
                    ? this.props.externalInitializationData[element.key + "2"]
                    : null
                }
              />
            </Grid>
          );
        case "valuable":
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={element.grid ? element.grid : 12}
              key={element.key}
            >
              <Valuable
                name={element.key}
                valueKey={element.valueKey ? element.valueKey : "value"}
                onChange={value => this.setState({ [element.key]: value })}
                valueRequired={element.required}
                defaultValue={element.defaultValue}
                initialState={
                  this.props.externalInitializationData
                    ? this.props.externalInitializationData[element.key]
                    : null
                }
              />
            </Grid>
          );
        case "licenseType":
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={element.grid ? element.grid : 12}
              key={element.key}
            >
              <LicenseType
                name={element.key}
                valueKey={element.valueKey ? element.valueKey : "value"}
                onChange={value => this.setState({ [element.key]: value })}
                valueRequired={element.required}
                defaultValue={element.defaultValue}
                initialState={
                  this.props.externalInitializationData
                    ? this.props.externalInitializationData[element.key]
                    : null
                }
              />
            </Grid>
          );
        case "empty":
          return (
            <Grid
              item
              xs={element.xsGrid ? element.xsGrid : 12}
              sm={element.smGrid ? element.smGrid : 12}
              md={element.grid ? element.grid : 4}
              key={element.key}
            >
              <div />
            </Grid>
          );
        case "address":
          return (
            <Grid
              item
              xs={element.xsGrid ? element.xsGrid : 12}
              sm={element.smGrid ? element.smGrid : 12}
              md={element.grid ? element.grid : 12}
              key={element.key}
            >
              <Address
                onChange={this.addressOnChange}
                initial={this.props.externalInitializationData}
              />
            </Grid>
          );
        case "multi":
          return (
            <Grid
              item
              xs={element.xsGrid ? element.xsGrid : 12}
              sm={element.smGrid ? element.smGrid : 12}
              md={element.grid ? element.grid : 4}
              key={element.key}
            >
              <Grid container spacing={1}>
                {element.fields &&
                  element.fields.map(f => (
                    <Grid
                      item
                      xs={12 / element.fields.length}
                      sm={12 / element.fields.length}
                      md={12 / element.fields.length}
                      key={f.key}
                    >
                      <FieldInput
                        name={f.key}
                        value={this.state[f.key]}
                        onChange={event => this.elementOnChange(event, f)}
                        notRequired={this.isNotRequired(element)}
                        type={element.inputType}
                      />
                    </Grid>
                  ))}
              </Grid>
              <div
                style={{
                  display: "flex",
                  position: "relative",
                  alignItems: "center",
                  justifyContent: "center",
                  direction: "ltr",
                  top: 0,
                  marginTop: 0
                }}
              >
                <FormHelperText
                  style={{
                    color: "#000000",
                    marginTop: "2px"
                  }}
                >
                  {getCompleteName(element.key)}
                </FormHelperText>
              </div>
            </Grid>
          );
        default:
          return <div key={element.key} />;
      }
    });
  };

  render() {
    return <>{this.createNodes(this.props.elements)}</>;
  }
}

NodesGenerator.propTypes = {
  id: PropTypes.any,
  elements: PropTypes.arrayOf(PropTypes.object).isRequired,
  externalInitializationData: PropTypes.any
};
