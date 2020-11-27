import React, { Component, Fragment } from "react";
import FormDialog from "../../../shared/components/FormDialog";
import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip";
import theme from "../../../theme";

import { TextField, Button, Grid } from "@material-ui/core";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  customWidth: {
    maxWidth: 500
  },
  noMaxWidth: {
    maxWidth: "none"
  }
});

class IdentityCertificate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      isLoading: false,
      name: "",
      lastName: "",
      type: "",
      address: "",
      country: "",
      birthDate: ""
    };
  }

  getState = () => {
    return this.state;
  };

  render() {
    const classes = styles(theme);
    return (
      <Fragment>
        <FormDialog
          open={this.state.open}
          onClose={() => {
            this.setState({
              open: false
            });
          }}
          loading={this.state.isLoading}
          onFormSubmit={e => {
            e.preventDefault();
            this.props.onSubmit();
          }}
          hideBackdrop
          headline="ثبت سفارش - شناسنامه"
          content={
            <Fragment>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={6} key={"name"}>
                  <Tooltip title={"نام"} className={classes.customWidth}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      className={"typography"}
                      label="نام"
                      value={this.state.name}
                      autoFocus
                      autoComplete="off"
                      type="text"
                      onChange={e => this.setState({ name: e.target.value })}
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12} sm={12} md={6} key={"lastName"}>
                  <Tooltip
                    title={"نام خانوادگی"}
                    className={classes.customWidth}
                  >
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      className={"typography"}
                      label="نام خانوادگی"
                      value={this.state.lastName}
                      autoFocus
                      autoComplete="off"
                      type="text"
                      onChange={e =>
                        this.setState({ lastName: e.target.value })
                      }
                    />
                  </Tooltip>
                </Grid>
              </Grid>
            </Fragment>
          }
          actions={
            <Fragment>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                disabled={this.state.isLoading}
                size="large"
              >
                ثبت سفارش
                {this.state.isLoading && <ButtonCircularProgress />}
              </Button>
            </Fragment>
          }
        />
      </Fragment>
    );
  }
}
export default IdentityCertificate;
IdentityCertificate.propTypes = {
  classes: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};
