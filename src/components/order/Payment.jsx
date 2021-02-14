import React, { Component, Fragment } from "react";
import * as PropTypes from "prop-types";
import { Grid, Typography, withStyles, withWidth } from "@material-ui/core";
import calculateSpacing from "../home/calculateSpacing";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { getCompleteName } from "../../Dictionary";
import { getType } from "./OrderTypes";
import theme from "../../theme";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";

const frenchNote =
  "* Important : le tarif annoncé comprend le frais d’envoie en lettre économique (Lettre verte). Francedoc.fr se dégage de toute \nresponsabilité si le client ne reçoit pas le courrier. Toute réclamation et demande de nouvel envoi postal fera l’objet d’une nouvelle facturation.\n Francedoc.fr offre la possibilité de choisir l’envoi d’un des deux types suivants qui constituent des choix plus fiables\n afin d’assurer la bonne réception de la commande.";
const persianNote =
  "* نکته: هزینه های اعلام شده شامل ارسال اصل ترجمه با پست عادی میباشد. توجه داشته باشید که فرانسدک هیچگونه مسئولیتی در قبال عدم وصول ترجمه از طریق پست بر عهده نمی گیرد. ارسال مجدد ترجمه منوط به پرداخت کل هزینه ترجمه میباشد. توصیه می شود که برای اطمینان بیشتر از وصول ترجمه یکی از گزینه های زیر را برای ارسال ترجمه انتخاب کنید.";

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

const methods = [
  {
    title: "پرداخت با کارت",
    frenchTitle: "Carte bancaire",
    content: <Fragment />
  },
  {
    title: "واریز به حساب",
    frenchTitle: "Virement bancaire",
    content: <Fragment />
  },
  {
    title: "ارسال چک",
    frenchTitle: "Envoyez un chèque",
    content: <Fragment />
  },
  {
    title: "از طریق Western Union",
    frenchTitle: "Par Western Union",
    content: <Fragment />
  }
];

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      isLoading: false,
      idx: 0,
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

  specialPostOnChange = e => {
    let price = this.state.basePrice;
    if (e.target.checked) {
      this.setState({
        post: false,
        specialPost: true,
        price: price + 7
      });
    } else {
      this.setState({
        price: price,
        specialPost: false
      });
    }
  };

  handleOpenDialog = idx => {
    this.setState({
      openDialog: true,
      idx: idx
    });
  };

  handleCloseDialog = () => {
    this.setState({
      openDialog: false
    });
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
              <Typography paragraph variant="body1" align="center">
                {frenchNote}
              </Typography>
              <Typography paragraph variant="body1" align="center" dir="rtl">
                {persianNote}
              </Typography>
              <Grid
                container
                spacing={1}
                alignItems="center"
                justify="center"
                alignContent={"center"}
              >
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
                {getCompleteName(this.state.type.key) +
                  " : " +
                  getCompleteName("orderType")}
              </Typography>
              <Typography gutterBottom variant="body1" align="center">
                {this.state.type.code +
                  this.state.orderId +
                  " : " +
                  getCompleteName("orderId")}
              </Typography>
              <Typography gutterBottom variant="body1" align="center">
                {this.state.price + "€" + " : " + getCompleteName("amount")}
              </Typography>
            </Fragment>
          </Box>
        </div>
        <div className={classes.thirdHeader}>
          <Typography gutterBottom variant="h6" align="center">
            Méthodes de payement
          </Typography>
        </div>
        <div className={classes.secondaryHeader}>
          <Typography gutterBottom variant="h6" align="center">
            شیوه‌های پرداخت
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
                <CardActionArea onClick={() => this.handleOpenDialog(idx)}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="body1"
                      align="center"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {element.frenchTitle}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body1"
                      align="center"
                      dir="rtl"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {element.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
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
