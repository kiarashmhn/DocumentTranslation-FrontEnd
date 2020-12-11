import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import PropTypes from "prop-types";
import theme from "../../theme";

const styles = {
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: "none"
  }
};

export default class CustomFileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spanTitle: "فایلی انتخاب نشده است"
    };
  }

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
          accept="image/*"
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
            <PhotoCamera />
          </IconButton>
        </label>
        <span id="file-chosen">{this.state.spanTitle}</span>
      </div>
    );
  }
}
CustomFileUpload.propTypes = {
  onChange: PropTypes.func.isRequired
};