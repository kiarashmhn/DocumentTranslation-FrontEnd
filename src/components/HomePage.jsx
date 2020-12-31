import React, { memo, Component } from "react";
import PropTypes from "prop-types";
import AOS from "aos/dist/aos";
import { withStyles } from "@material-ui/core";
import NavBar from "./home_navigation/NavBar";
import "aos/dist/aos.css";
import dummyBlogPosts from "./dummy_data/blogPosts";
import DialogSelector from "./register_login/DialogSelector";
import Routing from "./Routing";
import smoothScrollTop from "../functions/smoothScrollTop";

AOS.init({ once: true });

const styles = theme => ({
  wrapper: {
    backgroundColor: theme.palette.common.white,
    overflowX: "hidden"
  }
});

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: null,
      isMobileDrawerOpen: false,
      blogPosts: [],
      dialogOpen: null,
      isCookieRulesDialogOpen: false,
      selectedSection: "Home"
    };
  }

  componentDidMount() {
    this.fetchBlogPosts();
  }

  selectTab = tab => {
    this.setState({
      selectedTab: tab,
      selectedSection: ""
    });
  };

  selectHome = () => {
    smoothScrollTop();
    document.title = "DT - Document Translator";
    this.setState({
      selectedTab: "Home",
      selectedSection: "Home"
    });
  };

  selectFeatures = () => {
    document.title = "DT - امکانات";
    this.setState({
      selectedTab: "Home",
      selectedSection: "Features"
    });
  };

  selectPricing = () => {
    document.title = "DT - تعرفه ها";
    this.setState({
      selectedTab: "Home",
      selectedSection: "Pricing"
    });
  };

  selectAbout = () => {
    document.title = "DT - درباره ما";
    this.setState({
      selectedTab: "Home",
      selectedSection: "About"
    });
  };

  selectBlog = () => {
    smoothScrollTop();
    document.title = "DT - وبلاگ";
    this.setState({
      selectedTab: "Blog",
      selectedSection: "Home"
    });
  };

  openLoginDialog = () => {
    this.setState({
      dialogOpen: "login",
      isMobileDrawerOpen: false
    });
  };

  closeDialog = () => {
    this.setState({
      dialogOpen: null
    });
  };

  openRegisterDialog = () => {
    this.setState({
      dialogOpen: "register",
      isMobileDrawerOpen: false
    });
  };

  openTermsDialog = () => {
    this.setState({
      dialogOpen: "termsOfService"
    });
  };

  handleMobileDrawerOpen = () => {
    this.setState({
      isMobileDrawerOpen: true
    });
  };

  handleMobileDrawerClose = () => {
    this.setState({
      isMobileDrawerOpen: false
    });
  };

  openChangePasswordDialog = () => {
    this.setState({
      dialogOpen: "changePassword"
    });
  };

  fetchBlogPosts = () => {
    const blogPosts = dummyBlogPosts.map(blogPost => {
      let title = blogPost.title;
      title = title.toLowerCase();
      title = title.replace(/[^A-Za-z0-9 ]/g, "");
      title = title.replace(/\s{2,}/g, " ");
      title = title.replace(/\s/g, "-");
      blogPost.url = `/blog/post/${title}`;
      blogPost.params = `?id=${blogPost.id}`;
      return blogPost;
    });
    this.setState({
      blogPosts: blogPosts
    });
  };

  handleCookieRulesDialogOpen = () => {
    this.setState({
      isCookieRulesDialogOpen: true
    });
  };

  handleCookieRulesDialogClose = () => {
    this.setState({
      isCookieRulesDialogOpen: false
    });
  };

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.wrapper}>
        <DialogSelector
          openLoginDialog={this.openLoginDialog}
          dialogOpen={this.state.dialogOpen}
          onClose={this.closeDialog}
          openTermsDialog={this.openTermsDialog}
          openRegisterDialog={this.openRegisterDialog}
          openChangePasswordDialog={this.openChangePasswordDialog}
        />
        <NavBar
          selectedTab={this.state.selectedTab}
          selectTab={this.selectTab}
          selectFeatures={this.selectFeatures}
          selectPricing={this.selectPricing}
          selectAbout={this.selectAbout}
          selectHomeSection={this.selectHome}
          openLoginDialog={this.openLoginDialog}
          openRegisterDialog={this.openRegisterDialog}
          mobileDrawerOpen={this.state.isMobileDrawerOpen}
          handleMobileDrawerOpen={this.handleMobileDrawerOpen}
          handleMobileDrawerClose={this.handleMobileDrawerClose}
        />
        <Routing
          selectedSection={this.state.selectedSection}
          blogPosts={this.state.blogPosts}
          selectHome={this.selectHome}
          selectBlog={this.selectBlog}
          openRegisterDialog={this.openRegisterDialog}
        />
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(memo(HomePage));
