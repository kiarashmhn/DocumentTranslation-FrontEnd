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

export default class NodesGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.constructState() };
    this.childrenRef = React.createRef();
    this.spousesRef = React.createRef();
    this.fileHandlerRef = React.createRef();
    this.additionalFileHandlerRef = React.createRef();
    this.provinceDistrictRef = React.createRef();
    this.tazkaraRef = React.createRef();
  }

  constructState = () => {
    let temp = {};
    this.props.elements.map(element => {
      element.type === "boolean"
        ? (temp[element.key] = false)
        : (temp[element.key] = "");
    });
    return temp;
  };

  componentDidMount() {
    this.initiateState();
  }

  initiateState = () => {
    let temp = {};
    this.props.elements.map(element => {
      temp[element.key] = this.preparingInitValue(element);
    });

    this.setState({
      ...temp
    });
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

  getInitialArrayByKey = key => {
    return this.props.externalInitializationData
      ? this.props.externalInitializationData[key]
        ? this.props.externalInitializationData[key]
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

    let provinceState = this.provinceDistrictRef
      ? this.provinceDistrictRef.current
        ? this.provinceDistrictRef.current.getState()
        : null
      : null;
    if (provinceState && provinceState.province)
      state = { ...state, ...provinceState };

    let tazkaraState = this.tazkaraRef
      ? this.tazkaraRef.current
        ? this.tazkaraRef.current.getState()
        : null
      : null;
    if (tazkaraState) state = { ...state, ...tazkaraState };

    return state;
  };

  isNotRequired = element => {
    if (element.notRequired) return true;
    if (element.notRequiredField) return !!this.state[element.notRequiredField];
    return false;
  };

  createNodes = elements => {
    return elements.map(element => {
      switch (element.type) {
        case "textarea":
        case "string":
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
                onChange={event => this.fileOnChange(event, element)}
              />
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
                ref={this.provinceDistrictRef}
                province={
                  this.props.externalInitializationData[element.provinceKey]
                }
                district={
                  this.props.externalInitializationData[element.districtKey]
                }
                village={
                  this.props.externalInitializationData[element.villageKey]
                }
                name={element.name}
                provinceKey={element.provinceKey}
                districtKey={element.districtKey}
                villageKey={element.villageKey}
                required={!element.notRequired}
              />
            </Grid>
          );
        case "select":
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={element.grid ? element.grid : 4}
              key={element.key}
            >
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
                ref={this.tazkaraRef}
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
