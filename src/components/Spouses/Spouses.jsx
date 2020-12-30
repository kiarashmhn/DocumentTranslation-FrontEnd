import React, { Component } from "react";
import PlusComponent from "../Plus/PlusComponent";
import Spouse from "./Spouse";
import * as PropTypes from "prop-types";

export default class Spouses extends Component {
  constructor(props) {
    super(props);
    this.plusComponentRef = React.createRef();
    this.state = {
      spouses: null,
      spouseCount: 0
    };
  }

  componentDidMount() {
    this.setState(
      {
        spouseCount: this.props.initialSpouses.length
      },
      () => {
        if (this.props.initialSpouses) {
          for (let i = 0; i < this.props.initialSpouses.length; i++)
            this.plusComponentRef.current.addComponent();
        }
      }
    );
  }

  componentDidUpdate() {
    if (
      this.props.initialSpouses &&
      this.props.initialSpouses.length &&
      this.state.spouseCount === 0
    )
      this.setState(
        {
          childCount: this.props.initialSpouses.length
        },
        () => {
          if (this.props.initialSpouses) {
            for (let i = 0; i < this.props.initialSpouses.length; i++)
              this.plusComponentRef.current.addComponent();
          }
        }
      );
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
        componentProps={this.props.initialSpouses}
        onComponentRemove={this.props.onComponentRemove}
        hint={"Ajouter des informations sur le mariage"}
      />
    );
  }
}
Spouses.propTypes = {
  initialSpouses: PropTypes.array,
  onComponentRemove: PropTypes.func
};
