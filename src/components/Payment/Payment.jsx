import React, { Component, Fragment } from "react";
import * as PropTypes from "prop-types";
import { Grid, Typography, withStyles, withWidth } from "@material-ui/core";
import { getCompleteName, getCompleteNameNew } from "../../Dictionary";
import { getType } from "../order/OrderTypes";
import theme from "../../theme";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import PaymentMethods from "./PaymentMethods";
import CustomTooltip from "../Tooltip/CustomTooltip";

const persianNote =
  "* نکته: هزینه های اعلام شده شامل دریافت سند ترجمه بصورت فایل PDF در حساب کاربری و اصل آن با پست عادی می باشد. توصیه می شود که برای اطمینان بیشتر از وصول ترجمه یکی از گزینه های زیر را برای ارسال ترجمه انتخاب کنید.";

const frenchHint =
  "francedoc se dégage de toute responsabilité si le client ne reçoit pas le courrier. Toute réclamation et demande de nouvel envoi postal fera l’objet d’une nouvelle facturation.";

const persianHint =
  "توجه داشته باشید که " +
  "فرانسدک هیچگونه مسئولیتی در قبال عدم وصول ترجمه از طریق پست بر عهده نمی گیرد. ارسال مجدد " +
  "ترجمه منوط به پرداخت کل هزینه ترجمه می باشد.";

const styles = theme => ({
  wrapper: {
    paddingTop: `${theme.spacing(10)}px !important`,
    [theme.breakpoints.down("md")]: {
      paddingTop: `${theme.spacing(8)}px !important`
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: `${theme.spacing(6)}px !important`
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: `${theme.spacing(4)}px !important`
    },
    position: "relative",
    backgroundColor: "#FFFFFF",
    paddingBottom: theme.spacing(1)
  },
  card: {
    maxWidth: 345,
    backgroundColor: "#00B8D4",
    width: "50%",
    [theme.breakpoints.down("md")]: {
      width: "70%"
    },
    [theme.breakpoints.down("md")]: {
      width: "80%"
    },
    [theme.breakpoints.down("sm")]: {
      width: "80%"
    },
    [theme.breakpoints.down("xs")]: {
      width: "80%"
    }
  },
  container: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(1)
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(1)
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(1)
    }
  },
  title: {
    fontFamily: "MyFont",
    useNextVariants: true
  },
  header: {
    marginBottom: `${theme.spacing(3)}px !important`,
    [theme.breakpoints.down("md")]: {
      marginBottom: `${theme.spacing(2)}px !important`
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: `${theme.spacing(1)}px !important`
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: `${theme.spacing(1)}px !important`
    }
  },
  thirdHeader: {
    marginTop: `${theme.spacing(4)}px !important`,
    [theme.breakpoints.down("md")]: {
      marginTop: `${theme.spacing(3)}px !important`
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: `${theme.spacing(2)}px !important`
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: `${theme.spacing(2)}px !important`
    }
  },
  secondaryHeader: {
    marginBottom: `${theme.spacing(5)}px !important`,
    [theme.breakpoints.down("md")]: {
      marginBottom: `${theme.spacing(4)}px !important`
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: `${theme.spacing(3)}px !important`
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: `${theme.spacing(2)}px !important`
    }
  },
  grid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      isLoading: false,
      idx: null,
      normal: true,
      post: false,
      specialPost: false,
      basePrice: 20,
      price: 20,
      orderId: this.props.location.state.orderId,
      type: getType(this.props.location.state.type)
    };
  }

  componentDidMount() {
    console.log(this.props.location.state);
    let price = this.state.type.price;
    this.setState({
      basePrice: price,
      price: price
    });
  }

  postOnChange = e => {
    let price = this.state.basePrice;
    if (e.target.checked) {
      this.setState({
        post: true,
        normal: false,
        specialPost: false,
        price: price + 2
      });
    } else {
      this.setState({
        price: price,
        post: false
      });
    }
  };

  normalOnChange = e => {
    let price = this.state.basePrice;
    if (e.target.checked) {
      this.setState({
        post: false,
        normal: true,
        specialPost: false,
        price: price
      });
    } else {
      this.setState({
        price: price,
        normal: false
      });
    }
  };

  specialPostOnChange = e => {
    let price = this.state.basePrice;
    if (e.target.checked) {
      this.setState({
        post: false,
        specialPost: true,
        normal: false,
        price: price + 7
      });
    } else {
      this.setState({
        price: price,
        specialPost: false
      });
    }
  };

  render() {
    const { width, classes } = this.props;
    return (
      <Fragment>
        <Typography
          gutterBottom
          variant="h4"
          component="h4"
          align="center"
          style={{ whiteSpace: "pre-line", marginTop: theme.spacing(2) }}
        >
          Payer
        </Typography>
        <Typography
          gutterBottom
          variant="h4"
          component="h4"
          align="center"
          style={{ whiteSpace: "pre-line" }}
        >
          پرداخت هزینه
        </Typography>
        <div className={classes.thirdHeader}>
          <Box
            borderColor="secondary.main"
            bgcolor="background.paper"
            border={2}
            style={{ padding: "10px", marginBottom: "30px" }}
            m={5}
          >
            <Fragment>
              <Typography paragraph variant="h6" align="center">
                {getCompleteName("deliveryType")}
              </Typography>
              <div>
                <Grid
                  container
                  spacing={0}
                  alignItems="center"
                  justify="center"
                  alignContent={"center"}
                >
                  <Grid item xs={12} md={12}>
                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "row"
                      }}
                    >
                      <Typography paragraph variant="body1" align="center">
                        * Important : le tarif annoncé comprend l’accès à la
                        copie numérique (PDF) du document traduit sur votre
                        espace client et le frais d’envoie en lettre économique
                        (lettre verte) à votre adresse.{" "}
                        <Box
                          fontStyle="italic"
                          fontWeight="fontWeightMedium"
                          display="inline"
                        >
                          francedoc
                        </Box>{" "}
                        offre la possibilité de choisir un des modes de
                        livraison suivants afin d’assurer la bonne réception de
                        votre commande.{" "}
                      </Typography>
                      <CustomTooltip text={frenchHint} icon={"error"} />
                    </div>
                  </Grid>
                </Grid>
              </div>
              <div>
                <Grid
                  container
                  spacing={0}
                  alignItems="center"
                  justify="center"
                  alignContent={"center"}
                >
                  <Grid item xs={12} md={12}>
                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "row"
                      }}
                    >
                      <CustomTooltip
                        text={persianHint}
                        dir={"rtl"}
                        icon={"error"}
                      />
                      <Typography
                        paragraph
                        variant="body1"
                        align="center"
                        dir="rtl"
                      >
                        {persianNote}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </div>
              <Grid
                container
                spacing={1}
                alignItems="center"
                justify="center"
                alignContent={"center"}
              >
                <Grid item xs={12} sm={12} md={12}>
                  <Checkbox
                    checked={!!this.state.normal}
                    onChange={e => this.normalOnChange(e)}
                    color="secondary"
                    name={getCompleteName("normalPost")}
                  />
                  <span>{getCompleteName("normalPost")}</span>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Checkbox
                    checked={!!this.state.post}
                    onChange={e => this.postOnChange(e)}
                    color="secondary"
                    name={getCompleteName("post")}
                  />
                  <span>{getCompleteName("post")}</span>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Checkbox
                    checked={!!this.state.specialPost}
                    onChange={e => this.specialPostOnChange(e)}
                    color="secondary"
                    name={getCompleteName("specialPost")}
                  />
                  <span>{getCompleteName("specialPost")}</span>
                </Grid>
              </Grid>
            </Fragment>
          </Box>
        </div>
        <div className={classes.thirdHeader}>
          <Box
            borderColor="primary.main"
            bgcolor="background.paper"
            border={2}
            style={{ padding: "10px", marginBottom: "30px" }}
            m={5}
          >
            <Fragment>
              <Typography paragraph variant="h6" align="center">
                {getCompleteName("bill")}
              </Typography>
              <Typography gutterBottom variant="body1" align="center">
                {getCompleteNameNew("orderType") +
                  " : " +
                  getCompleteNameNew(this.state.type.key)}
              </Typography>
              <Typography gutterBottom variant="body1" align="center">
                {getCompleteNameNew("orderId") +
                  " : " +
                  this.state.type.code +
                  this.state.orderId}
              </Typography>
              <Typography gutterBottom variant="body1" align="center">
                {getCompleteNameNew("amount") + " : " + this.state.price + "€"}
              </Typography>
            </Fragment>
          </Box>
        </div>
        <PaymentMethods
          code={this.state.type.code}
          price={this.state.price}
          id={this.state.orderId}
          width={width}
          classes={classes}
        />
      </Fragment>
    );
  }
}

Payment.propTypes = {
  width: PropTypes.string.isRequired,
  classes: PropTypes.any.isRequired,
  location: PropTypes.any,
  history: PropTypes.any
};

export default withWidth()(withStyles(styles, { withTheme: true })(Payment));