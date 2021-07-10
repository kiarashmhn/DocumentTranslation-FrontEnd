import React, { Component, Fragment } from "react";
import { Grid, Typography } from "@material-ui/core";
import calculateSpacing from "../home/calculateSpacing";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import * as PropTypes from "prop-types";
import { getCompleteName } from "../../Dictionary";
import Box from "@material-ui/core/Box";
import PaymentSubmit from "./PaymentSubmit";
import { methodsInfo } from "./MethodsInfo";
import StripePayment from "./StripePayment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import * as URLConstant from "../../URLConstant";
import Api from "../Api/Api";

export default class PaymentMethods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idx: null,
      files: [],
      num: "",
      config: null
    };
    this.api = new Api();
    this.boxRef = React.createRef();
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
          config: res.data
        });
      });
  };

  handleOpen = idx => {
    this.setState(
      {
        idx: idx
      },
      () => {
        this.boxRef.current.scrollIntoView({
          behavior: "smooth"
        });
      }
    );
  };

  render() {
    let stripe = loadStripe(
      "pk_live_51IAvZFKumUkt7SwGFJd0JzjR2IUAXwKv8cThe3EK13IiPsNdJNLYqJyfjUrpqVzFS4BdXbPsAe7s6wEPRYMcmJbf00Z4cgwgb3"
    );

    const { width, classes, id, price, code } = this.props;
    const methods = methodsInfo(
      id,
      code,
      price,
      this.state.config ? this.state.config : {}
    );
    return (
      <Fragment>
        <div className={classes.thirdHeader}>
          <Typography gutterBottom variant="h6" align="center">
            {getCompleteName("paymentMethods")}
          </Typography>
        </div>
        <Grid
          container
          spacing={calculateSpacing(width)}
          alignItems="center"
          justify="center"
          alignContent={"center"}
        >
          {methods.map((element, idx) => (
            <Grid
              item
              xs={6}
              md={4}
              key={"step" + idx}
              style={{ margin: "5px" }}
            >
              <Card style={{ backgroundColor: "#D2D2D2" }}>
                <CardActionArea onClick={() => this.handleOpen(idx)}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="body1"
                      align="center"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {element.frenchTitle}
                    </Typography>
                    {element.title && (
                      <Typography
                        gutterBottom
                        variant="body1"
                        align="center"
                        dir="rtl"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {element.title}
                      </Typography>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        {this.state.idx !== null && (
          <div className={classes.thirdHeader} ref={this.boxRef}>
            <Box
              borderColor="primary.main"
              bgcolor="background.paper"
              border={2}
              style={{ padding: "10px", marginBottom: "30px" }}
              m={5}
            >
              {this.state.idx === 0 && (
                <Elements stripe={stripe}>
                  <StripePayment
                    amount={this.props.price}
                    orderId={this.props.id}
                    code={this.props.code}
                    deliveryType={this.props.deliveryType}
                    delay={this.props.delay}
                  />
                </Elements>
              )}
              {this.state.idx > 0 && (
                <Fragment>
                  {methods[this.state.idx].content}
                  <PaymentSubmit
                    id={this.props.id}
                    inputKey={methods[this.state.idx].inputKey}
                    idx={this.state.idx}
                    price={this.props.price}
                    deliveryType={this.props.deliveryType}
                    code={this.props.code}
                    delay={this.props.delay}
                  />
                </Fragment>
              )}
            </Box>
          </div>
        )}
      </Fragment>
    );
  }
}
PaymentMethods.propTypes = {
  width: PropTypes.string.isRequired,
  classes: PropTypes.any.isRequired,
  deliveryType: PropTypes.any.isRequired,
  id: PropTypes.any.isRequired,
  code: PropTypes.string,
  price: PropTypes.any,
  delay: PropTypes.any
};
