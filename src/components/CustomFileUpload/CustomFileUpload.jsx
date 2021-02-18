import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import PropTypes from "prop-types";
import theme from "../../theme";

const styles = {
  root: {
    "& > *": {
      margin: theme.spacing(3)
    },
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
      spanTitle: this.props.title
        ? this.props.title
        : "فایلی انتخاب نشده است / Aucun fichier sélectionné"
    };
  }

  reset = () => {
    this.setState({
      spanTitle: this.props.title
        ? this.props.title
        : "فایلی انتخاب نشده است / Aucun fichier sélectionné"
    });
  };

  getTitle = e => {
    let title = "";
    for (let i = 0; i < e.target.files.length - 1; i++)
      title += e.target.files[i].name + ", ";
    title += e.target.files[e.target.files.length - 1].name;
    return title;
  };

  handleChange = e => {
    if (e.target.files[0]) {
      this.setState({
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
          multiple
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
      </div>
    );
  }
}
CustomFileUpload.propTypes = {
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string
};
