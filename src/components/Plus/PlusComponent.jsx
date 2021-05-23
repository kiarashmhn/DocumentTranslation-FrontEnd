import React, { Component } from "react";
import * as PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import * as Validator from "../utils/Validator";
import Grid from "@material-ui/core/Grid";
import CustomTooltip from "../Tooltip/CustomTooltip";
import { getHint } from "../../Dictionary";

export default class PlusComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentObjects: []
    };
    this.componentRefs = {};
  }

  componentDidMount() {
    this.setState({
      componentProps: this.props.componentProps
    });
  }

  componentDidUpdate() {
    if (!this.state.componentProps)
      this.setState({
        componentProps: this.props.componentProps
      });
  }

  addComponent = () => {
    let component = Object.create(this.props.component);
    component["customKey"] = new Date().getTime() + Math.random() * 100;

    this.setState(prevState => ({
      componentObjects: [...prevState.componentObjects, component]
    }));
  };

  removeComponent = i => {
    let componentObjects = [...this.state.componentObjects];
    componentObjects.splice(i, 1);

    let prevComponentProps = this.state.componentProps;
    prevComponentProps.splice(i, 1);
    this.setState({
      componentProps: prevComponentProps
    });

    delete this.componentRefs[i];

    this.setState({ componentObjects }, () => {
      if (Validator.isFunction(this.props.onComponentRemove))
        this.props.onComponentRemove();
    });
  };

  getComponentStateData = () => {
    let componentRefsState = [];

    Object.keys(this.componentRefs).forEach(key => {
      if (Validator.notNull(this.componentRefs[key]))
        componentRefsState.push(this.componentRefs[key].state);
    });

    return componentRefsState;
  };

  clearState = () => {
    this.setState({ componentObjects: [] }, () => {
      if (Validator.isFunction(this.props.onComponentRemove))
        this.props.onComponentRemove();
    });
    this.componentRefs = {};
  };

  getComponentProps = idx => {
    if (!this.state.componentProps || this.state.componentProps.length <= idx)
      return {
        initialState: {}
      };

    return {
      initialState: this.state.componentProps[idx]
    };
  };

  createUI() {
    return this.state.componentObjects.map((DynamicComponent, index) =>
      this.props.grid ? (
        <Grid
          item
          key={DynamicComponent.customKey}
          xs={12}
          sm={12}
          md={this.props.grid}
        >
          <Card variant="outlined">
            <CardContent>
              <DynamicComponent.type
                ref={ref => {
                  // ref && this.componentRefs.push(ref);
                  this.componentRefs[index] = ref;
                }}
                {...this.getComponentProps(index)}
              />
            </CardContent>
            <CardActions>
              <IconButton
                aria-label="delete"
                color="secondary"
                onClick={() => this.removeComponent(index)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ) : (
        <Card key={DynamicComponent.customKey} variant="outlined">
          <CardContent>
            <DynamicComponent.type
              ref={ref => {
                // ref && this.componentRefs.push(ref);
                this.componentRefs[index] = ref;
              }}
              {...this.getComponentProps(index)}
            />
          </CardContent>
          <CardActions style={{ justifyContent: "flex-end" }}>
            <IconButton
              aria-label="delete"
              color="secondary"
              onClick={() => this.removeComponent(index)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </CardActions>
        </Card>
      )
    );
  }

  render() {
    return (
      <>
        {this.createUI()}
        <CardActions>
          <Button
            variant="contained"
            onClick={() => this.addComponent()}
            disabled={this.props.disabled}
            style={{ marginTop: "1%" }}
            dir={"rtl"}
          >
            <AddIcon />
            {this.props.plusTitle ? this.props.plusTitle + " " : ""}
          </Button>
          {getHint(this.props.name) ? (
            <div
              style={{
                marginTop: "8px",
                marginLeft: "20px",
                position: "relative"
              }}
            >
              <CustomTooltip>
                <div>{getHint(this.props.name).french}</div>
                <div dir={"rtl"}>{getHint(this.props.name).persian}</div>
              </CustomTooltip>
            </div>
          ) : null}
        </CardActions>
      </>
    );
  }
}

PlusComponent.propTypes = {
  component: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  stateHandler: PropTypes.func,
  plusTitle: PropTypes.string,
  disabled: PropTypes.bool,
  grid: PropTypes.number,
  componentProps: PropTypes.array,
  onComponentRemove: PropTypes.func
};
