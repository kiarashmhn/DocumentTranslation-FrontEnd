import React, { Component, Fragment } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import {
  getCompleteName,
  getFrenchName,
  getPersianName
} from "../../Dictionary";
import FileHandler from "../File/FileHandler";
import FieldInput from "../CustomInput/FieldInput";
import PropTypes from "prop-types";

export default class PaymentSubmit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      num: ""
    };
    this.fileHandlerRef = React.createRef();
  }

  render() {
    return (
      <Fragment>
        <Grid
          container
          spacing={1}
          alignItems="center"
          justify="center"
          alignContent={"center"}
        >
          <Grid item xs={12} sm={12} md={12}>
            <Typography paragraph variant="h6" align="center">
              {getCompleteName("receiptInfo")}
            </Typography>
            <FileHandler
              ref={this.fileHandlerRef}
              orderId={this.props.id}
              type={"payment"}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FieldInput
              name={"num"}
              value={this.state.num}
              onChange={event => this.setState({ num: event.target.value })}
              notRequired={true}
            />
          </Grid>
        </Grid>
        <div
          style={{
            maxWidth: "100%",
            verticalAlign: "middle",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
            paddingBottom: "20px",
            marginTop: "5px"
          }}
        >
          <Button
            onClick={() => {}}
            variant="contained"
            color="secondary"
            align={"center"}
          >
            <p>
              <span
                style={{
                  display: "block",
                  marginBottom: "2px",
                  fontSize: "100%"
                }}
              />
              <Typography variant="body1" align="center" component={"span"}>
                {getPersianName("finalSubmit")}
              </Typography>
              <span
                style={{
                  display: "block",
                  marginBottom: "0",
                  fontSize: 16
                }}
              />
              <Typography variant="body2" align="center" component={"span"}>
                {getFrenchName("finalSubmit")}
              </Typography>
            </p>
          </Button>
        </div>
      </Fragment>
    );
  }
}

PaymentSubmit.propTypes = {
  id: PropTypes.any.isRequired
};
