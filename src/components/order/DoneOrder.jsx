import React, { Component } from "react";
import * as URLConstant from "../../URLConstant";
import PropTypes from "prop-types";
import Api from "../Api/Api";
import CustomFileUpload from "../CustomFileUpload/CustomFileUpload";
import { Button, Typography } from "@material-ui/core";
import ButtonCircularProgress from "../Template/ButtonCircularProgress";
import FormDialog from "../Template/FormDialog";

export default class DoneOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      docId: null,
      file: null,
      loading: false
    };
    this.api = new Api();
    this.uploadFileRef = React.createRef();
  }

  fileOnChange = event => {
    this.setState({ file: event.target.files[0] });
  };

  fileOnEmpty = () => {
    this.setState({ file: null });
  };

  sendFile = async () => {
    let self = this;
    let params = {
      type: "result",
      name: this.state.file.name,
      orderId: this.props.orderId,
      size: this.state.file.size
    };
    await this.api
      .doPostMultiPartFileAndHeader(
        process.env.REACT_APP_HOST_URL +
          process.env.REACT_APP_MAIN_PATH +
          URLConstant.CREATE_DOCUMENT,
        this.state.file,
        params
      )
      .then(function(res) {
        if (res.success) self.setState({ docId: res.data.id });
      });
  };

  doneOrder = () => {
    this.setState({ loading: true }, () => {
      this.sendFile().then(async () => {
        let postData = {
          orderId: this.props.orderId,
          finalDocumentId: this.state.docId
        };
        let self = this;
        await this.api
          .doPostNoAppend(
            process.env.REACT_APP_HOST_URL +
              process.env.REACT_APP_MAIN_PATH +
              URLConstant.DONE_ORDER,
            postData
          )
          .then(function(res) {
            if (res.success)
              self.setState({ loading: false }, () => {
                self.uploadFileRef.current.reset();
                self.props.onClose();
              });
          });
      });
    });
  };

  render() {
    return (
      <FormDialog
        loading={this.state.loading}
        onClose={this.props.onClose}
        open
        onFormSubmit={e => {
          e.preventDefault();
          this.doneOrder();
        }}
        hideBackdrop
        content={
          <div style={{ width: "100%" }}>
            <div style={{ width: "100%" }} />
            <CustomFileUpload
              ref={this.uploadFileRef}
              single={true}
              onChange={this.fileOnChange}
              onEmpty={this.fileOnEmpty}
            />
          </div>
        }
        actions={
          <div>
            <div
              style={{
                maxWidth: "100%",
                verticalAlign: "middle",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "5px"
              }}
            >
              <Button
                type={"submit"}
                style={{ textTransform: "none" }}
                variant="contained"
                color="secondary"
                align={"center"}
                disabled={!this.state.file || this.state.isLoading}
              >
                <p>
                  <span
                    style={{
                      display: "block",
                      marginBottom: "0",
                      fontSize: 16
                    }}
                  />
                  <Typography variant="body1" align="center" component={"span"}>
                    {"Enregistrer"}
                  </Typography>
                  <span
                    style={{
                      display: "block",
                      marginBottom: "2px",
                      fontSize: "100%"
                    }}
                  />
                  <Typography variant="body1" align="center" component={"span"}>
                    {"ثبت"}
                  </Typography>
                </p>
                {this.state.loading && <ButtonCircularProgress />}
              </Button>
            </div>
          </div>
        }
      />
    );
  }
}

DoneOrder.propTypes = {
  orderId: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired
};
