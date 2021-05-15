import React, { Component, Fragment } from "react";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { getFrenchName, getPersianName } from "../Dictionary";
import { getDataNotes, getLegalNotes } from "./LegalNotesData";
import Checkbox from "@material-ui/core/Checkbox";

export default class LegalNotes extends Component {
  constructor(props) {
    super(props);
    this.privacyRef = React.createRef();
    this.state = {
      french: true
    };
  }

  close = () => {
    let win = window.open("about:blank", "_self");
    win.close();
  };

  setFrench = e => {
    this.setState({ french: e.target.checked });
  };
  setPersian = e => {
    this.setState({ french: !e.target.checked });
  };

  render() {
    return (
      <Fragment>
        <div style={{ marginTop: "10px" }}>
          <Typography variant={"h6"} align={"center"}>
            Choix de la langue
          </Typography>
          <Typography variant={"h6"} align={"center"}>
            انتخاب زبان
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Checkbox
            checked={!!this.state.french}
            onChange={e => this.setFrench(e)}
            name={"nameFrench"}
            color="secondary"
          />
          <span>Français</span>
          <Checkbox
            checked={!this.state.french}
            onChange={e => this.setPersian(e)}
            name={"namePersian"}
            color="secondary"
          />
          <span>فارسی</span>
        </div>
        <Box
          borderColor="secondary.main"
          bgcolor="background.paper"
          border={2}
          style={{ padding: "10px", marginBottom: "15px", marginTop: "10px" }}
          m={5}
        >
          {getLegalNotes(this.state.french ? "French" : "Persian")}
        </Box>
        <div ref={this.privacyRef}>
          <div>
            <Typography variant={"h6"} align={"center"}>
              Choix de la langue
            </Typography>
            <Typography variant={"h6"} align={"center"}>
              انتخاب زبان
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Checkbox
              checked={!!this.state.french}
              onChange={e => this.setFrench(e)}
              name={"nameFrench"}
              color="secondary"
            />
            <span>Français</span>
            <Checkbox
              checked={!this.state.french}
              onChange={e => this.setPersian(e)}
              name={"namePersian"}
              color="secondary"
            />
            <span>فارسی</span>
          </div>
          <Box
            borderColor="secondary.main"
            bgcolor="background.paper"
            border={2}
            style={{ padding: "10px", marginBottom: "30px", marginTop: "15px" }}
            m={5}
          >
            {getDataNotes(this.state.french ? "French" : "Persian")}
          </Box>
        </div>
        <div
          style={{
            maxWidth: "100%",
            verticalAlign: "middle",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
            marginTop: "10px",
            paddingBottom: "20px"
          }}
        >
          <Button
            onClick={() => {
              this.close();
            }}
            style={{ textTransform: "none" }}
            variant="contained"
            color="secondary"
            align={"center"}
          >
            <p>
              <span
                style={{
                  display: "block",
                  marginBottom: "0",
                  fontSize: 16,
                  paddingRight: "50px",
                  paddingLeft: "50px"
                }}
              />
              <Typography variant="body1" align="center" component={"span"}>
                {getFrenchName("close")}
              </Typography>
              <span
                style={{
                  display: "block",
                  marginBottom: "2px",
                  fontSize: "100%",
                  paddingRight: "50px",
                  paddingLeft: "50px"
                }}
              />
              <Typography variant="body1" align="center" component={"span"}>
                {getPersianName("close")}
              </Typography>
            </p>
          </Button>
        </div>
      </Fragment>
    );
  }
}
