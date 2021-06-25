import React, { Component, Fragment } from "react";
import CustomFileUpload from "../CustomFileUpload/CustomFileUpload";
import * as PropTypes from "prop-types";
import CustomFileDownload from "./CustomFileDownload";
import * as URLConstant from "../../URLConstant";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Api from "../Api/Api";
import {
  getCompleteName,
  getFrenchName,
  getHint,
  getPersianName
} from "../../Dictionary";
import theme from "../../theme";
import CustomTooltip from "../Tooltip/CustomTooltip";

const textStyle = {
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  position: "relative",
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(1),
  color: theme.palette.primary.main
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
                  xs={8}
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
  };

  render() {
    return (
      <Fragment>
        <div style={textStyle}>
          <Typography variant={"body1"}>
            {getCompleteName("uploadFiles")}
          </Typography>
          <CustomTooltip icon={"error"}>
            <div dir={"ltr"}>
              {this.props.tooltipKey
                ? getHint(this.props.tooltipKey).french
                : getFrenchName("fileTooltip")}
            </div>
            <div dir={"rtl"}>
              {this.props.tooltipKey
                ? getHint(this.props.tooltipKey).persian
                : getPersianName("fileTooltip")}
            </div>
          </CustomTooltip>
        </div>
        <CustomFileUpload
          ref={this.uploadFileRef}
          onChange={event => this.fileOnChange(event)}
          required={this.props.required}
        />
        {this.state.oldFiles && this.state.oldFiles.length > 0 && (
          <div style={textStyle}>
            <Typography variant={"body1"}>
              {getCompleteName("uploadedFiles")}
            </Typography>
          </div>
        )}
        {this.getFiles()}
      </Fragment>
    );
  }
}
FileHandler.propTypes = {
  orderId: PropTypes.any,
  type: PropTypes.string.isRequired,
  tooltipKey: PropTypes.any,
  required: PropTypes.bool
};
