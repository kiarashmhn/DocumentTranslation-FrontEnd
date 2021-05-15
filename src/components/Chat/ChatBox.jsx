import React, { Component } from "react";
import PropTypes from "prop-types";
import CustomDialogs from "../CustomDialogs";
import Message from "./Message";
import * as URLConstant from "../../URLConstant";
import Api from "../Api/Api";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Button, Typography } from "@material-ui/core";
import { getFrenchName, getPersianName } from "../../Dictionary";
import ButtonCircularProgress from "../Template/ButtonCircularProgress";
import CustomFileUpload from "../../../src/components/CustomFileUpload/CustomFileUpload";
import Divider from "@material-ui/core/Divider";

export default class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      files: [],
      messages: [],
      text: "",
      file: null,
      id: ""
    };
    this.api = new Api();
    this.uploadFileRef = React.createRef();
    this.lastRef = React.createRef();
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState({ isLoading: true }, async () => {
      this.getDocuments().then(
        await this.getMessages().then(() => {
          this.setState({ isLoading: false }, () => {
            this.lastRef.current.scrollIntoView();
          });
        })
      );
    });
  };

  getMessageFile = id => {
    for (let file of this.state.files) if (file.messageId === id) return file;
    return null;
  };

  generateMessages = () => {
    return this.state.messages.map(m =>
      m.hasFile ? (
        <Message
          key={"message" + m.id}
          info={m}
          color={m.sender === this.props.type ? "lightseagreen" : "#709fdc"}
          position={m.sender === this.props.type ? "right" : "left"}
          file={this.getMessageFile(m.id)}
          type={this.props.type}
        />
      ) : (
        <Message
          key={"message" + m.id}
          info={m}
          color={m.sender === this.props.type ? "lightseagreen" : "#709fdc"}
          position={m.sender === this.props.type ? "right" : "left"}
          type={this.props.type}
        />
      )
    );
  };

  getMessages = async () => {
    let self = this;
    await this.api
      .doPostNoAppend(
        process.env.REACT_APP_HOST_URL +
          process.env.REACT_APP_MAIN_PATH +
          URLConstant.GET_MESSAGES,
        {
          orderId: this.props.orderId,
          sender: this.props.type
        }
      )
      .then(function(res) {
        if (res.success) {
          self.setState({
            messages: res.data
          });
        }
      });
  };

  getDocuments = async () => {
    if (this.props.orderId) {
      let self = this;
      let postData = {
        orderId: this.props.orderId,
        type: "message"
      };
      await this.api
        .doPostNoAppend(
          process.env.REACT_APP_HOST_URL +
            process.env.REACT_APP_MAIN_PATH +
            URLConstant.GET_DOCUMENTS,
          postData
        )
        .then(function(res) {
          if (res.success) {
            self.setState({
              files: res.data
            });
          }
        });
    }
  };

  sendMessage = async () => {
    let self = this;
    let postData = {
      orderId: this.props.orderId,
      text: this.state.text,
      hasFile: !!this.state.file,
      sender: this.props.type
    };
    await this.api
      .doPostNoAppend(
        process.env.REACT_APP_HOST_URL +
          process.env.REACT_APP_MAIN_PATH +
          URLConstant.CREATE_MESSAGE,
        postData
      )
      .then(function(res) {
        if (res.success) {
          self.setState(
            {
              id: res.data.id
            },
            async () => {
              if (self.state.file) await self.sendFile();
              else self.getData();
            }
          );
        }
      });
  };

  sendFile = async () => {
    let self = this;
    let params = {
      type: "message",
      name: this.state.file.name,
      orderId: this.props.orderId,
      messageId: this.state.id,
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
        if (!res.success) self.props.showSnackbar(res.message, "error");
        self.getData();
      });
  };

  fileOnChange = event => {
    this.setState({ file: event.target.files[0] });
  };

  fileOnEmpty = () => {
    this.setState({ file: null });
  };

  send = () => {
    this.setState({ isLoading: true }, () => {
      this.sendMessage().then(() => {
        this.setState({ text: "", file: null, id: "" }, () => {
          this.uploadFileRef.current.reset();
        });
      });
    });
  };

  render() {
    return (
      <CustomDialogs
        loading={this.state.isLoading}
        onClose={this.props.onClose}
        open
        onFormSubmit={e => {
          e.preventDefault();
        }}
        hideBackdrop
        hasCloseIcon
        content={
          <div style={{ width: "100%" }}>
            <div style={{ width: "100%" }} />
            <Grid container spacing={1}>
              {this.generateMessages()}
            </Grid>
            <div ref={this.lastRef} />
          </div>
        }
        actions={
          <div>
            <Divider
              style={{
                margin: `4px 0px`
              }}
            />
            <CustomFileUpload
              ref={this.uploadFileRef}
              single={true}
              onChange={this.fileOnChange}
              onEmpty={this.fileOnEmpty}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              label={"Message"}
              value={this.state.text}
              onChange={e => {
                this.setState({ text: e.target.value });
              }}
            />
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
                onClick={this.send}
                style={{ textTransform: "none" }}
                variant="contained"
                color="secondary"
                align={"center"}
                disabled={
                  (!this.state.text.length && !this.state.file) ||
                  this.state.isLoading
                }
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
                    {getFrenchName("send")}
                  </Typography>
                  <span
                    style={{
                      display: "block",
                      marginBottom: "2px",
                      fontSize: "100%"
                    }}
                  />
                  <Typography variant="body1" align="center" component={"span"}>
                    {getPersianName("send")}
                  </Typography>
                </p>
                {this.state.isLoading && <ButtonCircularProgress />}
              </Button>
            </div>
          </div>
        }
      />
    );
  }
}

ChatBox.propTypes = {
  orderId: PropTypes.any.isRequired,
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};
