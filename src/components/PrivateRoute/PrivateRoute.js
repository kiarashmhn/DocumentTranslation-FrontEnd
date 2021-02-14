import { Redirect, Route } from "react-router";
import React from "react";
import AuthService from "../../AuthService";
import * as PropTypes from "prop-types";
import * as URLConstant from "../../URLConstant";

const Auth = new AuthService();

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  if (path === URLConstant.ADMIN_PANEL && !Auth.isAdmin()) {
    return (
      <Redirect
        to={{
          pathname: "/"
        }}
      />
    );
  }
  if (!Auth.loggedIn()) {
    return (
      <Redirect
        to={{
          pathname: "/"
        }}
      />
    );
  }
  return <Route {...rest} render={props => <Component {...props} />} />;
};
PrivateRoute.propTypes = {
  location: PropTypes.any,
  component: PropTypes.any,
  path: PropTypes.string.isRequired
};

export default PrivateRoute;
