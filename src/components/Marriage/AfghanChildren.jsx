import React, { Component } from "react";
import PlusComponent from "../Plus/PlusComponent";
import * as PropTypes from "prop-types";
import AfghanChild from "./AfghanChild";

export default class AfghanChildren extends Component {
  constructor(props) {
    super(props);
    this.plusComponentRef = React.createRef();
    this.state = {
      afghanChildren: null,
      childCount: 0
    };
  }

  componentDidMount() {
    this.setState(
      {
        childCount: this.props.initialAfghanChildren.length
      },
      () => {
        if (this.props.initialAfghanChildren) {
          for (let i = 0; i < this.props.initialAfghanChildren.length; i++)
            this.plusComponentRef.current.addComponent();
        }
      }
    );
  }

  componentDidUpdate() {
    if (
      this.props.initialAfghanChildren &&
      this.props.initialAfghanChildren.length &&
      this.state.childCount === 0
    )
      this.setState(
        {
          childCount: this.props.initialAfghanChildren.length
        },
        () => {
          if (this.props.initialAfghanChildren) {
            for (let i = 0; i < this.props.initialAfghanChildren.length; i++)
              this.plusComponentRef.current.addComponent();
          }
        }
      );
  }

  getState = () => {
    return {
      afghanChildren: this.plusComponentRef.current.getComponentStateData()
    };
  };

  clearState = () => {
    this.plusComponentRef.current.clearState();
  };

  render() {
    return (
      <PlusComponent
        component={<AfghanChild />}
        plusTitle={"افزودن اطلاعات فرزند / Enfant"}
        ref={this.plusComponentRef}
        grid={12}
        componentProps={this.props.initialAfghanChildren}
        onComponentRemove={this.props.onComponentRemove}
        name={"afghanChildren"}
      />
    );
  }
}
AfghanChildren.propTypes = {
  initialAfghanChildren: PropTypes.array,
  onComponentRemove: PropTypes.func
};
