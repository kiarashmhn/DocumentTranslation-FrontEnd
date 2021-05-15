import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CustomFileDownload from "../File/CustomFileDownload";

export default class Message extends Component {
  constructor(props) {
    super(props);
  }

  getFromFormat = function(date, format) {
    let yyyy = date.getFullYear().toString();
    yyyy = yyyy.slice(2, 4);
    format = format.replace(/yyyy/g, yyyy);
    let mm = (date.getMonth() + 1).toString();
    format = format.replace(/mm/g, mm[1] ? mm : "0" + mm[0]);
    let dd = date.getDate().toString();
    format = format.replace(/dd/g, dd[1] ? dd : "0" + dd[0]);
    let hh = date.getHours().toString();
    format = format.replace(/hh/g, hh[1] ? hh : "0" + hh[0]);
    let ii = date.getMinutes().toString();
    format = format.replace(/ii/g, ii[1] ? ii : "0" + ii[0]);
    let ss = date.getSeconds().toString();
    format = format.replace(/ss/g, ss[1] ? ss : "0" + ss[0]);
    return format;
  };

  getUserName = () => {
    if (this.props.type === "ADMIN")
      return this.props.position === "right" ? "Vous" : "User";
    return this.props.position === "right" ? "Vous" : "Admin";
  };

  render() {
    let position =
      this.props.position === "right" ? { float: "right" } : { float: "left" };
    let cardStyle = {
      ...position,
      ...{
        position: "relative",
        backgroundColor: this.props.color,
        border: "1px solid rgba(0, 0, 0, 0.05)",
        borderRadius: 5,
        padding: "3px",
        width: "fit-content"
      }
    };
    return (
      <Grid item md={12} xs={12} sm={12}>
        <div style={cardStyle}>
          {this.props.info.text && (
            <div style={{ padding: "5px" }}>
              <Typography
                paragraph
                variant="body1"
                style={{ wordWrap: "break-word" }}
              >
                {this.props.info.text}
              </Typography>
            </div>
          )}
          {this.props.info.hasFile && this.props.file && (
            <div style={{ width: "150px" }}>
              <CustomFileDownload
                id={this.props.file.id}
                name={this.props.file.name}
              />
              <br />
            </div>
          )}
          <Typography variant="subtitle2" component={"subtitle2"}>
            <div style={{ padding: 0 }}>
              {this.getFromFormat(
                new Date(this.props.info.creationTime),
                "yyyy/mm/dd hh:ii"
              )}
            </div>
            <div style={{ padding: 0 }}>{this.getUserName()}</div>
          </Typography>
        </div>
      </Grid>
    );
  }
}

Message.propTypes = {
  info: PropTypes.any.isRequired,
  file: PropTypes.any,
  color: PropTypes.any.isRequired,
  type: PropTypes.any.isRequired,
  position: PropTypes.any.isRequired
};
