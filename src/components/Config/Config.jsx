import React, { Component } from "react";
import * as URLConstant from "../../URLConstant";
import SnackbarWrapper from "../Snackbar/SnackbarWrapper";
import { Button, Grid, Typography } from "@material-ui/core";
import NodeGenerator from "../NodeGenerator/NodeGenerator";
import Api from "../Api/Api";
import ButtonCircularProgress from "../Template/ButtonCircularProgress";
import theme from "../../theme";
import Card from "@material-ui/core/Card";

class Config extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: null,
      isLoading: false
    };
    this.api = new Api();
    this.nodeGenRef = React.createRef();
  }

  getConfig = async () => {
    let self = this;
    await this.api
      .doPostNoAppend(
        process.env.REACT_APP_HOST_URL +
          process.env.REACT_APP_MAIN_PATH +
          URLConstant.GET_CONFIG,
        {}
      )
      .then(function(res) {
        self.setState({
          config: res.data
        });
      });
  };

  postConfig = async () => {
    let self = this;
    let postData = this.nodeGenRef.getState();

    let ribName = null;
    let ribId = null;

    if (postData.file && postData.file.length > 0) {
      let file = postData.file[0];
      let params = {
        type: "additional",
        name: file.name,
        useCase: "rib",
        size: file.size
      };
      await this.api
        .doPostMultiPartFileAndHeader(
          process.env.REACT_APP_HOST_URL +
            process.env.REACT_APP_MAIN_PATH +
            URLConstant.CREATE_CONFIG_DOCUMENT,
          file,
          params
        )
        .then(function(res) {
          if (!res.success) self.props.showSnackbar(res.message, "error");
          ribName = res.data.name;
          ribId = res.data.id;
        });
    }
    postData = { ...postData, ...{ ribName: ribName, ribId: ribId } };
    await this.api
      .doPostNoAppend(
        process.env.REACT_APP_HOST_URL +
          process.env.REACT_APP_MAIN_PATH +
          URLConstant.CREATE_CONFIG,
        postData
      )
      .then(function(res) {
        self.props.showSnackbar(res.message, res.success ? "success" : "error");
        self.setState({
          config: {
            ...self.state.config,
            ...{ ribName: ribName, ribId: ribId }
          }
        });
      });
  };

  componentDidMount() {
    this.setState(
      {
        isLoading: true
      },
      () => {
        this.getConfig().then(() => {
          this.setState({
            isLoading: false
          });
        });
      }
    );
  }

  submit = e => {
    e.preventDefault();
    this.setState(
      {
        isLoading: true
      },
      () => {
        this.postConfig().then(() => {
          this.setState({
            isLoading: false
          });
        });
      }
    );
  };

  setRef = e => {
    if (e !== null) this.nodeGenRef = e;
    return this.nodeGenRef;
  };

  renderSubmit = () => {
    return (
      <div
        style={{
          verticalAlign: "middle",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
          paddingBottom: "20px",
          marginTop: "5px"
        }}
      >
        <Button
          type={"submit"}
          disabled={this.state.isLoading}
          style={{ textTransform: "none", marginTop: theme.spacing(1) }}
          variant="contained"
          color="secondary"
        >
          <p>
            <span
              style={{
                display: "block",
                marginBottom: "2px",
                fontSize: "100%"
              }}
            />
            <Typography variant="body1" align="center" component={"span"}>
              Confirmer
            </Typography>
            <span
              style={{
                display: "block",
                marginBottom: "0",
                fontSize: 16
              }}
            />
            <Typography variant="body2" align="center" component={"span"}>
              تایید
            </Typography>
          </p>
          {this.state.isLoading && <ButtonCircularProgress />}
        </Button>
      </div>
    );
  };

  getElements = () => {
    return [
      {
        key: "bankInfo",
        type: "string"
      },
      {
        key: "accName",
        type: "text"
      },
      {
        key: "accLastName",
        type: "text"
      },
      {
        key: "accNumber",
        type: "text"
      },
      {
        key: "address",
        type: "text",
        grid: 12
      },
      {
        key: "ribImage",
        type: "string"
      },
      { key: "empty", type: "empty" },
      ...(this.state.config && this.state.config.ribName
        ? [
            {
              type: "fileDownload",
              name: this.state.config.ribName,
              id: this.state.config.ribId,
              key: "fileDownload",
              grid: 4
            }
          ]
        : []),
      {
        key: "file",
        type: "file"
      },
      {
        key: "FAQ",
        type: "string"
      },
      {
        key: "questions",
        type: "questions"
      }
    ];
  };

  render() {
    return (
      <Card>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div style={{ width: "80%" }}>
            {this.state.config && (
              <form onSubmit={this.submit}>
                <Grid container spacing={2}>
                  <NodeGenerator
                    ref={this.setRef}
                    elements={this.getElements()}
                    externalInitializationData={this.state.config}
                  />
                </Grid>
                {this.renderSubmit()}
              </form>
            )}
          </div>
        </div>
      </Card>
    );
  }
}

export default SnackbarWrapper(Config);
