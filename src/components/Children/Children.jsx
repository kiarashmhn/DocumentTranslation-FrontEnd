import React, { Component } from "react";
import PlusComponent from "../Plus/PlusComponent";
import Child from "./Child";
import * as PropTypes from "prop-types";

export default class Children extends Component {
  constructor(props) {
    super(props);
    this.plusComponentRef = React.createRef();
    this.state = {
      children: null
    };
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
        componentProps={{ onChange: this.props.onChildSelect }}
        onComponentRemove={this.props.onComponentRemove}
        hint={"Ajouter des informations sur les enfants"}
      />
    );
  }
}
Children.propTypes = {
  onChildSelect: PropTypes.func,
  onComponentRemove: PropTypes.func
};
