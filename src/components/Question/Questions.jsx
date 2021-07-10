import React, { Component } from "react";
import PlusComponent from "../Plus/PlusComponent";
import * as PropTypes from "prop-types";
import Question from "./Question";

export default class Questions extends Component {
  constructor(props) {
    super(props);
    this.plusComponentRef = React.createRef();
    this.state = {
      questions: null,
      count: 0
    };
  }

  componentDidMount() {
    this.setState(
      {
        count: this.props.initialQuestions.length
      },
      () => {
        if (this.props.initialQuestions) {
          for (let i = 0; i < this.props.initialQuestions.length; i++)
            this.plusComponentRef.current.addComponent();
        }
      }
    );
  }

  componentDidUpdate() {
    if (
      this.props.initialQuestions &&
      this.props.initialQuestions.length &&
      this.state.count === 0
    )
      this.setState(
        {
          count: this.props.initialQuestions.length
        },
        () => {
          if (this.props.initialQuestions) {
            for (let i = 0; i < this.props.initialQuestions.length; i++)
              this.plusComponentRef.current.addComponent();
          }
        }
      );
  }

  getState = () => {
    return {
      questions: this.plusComponentRef.current.getComponentStateData()
    };
  };

  clearState = () => {
    this.plusComponentRef.current.clearState();
  };

  render() {
    return (
      <PlusComponent
        component={<Question />}
        plusTitle={"افزودن سوال / Ajouter une question"}
        ref={this.plusComponentRef}
        grid={12}
        componentProps={this.props.initialQuestions}
        onComponentRemove={this.props.onComponentRemove}
        name={"questions"}
      />
    );
  }
}
Questions.propTypes = {
  initialQuestions: PropTypes.array,
  onComponentRemove: PropTypes.func
};
