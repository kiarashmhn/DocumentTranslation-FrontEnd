import React, { memo } from "react";
import PropTypes from "prop-types";
import { Button, createMuiTheme, MuiThemeProvider } from "@material-ui/core";

function ColoredButton(props) {
  const { color, children, theme } = props;
  const buttonTheme = createMuiTheme({
    ...theme,
    palette: {
      primary: {
        main: color
      }
    }
  });
  const buttonProps = (({ ...o }) => o)(props);
  return (
    <MuiThemeProvider theme={buttonTheme}>
      <Button {...buttonProps} color="primary">
        {children}
      </Button>
    </MuiThemeProvider>
  );
}

ColoredButton.propTypes = {
  color: PropTypes.string.isRequired,
  theme: PropTypes.any,
  children: PropTypes.any
};

export default memo(ColoredButton);
