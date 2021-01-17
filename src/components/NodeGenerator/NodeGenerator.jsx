import React, { Component } from "react";
import * as PropTypes from "prop-types";
import { isFunction } from "../utils/Validator";
import Grid from "@material-ui/core/Grid";
import FieldInput from "../CustomInput/FieldInput";
import CustomDateInput from "../CustomDateInput/CustomDateInput";
import CustomFileUpload from "../CustomFileUpload/CustomFileUpload";
import Children from "../Children/Children";
import Spouses from "../Spouses/Spouses";

export default class NodesGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.constructState() };
    this.childrenRef = React.createRef();
    this.spousesRef = React.createRef();
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

  getInitialChildren = key => {
    return this.props.externalInitializationData
      ? this.props.externalInitializationData[key]
        ? this.props.externalInitializationData[key]
        : []
      : [];
  };

  getMarriagesFromState = () => {
    if (!this.externalInitializationData) return [];
    let arr1 = [];
    let arr2 = [];
    if (this.externalInitializationData.spouses) arr1 = this.state.spouses;
    if (this.externalInitializationData.divorces) arr2 = this.state.divorces;
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
    let state = this.state;

    let children = this.getChildrenState();
    if (children.children.length > 0) state = { ...state, ...children };

    let marriages = this.getMarriages();
    if (marriages.divorces.length > 0 || marriages.spouses.length > 0)
      state = { ...state, ...marriages };

    return state;
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
              xs={12}
              sm={12}
              md={element.grid ? element.grid : 4}
              key={element.key}
            >
              <FieldInput
                name={element.key}
                value={this.state[element.key]}
                onChange={event => this.elementOnChange(event, element)}
                notRequired={element.notRequired}
                type={element.inputType}
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
                initialChildren={this.getInitialChildren(element.key)}
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
                initialSpouses={this.getMarriagesFromState()}
              />
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
  elements: PropTypes.arrayOf(PropTypes.object).isRequired,
  externalInitializationData: PropTypes.any
};
