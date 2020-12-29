import React, { Component } from "react";
import PlusComponent from "../Plus/PlusComponent";
import Child from "./Child";
import * as PropTypes from "prop-types";

export default class Children extends Component {
  constructor(props) {
    super(props);
    this.plusComponentRef = React.createRef();
    this.state = {
      children: null,
      childCount: 0
    };
  }

  componentDidMount() {
    this.setState(
      {
        childCount: this.props.initialChildren.length
      },
      () => {
        if (this.props.initialChildren) {
          for (let i = 0; i < this.props.initialChildren.length; i++)
            this.plusComponentRef.current.addComponent();
        }
      }
    );
  }

  componentDidUpdate() {
    if (
      this.props.initialChildren &&
      this.props.initialChildren.length &&
      this.state.childCount === 0
    )
      this.setState(
        {
          childCount: this.props.initialChildren.length
        },
        () => {
          if (this.props.initialChildren) {
            for (let i = 0; i < this.props.initialChildren.length; i++)
              this.plusComponentRef.current.addComponent();
          }
        }
      );
  }

  getState = () => {
    return {
      children: this.plusComponentRef.current.getComponentStateData()
    };
  };

  clearState = () => {
    this.plusComponentRef.current.clearState();
  };

  render() {
    return (
      <PlusComponent
        component={<Child />}
        plusTitle={"افزودن اطلاعات فرزند"}
        ref={this.plusComponentRef}
        grid={12}
        componentProps={this.props.initialChildren}
        onComponentRemove={this.props.onComponentRemove}
        hint={"Ajouter des informations sur les enfants"}
      />
    );
  }
}
Children.propTypes = {
  initialChildren: PropTypes.array,
  onComponentRemove: PropTypes.func
};
