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

export default class PlusComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentObjects: []
    };
    this.componentRefs = {};
  }

  addComponent = () => {
    let component = Object.create(this.props.component);
    component["customKey"] = new Date().getTime();

    this.setState(prevState => ({
      componentObjects: [...prevState.componentObjects, component]
    }));
  };

  removeComponent = i => {
    let componentObjects = [...this.state.componentObjects];
    componentObjects.splice(i, 1);

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
                {...this.props.componentProps}
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
              {...this.props.componentProps}
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
          <div
            style={{
              marginTop: "8px",
              marginLeft: "20px",
              position: "relative"
            }}
          >
            <CustomTooltip text={this.props.hint} />
          </div>
        </CardActions>
      </>
    );
  }
}

PlusComponent.propTypes = {
  component: PropTypes.object.isRequired,
  hint: PropTypes.string.isRequired,
  stateHandler: PropTypes.func,
  plusTitle: PropTypes.string,
  disabled: PropTypes.bool,
  grid: PropTypes.number,
  componentProps: PropTypes.any,
  onComponentRemove: PropTypes.func
};
