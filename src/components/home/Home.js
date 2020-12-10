import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import HeadSection from "./HeadSection";
import FeatureSection from "./FeatureSection";
import PricingSection from "./PricingSection";
import Footer from "../footer/Footer";

class Home extends Component {
  constructor(props) {
    super(props);
    this.props.selectHome();
    this.homeRef = React.createRef();
    this.featureRef = React.createRef();
    this.aboutRef = React.createRef();
    this.pricingRef = React.createRef();
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
    else if (this.props.selectedSection === "Pricing")
      this.pricingRef.current.scrollIntoView({
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
          <HeadSection />
        </div>
        <div ref={this.featureRef}>
          <FeatureSection />
        </div>
        <div ref={this.pricingRef}>
          <PricingSection />
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
  selectedSection: PropTypes.string.isRequired
};

export default Home;
