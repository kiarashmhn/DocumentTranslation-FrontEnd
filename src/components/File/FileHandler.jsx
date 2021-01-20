import React, { Component, Fragment } from "react";
import CustomFileUpload from "../CustomFileUpload/CustomFileUpload";
import * as PropTypes from "prop-types";
import CustomFileDownload from "./CustomFileDownload";
import * as URLConstant from "../../URLConstant";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Api from "../Api/Api";
import { getCompleteName } from "../../Dictionary";
import theme from "../../theme";

const textStyle = {
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main
};

const subTextStyle = {
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3)
};

export default class FileHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      oldFiles: []
    };
    this.api = new Api();
    this.uploadFileRef = React.createRef();
  }

  getState = () => {
    return this.state.files;
  };

  reset = () => {
    this.getDocuments().then(() => {});
    this.setState(
      {
        files: []
      },
      () => {
        this.uploadFileRef.current.reset();
      }
    );
  };

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

  getFiles = () => {
    if (this.state.oldFiles && this.state.oldFiles.length > 0)
      return (
        <Fragment>
          <Grid container spacing={2} justify="center">
            {this.state.oldFiles.map((file, index) => {
              return (
                <Grid
                  item
                  xs={4}
                  sm={4}
                  md={2}
                  align="center"
                  key={file.name + index}
                >
                  <CustomFileDownload id={file.id} name={file.name} />
                </Grid>
              );
            })}
          </Grid>
        </Fragment>
      );
    else
      return (
        <div style={subTextStyle}>
          <span id="files-empty">{getCompleteName("empty")}</span>
        </div>
      );
  };

  render() {
    return (
      <Fragment>
        <div style={textStyle}>
          <Typography variant={"body1"}>
            {getCompleteName("uploadFiles")}
          </Typography>
        </div>
        <CustomFileUpload
          ref={this.uploadFileRef}
          onChange={event => this.fileOnChange(event)}
        />
        <div style={textStyle}>
          <Typography variant={"body1"}>
            {getCompleteName("uploadedFiles")}
          </Typography>
        </div>
        {this.getFiles()}
      </Fragment>
    );
  }
}
FileHandler.propTypes = {
  orderId: PropTypes.any,
  type: PropTypes.string.isRequired
};
