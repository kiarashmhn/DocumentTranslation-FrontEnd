import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import DeleteIcon from "@material-ui/icons/Clear";
import PropTypes from "prop-types";

const styles = {
  root: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center"
  },
  input: {
    display: "none"
  }
};

export default class CustomFileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empty: true,
      spanTitle: this.props.title
        ? this.props.title
        : "افزودن فایل/Attacher un fichier"
    };
  }

  reset = () => {
    this.setState({
      empty: true,
      spanTitle: this.props.title
        ? this.props.title
        : "افزودن فایل/Attacher un fichier"
    });
  };

  emptyFiles = () => {
    this.reset();
    this.props.onEmpty();
  };

  getTitle = e => {
    let title = "";
    for (let i = 0; i < e.target.files.length - 1; i++)
      title += e.target.files[i].name + ", ";
    title += e.target.files[e.target.files.length - 1].name;
    return title.length < 15 ? title : title.slice(0, 12) + "...";
  };

  handleChange = e => {
    if (e.target.files[0]) {
      this.setState({
        empty: false,
        spanTitle: this.getTitle(e)
      });
      this.props.onChange(e);
    }
  };

  render() {
    return (
      <div style={styles.root}>
        <input
          style={styles.input}
          id="contained-button-file"
          multiple={this.props.single ? !this.props.single : true}
          type="file"
          onChange={this.handleChange}
        />
        <label htmlFor="contained-button-file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <AttachFileIcon />
          </IconButton>
        </label>
        <span id="file-chosen">{this.state.spanTitle}</span>
        {!this.state.empty && this.props.onEmpty && (
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={this.emptyFiles}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </div>
    );
  }
}
CustomFileUpload.propTypes = {
  onChange: PropTypes.func.isRequired,
  onEmpty: PropTypes.func,
  single: PropTypes.any,
  title: PropTypes.string,
  required: PropTypes.bool
};
