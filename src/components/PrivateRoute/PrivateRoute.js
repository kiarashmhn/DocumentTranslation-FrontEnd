import { Redirect, Route } from "react-router";
import React from "react";
import AuthService from "../../AuthService";
import * as PropTypes from "prop-types";
import * as URLConstant from "../../URLConstant";

const Auth = new AuthService();

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        path === URLConstant.ADMIN_PANEL ? (
          Auth.isAdmin() === true ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
        ) : Auth.loggedIn() === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};
PrivateRoute.propTypes = {
  location: PropTypes.any,
  component: PropTypes.any,
  path: PropTypes.string.isRequired
};

export default PrivateRoute;
