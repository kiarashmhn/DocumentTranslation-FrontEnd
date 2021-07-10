import React, { Component } from "react";
import { Box, Typography } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import * as URLConstant from "../../URLConstant";
import Api from "../Api/Api";

export default class FAQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: -1,
      questions: []
    };
    this.api = new Api();
  }

  componentDidMount() {
    this.getConfig().then(() => {});
  }

  getConfig = async () => {
    let self = this;
    await this.api
      .doPostNoAppend(
        process.env.REACT_APP_HOST_URL +
          process.env.REACT_APP_MAIN_PATH +
          URLConstant.GET_CONFIG,
        {}
      )
      .then(function(res) {
        self.setState({
          questions: res.data.questions.questions
        });
      });
  };

  render() {
    return (
      <div>
        <Typography
          variant="h5"
          dir={"rtl"}
          align={"center"}
          style={{ marginBottom: "30px", marginTop: "30px" }}
        >
          <Box
            style={{
              fontWeight: "bold"
            }}
          >
            Foire aux questions (FAQ)
          </Box>
          <Box
            style={{
              fontWeight: "bold"
            }}
          >
            سوالات متداول
          </Box>
        </Typography>
        {this.state.questions.length > 0 &&
          this.state.questions.map((q, idx) => (
            <div key={idx + "faq"}>
              <Box
                borderColor="primary.main"
                border={2}
                style={{
                  borderRadius: 5,
                  marginRight: "15px",
                  marginLeft: "15px",
                  marginBottom: "15px"
                }}
              >
                <Card>
                  <CardActionArea
                    onClick={() => {
                      this.setState({ num: idx });
                    }}
                  >
                    <CardContent>
                      <Typography align={"center"} component={"div"}>
                        <div dir={"ltr"}>{q.french}</div>
                        <div>{q.persian}</div>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
              {this.state.num === idx && (
                <Box
                  borderColor="secondary.main"
                  bgcolor="background.paper"
                  border={2}
                  style={{
                    padding: "10px",
                    marginBottom: "15px",
                    marginTop: "15px",
                    borderRadius: 5
                  }}
                  m={3}
                >
                  <div>{q.fAns}</div>
                  <div dir={"rtl"}>{q.pAns}</div>
                </Box>
              )}
            </div>
          ))}
      </div>
    );
  }
}
