import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, isWidthUp, withWidth, withStyles } from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";
import FeatureCard from "./FeatureCard";
import classNames from "classnames";

const iconSize = 30;

const styles = theme => ({
  wrapper: {
    paddingTop: `${theme.spacing(1)}px !important`,
    position: "relative",
    backgroundColor: "#FFFFFF",
    paddingBottom: theme.spacing(1)
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
  secondaryHeader: {
    marginBottom: `${theme.spacing(2)}px !important`,
    [theme.breakpoints.down("md")]: {
      marginBottom: `${theme.spacing(2)}px !important`
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: `${theme.spacing(2)}px !important`
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: `${theme.spacing(2)}px !important`
    }
  }
});

const features = [
  {
    color: "#64DD17",
    headline: "تذکره",
    frenchHeadline: "Acte de naissance",
    text: "تعرفه: ۲۰ یورو\n زمان تحویل: ۲۴ ساعت",
    frenchText: "Tarif * : 20€ \n Délai de livraison : 24h",
    icon: <DescriptionIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "200"
  },
  {
    color: "#304FFE",
    headline: "نکاح نامه (سند ازدواج)",
    frenchHeadline: "Certificat de mariage",
    text: "تعرفه: ۵۰ یورو\n زمان تحویل: ۴۸ ساعت",
    frenchText: "Tarif * : 50€ \n Délai de livraison : 48h",
    icon: <DescriptionIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0"
  },
  {
    color: "#DD2C00",
    headline: "شناسنامه",
    frenchHeadline: "Acte de naissance",
    text: "تعرفه: از ۲۰ تا ۲۵ یورو\n زمان تحویل: ۲۴ ساعت",
    frenchText: "Tarif * : 20 à 25€ \n Délai de livraison : 24h",
    icon: <DescriptionIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0"
  },
  {
    color: "#6200EA",
    headline: "کارت ملی",
    frenchHeadline: "Carte d'identité nationale",
    text: "تعرفه: ۲۰ یورو\n زمان تحویل: ۲۴ ساعت",
    frenchText: "Tarif * : 20€ \n Délai de livraison : 24h",
    icon: <DescriptionIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200"
  },
  {
    color: "#0091EA",
    headline: "گواهینامه",
    frenchHeadline: "Permis de conduire",
    text: "تعرفه: ۲۰ یورو\n زمان تحویل: ۲۴ ساعت",
    frenchText: "Tarif * : 20€ \n Délai de livraison : 24h",
    icon: <DescriptionIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "0"
  },
  {
    color: "#d50000",
    headline: "کارت پایان خدمت",
    frenchHeadline: "Carte de fin de service militaire",
    text: "تعرفه: ۲۰ یورو\n زمان تحویل: ۲۴ ساعت",
    frenchText: "Tarif * : 20€ \n Délai de livraison : 24h",
    icon: <DescriptionIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "200"
  },
  {
    color: "#00C853",
    headline: "سند ازدواج",
    frenchHeadline: "Acte de mariage",
    text: "تعرفه: ۶۰ یورو\n زمان تحویل: ۴۸ ساعت",
    frenchText: "Tarif * : 60€ \n Délai de livraison : 48h",
    icon: <DescriptionIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "0"
  },
  {
    color: "#C51162",
    headline: "لیسانس درایوری",
    frenchHeadline: "Permis de conduire",
    text: "تعرفه: ۲۵ یورو\n زمان تحویل: ۲۴ ساعت",
    frenchText: "Tarif * : 25€ \n Délai de livraison : 24h",
    icon: <DescriptionIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200"
  },
  {
    color: "#00B8D4",
    headline: "کارت ثبت تولدات",
    frenchHeadline: "Carte d’enregistrement de naissance",
    text: "تعرفه: ۲۵ یورو\n زمان تحویل: ۲۴ ساعت",
    frenchText: "Tarif * : 25€ \n Délai de livraison : 24h",
    icon: <DescriptionIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "0"
  },
  {
    color: "#dbc858",
    headline: "فورم تثبیت هویت",
    frenchHeadline: "Formulaire de vérification d’identité",
    text: "تعرفه: ۲۵ یورو\n زمان تحویل: ۲۴ ساعت \n ",
    frenchText: "Tarif * : 25€ \n Délai de livraison : 24h",
    icon: <DescriptionIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0"
  },
  {
    color: "#0d133b",
    headline: "کارت اقامت موقت اتباع خارجی",
    frenchHeadline: "Carte de séjour temporaire",
    text: "تعرفه: ۲۵ یورو\n زمان تحویل: ۲۴ ساعت",
    frenchText: "Tarif * : 25€ \n Délai de livraison : 24h",
    icon: <DescriptionIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200"
  },
  {
    color: "#db8758",
    headline: "متون، اسناد و مدارک دیگر",
    frenchHeadline: "Autres types de documents",
    text: "تعرفه: درخواست پیش فاکتور کنید\n زمان تحویل: با توجه به مقدار کار",
    frenchText:
      "Tarif * : demander un devis \n Délai : en fonction de la difficulté linguistique",
    icon: <DescriptionIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "0"
  }
];

class FeatureSection extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { width, classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <div className={classNames("container-fluid", classes.container)}>
          <div className="container-fluid">
            <Grid container spacing={1}>
              {features.map(element => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  data-aos="zoom-in-up"
                  data-aos-delay={
                    isWidthUp("md", width) ? element.mdDelay : element.smDelay
                  }
                  key={element.headline}
                >
                  <FeatureCard
                    Icon={element.icon}
                    color={element.color}
                    headline={element.headline}
                    frenchHeadline={element.frenchHeadline}
                    text={element.text}
                    frenchText={element.frenchText}
                    onClick={this.props.openRegisterDialog}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

FeatureSection.propTypes = {
  width: PropTypes.string.isRequired,
  classes: PropTypes.object,
  openRegisterDialog: PropTypes.func.isRequired
};

export default withWidth()(
  withStyles(styles, { withTheme: true })(FeatureSection)
);
