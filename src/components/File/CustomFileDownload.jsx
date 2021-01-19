import { Component } from "react";
import React from "react";
import * as PropTypes from "prop-types";
import Api from "../Api/Api";
import * as URLConstant from "../../URLConstant";
import { FileIcon, defaultStyles } from "react-file-icon";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CloudDownloadRoundedIcon from "@material-ui/icons/CloudDownloadRounded";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";

export default class CustomFileDownload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.getTypeFromName(),
      name: this.props.name
    };
    this.api = new Api();
  }

  getTypeFromName = () => {
    let separated = this.props.name.split(".");
    return separated[separated.length - 1];
  };

  download = event => {
    event.preventDefault();
    this.api.getFile(
      process.env.REACT_APP_HOST_URL +
        process.env.REACT_APP_MAIN_PATH +
        URLConstant.GET_DOCUMENT,
      this.props.id,
      this.state.name
    );
  };

  render() {
    const styles = {
      fileName: {
        color: "#000000",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "MyFont",
        marginBottom: "3px",
        textDecoration: "none",
        textAlign: "center"
      },
      divider: {
        margin: `4px 0px`
      }
    };
    return (
      <Card>
        <CardContent>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Typography style={styles.fileName}>{this.state.name}</Typography>
          </div>
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex"
            }}
          >
            <div
              style={{
                width: "70%"
              }}
            >
              <FileIcon
                extension={this.state.type.toUpperCase()}
                {...defaultStyles[this.state.type]}
              />
            </div>
          </div>
          <Divider style={styles.divider} light />
          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <IconButton
              color="primary"
              aria-label="download file"
              component="span"
              onClick={event => this.download(event)}
              size="medium"
            >
              <CloudDownloadRoundedIcon />
            </IconButton>
          </div>
        </CardContent>
      </Card>
    );
  }
}
CustomFileDownload.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
