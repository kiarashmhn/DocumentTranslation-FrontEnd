import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  isWidthUp,
  withWidth,
  withStyles
} from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";
import calculateSpacing from "./calculateSpacing";
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
    marginBottom: `${theme.spacing(10)}px !important`,
    [theme.breakpoints.down("md")]: {
      marginBottom: `${theme.spacing(8)}px !important`
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: `${theme.spacing(6)}px !important`
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: `${theme.spacing(4)}px !important`
    }
  }
});

const features = [
  {
    color: "#DD2C00",
    headline: "شناسنامه",
    frenchHeadline: "Acte de l’état civil",
    text: "ترجمه رسمی شناسنامه\n تعرفه: از ۲۰ تا ۲۵ یورو\n زمان تحویل: ۲۴ ساعت",
    frenchText:
      "Traduction certifiée de l’Acte de l’état civil\n Tarif : 20 à 25€ \n Délai de livraison : 24h",
    icon: <DescriptionIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0"
  },
  {
    color: "#6200EA",
    headline: "کارت ملی",
    frenchHeadline: "Carte d'Identité Nationale",
    text:
      "ترجمه رسمی کارت شناسایی ملی و کارت هوشمند ملی\n تعرفه: ۲۰ یورو\n زمان تحویل: ۲۴ ساعت",
    frenchText:
      "Traduction certifiée de la Carte d'identité nationale\n Tarif : 20€ \n Délai de livraison : 24h",
    icon: <DescriptionIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200"
  },
  {
    color: "#0091EA",
    headline: "گواهینامه",
    frenchHeadline: "Permis de conduire",
    text: "ترجمه رسمی گواهینامه رانندگی\n تعرفه: ۲۰ یورو\n زمان تحویل: ۲۴ ساعت",
    frenchText:
      "Traduction certifiée du Permis de conduire\n Tarif : 20€ \n Délai de livraison : 24h",
    icon: <DescriptionIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "0"
  },
  {
    color: "#d50000",
    headline: "کارت پایان خدمت",
    frenchHeadline: "Carte de fin de service militaire",
    text:
      "ترجمه رسمی کارت پایان خدمت دوره ضرورت و کارت معافیت از خدمت دوره ضرورت\n تعرفه: ۲۰ یورو\n زمان تحویل: ۲۴ ساعت",
    frenchText:
      "Traduction certifiée de la Carte de fin ou d’exemption du service militaire\n Tarif : 20€ \n Délai de livraison : 24h",
    icon: <DescriptionIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "200"
  },
  {
    color: "#00C853",
    headline: "سند ازدواج",
    frenchHeadline: "Acte de mariage",
    text:
      "ترجمه رسمی سند ازدواج یا عقدنامه\n تعرفه: ۶۰ یورو\n زمان تحویل: ۴۸ ساعت",
    frenchText:
      "Traduction certifiée du Certificat ou de l’Acte de mariage\n Tarif : 60€ \n Délai de livraison : 48h",
    icon: <DescriptionIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "0"
  },
  {
    color: "#64DD17",
    headline: "تذکره",
    frenchHeadline: "Acte de naissance",
    text: "ترجمه رسمی تذکره\n تعرفه: ۲۰ یورو\n زمان تحویل: ۲۴ ساعت",
    frenchText:
      "Traduction certifiée de l’Acte de naissance\n Tarif : 20€ \n Délai de livraison : 24h",
    icon: <DescriptionIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "200"
  },
  {
    color: "#304FFE",
    headline: "نکاح نامه (سند ازدواج)",
    frenchHeadline: "Certificat de mariage",
    text:
      "ترجمه رسمی نکاح نامه، نکاح خطر، وثیقه زوجیت، نکاح نامه شرعی\n تعرفه: ۵۰ یورو\n زمان تحویل: ۴۸ ساعت",
    frenchText:
      "Traduction certifiée du Certificat ou de l’Acte de mariage\n Tarif : 50€ \n Délai de livraison : 48h",
    icon: <DescriptionIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0"
  },
  {
    color: "#C51162",
    headline: "لیسانس درایوری",
    frenchHeadline: "Permis de conduire",
    text: "ترجمه رسمی لایسنس درایوری\n تعرفه: ۲۵ یورو\n زمان تحویل: ۲۴ ساعت",
    frenchText:
      "Traduction certifiée du Permis de conduire\n Tarif : 25€ \n Délai de livraison : 24h",
    icon: <DescriptionIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200"
  },
  {
    color: "#00B8D4",
    headline: "کارت ثبت تولدات",
    frenchHeadline: "Carte d’enregistrement de naissance",
    text: "ترجمه رسمی کارت ثبت تولدات\n تعرفه: ۲۵ یورو\n زمان تحویل: ۲۴ ساعت",
    frenchText:
      "Traduction certifiée de la Carte d’enregistrement de naissance\n Tarif : 25€ \n Délai de livraison : 24h",
    icon: <DescriptionIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "0"
  },
  {
    color: "#dbc858",
    headline: "فورم تثبیت هویت",
    frenchHeadline: "Formulaire de vérification d’identité",
    text: "ترجمه رسمی فورم تثبیت هویت\n تعرفه: ۲۵ یورو\n زمان تحویل: ۲۴ ساعت",
    frenchText:
      "Traduction certifiée de la Formulaire de vérification d’identité\n Tarif : 25€ \n Délai de livraison : 24h",
    icon: <DescriptionIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0"
  },
  {
    color: "#0d133b",
    headline: "کارت اقامت موقت اتباع خارجی",
    frenchHeadline: "Carte de séjour temporaire  pour les étrangers",
    text:
      "ترجمه رسمی کارت اقامت موقت اتباع خارجی\n تعرفه: ۲۵ یورو\n زمان تحویل: ۲۴ ساعت",
    frenchText:
      "Traduction certifiée de la Carte de séjour temporaire  pour les étrangers\n Tarif : 25€ \n Délai de livraison : 24h",
    icon: <DescriptionIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200"
  },
  {
    color: "#db8758",
    headline: "ترجمه متن",
    frenchHeadline: "Autres types de documents",
    text:
      "ترجمه رسمی متون، اسناد و مدارک دیگر\n تعرفه: درخواست پیش فاکتور کنید\n زمان تحویل: با توجه به مقدار کار تعیین می شود",
    frenchText:
      "Traduction certifiée d'autres types de documents\n Tarif : demander un devis \n Délai de livraison : en fonction de la difficulté linguistique",
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
          <Typography variant="h3" align="center" className={classes.header}>
            خدمات
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color={"error"}
            className={classes.secondaryHeader}
          >
            برای استفاده از امکانات ابتدا وارد شوید *
          </Typography>
          <div className="container-fluid">
            <Grid container spacing={calculateSpacing(width)}>
              {features.map(element => (
                <Grid
                  item
                  xs={6}
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
  classes: PropTypes.object
};

export default withWidth()(
  withStyles(styles, { withTheme: true })(FeatureSection)
);
