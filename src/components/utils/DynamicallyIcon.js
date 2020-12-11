import React from "react";
import * as PropTypes from "prop-types";

export default function DynamicallyIcon(props) {
  let resolvedIcon = require(`@material-ui/icons/${props.icon}`).default;
  return React.createElement(resolvedIcon, {
    style: props.styles ? props.styles : {},
    className: props.className
  });
}

DynamicallyIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  styles: PropTypes.any,
  className: PropTypes.string
};
