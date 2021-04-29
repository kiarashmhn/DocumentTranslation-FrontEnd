import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  withStyles
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ColoredButton from "../../../src/components/Template/ColoredButton";

const styles = theme => ({
  dialogActions: {
    justifyContent: "flex-start",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  dialog: {
    zIndex: 1400
  },
  backIcon: {
    marginRight: theme.spacing(1)
  }
});

function CookieRulesDialog(props) {
  const { classes, onClose, open, theme } = props;
  return (
    <Dialog
      open={open}
      scroll="paper"
      onClose={onClose}
      className={classes.dialog}
    >
      <DialogContent>
        <Typography paragraph>
          - Le site que vous visitez utilise des cookies (traceurs). Ainsi, le
          site est susceptible d&apos;accéder à des informations déjà stockées
          dans votre équipement terminal de communications électroniques et
          d&apos;y inscrire des informations.
        </Typography>
        <Typography paragraph>
          - Le site utilise exclusivement des traceurs dits &quot;strictement
          nécessaires&quot;, qui ne nécessitent pas votre consentement
          préalable.
        </Typography>
        <Typography paragraph>
          - Nous utilisons ces traceurs pour permettre et faciliter la
          navigation sur le site notamment en mémorisant vos préférences de
          navigation définis au cours de votre session et fournir les services
          de traduction que vous demandez expressément.
        </Typography>
        <Typography paragraph>
          - Ces cookies ne peuvent pas, techniquement, être désactivés depuis le
          site. Vous pouvez néanmoins vous opposer à l&apos;utilisation de ces
          traceurs, exclusivement en paramétrant votre navigateur. Ce
          paramétrage dépend du navigateur que vous utilisez, mais il est en
          général simple à réaliser : en principe, vous pouvez soit activer une
          fonction de navigation privée soit uniquement interdire ou restreindre
          les traceurs (cookies). Attention, il se peut que des traceurs aient
          été enregistrés sur votre périphérique avant le paramétrage de votre
          navigateur : dans ce cas, effacez votre historique de navigation,
          toujours en utilisant le paramétrage de votre navigateur.
        </Typography>
        <Typography paragraph>
          - L&apos;utilisation des traceurs est régie par l&apos;article 32 II
          de la loi n° 78-17 du 6 janvier 1978, transposant l&apos;article 5.3
          de la directive 2002/58/CE du parlement européen et du conseil du 12
          juillet 2002 modifiée par la directive 2009/136/CE.
        </Typography>
        <Typography paragraph>
          - Pour en savoir plus sur les cookies et traceurs, nous vous invitons
          à consulter le site de la CNIL : www.cnil.fr.
        </Typography>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <ColoredButton
          onClick={onClose}
          variant="contained"
          color={theme.palette.common.black}
        >
          <ArrowBackIcon className={classes.backIcon} />
          Fermer
        </ColoredButton>
      </DialogActions>
    </Dialog>
  );
}

CookieRulesDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(CookieRulesDialog);
