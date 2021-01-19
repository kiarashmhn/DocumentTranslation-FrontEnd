import React, { Component, Fragment } from "react";
import CustomFileUpload from "../CustomFileUpload/CustomFileUpload";
import * as PropTypes from "prop-types";
import CustomFileDownload from "./CustomFileDownload";
import * as URLConstant from "../../URLConstant";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Api from "../Api/Api";
import { getCompleteName } from "../../Dictionary";

export default class FileHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      oldFiles: []
    };
    this.api = new Api();
  }

  componentDidMount() {
    this.getDocuments();
  }

  getDocuments = async () => {
    if (this.props.orderId) {
      let self = this;
      let postData = {
        orderId: this.props.orderId,
        type: this.props.type
      };
      await this.api
        .doPostNoAppend(
          process.env.REACT_APP_HOST_URL +
            process.env.REACT_APP_MAIN_PATH +
            URLConstant.GET_DOCUMENTS,
          postData
        )
        .then(function(res) {
          if (!res.success) self.props.showSnackbar(res.message, "error");
          else {
            self.setState({
              oldFiles: res.data
            });
          }
        });
    }
  };

  fileOnChange = event => {
    this.setState({ files: event.target.files });
  };

  render() {
    return (
      <Fragment>
        <CustomFileUpload onChange={event => this.fileOnChange(event)} />
        {this.state.oldFiles && this.state.oldFiles.length && (
          <Fragment>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                marginTop: "5px",
                marginBottom: "5px"
              }}
            >
              <Typography variant={"body1"}>
                {getCompleteName("uploadedFiles")}
              </Typography>
            </div>
            <Grid container spacing={2}>
              {this.state.oldFiles.map((file, index) => {
                return (
                  <Grid item xs={4} sm={4} md={2} key={file.name + index}>
                    <CustomFileDownload id={file.id} name={file.name} />
                  </Grid>
                );
              })}
            </Grid>
          </Fragment>
        )}
      </Fragment>
    );
  }
}
FileHandler.propTypes = {
  orderId: PropTypes.string,
  type: PropTypes.string.isRequired
};
