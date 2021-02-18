import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import HeadSection from "./HeadSection";
import FeatureSection from "./FeatureSection";
import Footer from "../footer/Footer";
import HelpSection from "./HelpSection";

class Home extends Component {
  constructor(props) {
    super(props);
    this.props.selectHome();
    this.homeRef = React.createRef();
    this.featureRef = React.createRef();
    this.aboutRef = React.createRef();
    this.helpRef = React.createRef();
  }

  componentDidMount() {
    this.executeScroll();
  }

  componentDidUpdate() {
    this.executeScroll();
  }

  executeScroll = () => {
    if (this.props.selectedSection === "Features")
      this.featureRef.current.scrollIntoView({
        behavior: "smooth"
      });
    else if (this.props.selectedSection === "About")
      this.aboutRef.current.scrollIntoView({
        behavior: "smooth"
      });
    else if (this.props.selectedSection === "Help")
      this.helpRef.current.scrollIntoView({
        behavior: "smooth"
      });
    else
      this.homeRef.current.scrollIntoView({
        behavior: "smooth"
      });
  };

  render() {
    return (
      <Fragment>
        <div ref={this.homeRef}>
          <HeadSection openRegisterDialog={this.props.openRegisterDialog} />
        </div>
        <div ref={this.featureRef}>
          <FeatureSection openRegisterDialog={this.props.openRegisterDialog} />
        </div>
        <div ref={this.helpRef}>
          <HelpSection />
        </div>
        <div ref={this.aboutRef}>
          <Footer />
        </div>
      </Fragment>
    );
  }
}

Home.propTypes = {
  selectHome: PropTypes.func.isRequired,
  selectedSection: PropTypes.string.isRequired,
  openRegisterDialog: PropTypes.func.isRequired
};

export default Home;
