import React, { Component } from "react";
import PlusComponent from "../Plus/PlusComponent";
import Spouse from "./Spouse";
import * as PropTypes from "prop-types";

export default class Spouses extends Component {
  constructor(props) {
    super(props);
    this.plusComponentRef = React.createRef();
    this.state = {
      spouses: null
    };
  }

  getState = () => {
    return {
      spouses: this.plusComponentRef.current.getComponentStateData()
    };
  };

  clearState = () => {
    this.plusComponentRef.current.clearState();
  };

  render() {
    return (
      <PlusComponent
        component={<Spouse />}
        plusTitle={"افزودن اطلاعات ازدواج"}
        ref={this.plusComponentRef}
        grid={12}
        componentProps={{ onChange: this.props.onSpouseSelect }}
        onComponentRemove={this.props.onComponentRemove}
        hint={"Ajouter des informations sur le mariage"}
      />
    );
  }
}
Spouses.propTypes = {
  onSpouseSelect: PropTypes.func,
  onComponentRemove: PropTypes.func
};
