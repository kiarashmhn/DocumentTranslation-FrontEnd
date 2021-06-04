import React, { Component } from "react";
import * as PropTypes from "prop-types";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import theme from "../../theme";
import { MuiThemeProvider } from "@material-ui/core";
import FormDialog from "../Template/FormDialog";
import NodeGenerator from "../NodeGenerator/NodeGenerator";

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      filteredData: {}
    };
    this.nodeGenRef = React.createRef();
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  getCorrect = s => {
    let r = {};
    Object.keys(s).forEach(function(key) {
      if (s[key] && s[key] !== "") {
        r[key] = s[key];
      }
    });
    return r;
  };

  submit = () => {
    let nodeGenState = this.nodeGenRef.current.getState();
    this.setState(
      {
        ...nodeGenState
      },
      () => {
        this.props.refreshFunction(this.getCorrect(nodeGenState));
      }
    );
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Button
          style={{
            textTransform: "none",
            align: "center"
          }}
          onClick={() => this.handleClickOpen()}
        >
          Rechercher / جستجو
          <SearchIcon />
        </Button>
        <FormDialog
          loading={false}
          onClose={() => this.handleClose()}
          open={this.state.open}
          hideBackdrop
          onFormSubmit={e => {
            e.preventDefault();
            this.submit();
          }}
          content={
            <div style={{ width: "100%" }}>
              <NodeGenerator
                ref={this.nodeGenRef}
                elements={this.props.staticData}
                externalInitializationData={this.props.initial}
              />
            </div>
          }
          actions={
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              color="secondary"
              style={{ textTransform: "none", align: "center" }}
            >
              Rechercher / جستجو
            </Button>
          }
        />
      </MuiThemeProvider>
    );
  }
}

Filter.propTypes = {
  staticData: PropTypes.array.isRequired,
  refreshFunction: PropTypes.func.isRequired,
  initial: PropTypes.any
};
