import theme, {
  dangerColor,
  grayColor,
  successColor,
  warningColor
} from "../../theme";

const customInputStyle = {
  disabled: {
    "&:before": {
      backgroundColor: "transparent !important"
    }
  },
  underline: {
    "&:hover:not($disabled):before,&:before": {
      borderColor: grayColor[4] + " !important",
      borderWidth: "1px !important"
    },
    "&:after": {
      borderColor: theme.palette.primary
    }
  },
  underlineError: {
    "&:after": {
      borderColor: dangerColor[0]
    }
  },
  underlineSuccess: {
    "&:after": {
      borderColor: successColor[0]
    }
  },
  underlineWarning: {
    "&:after": {
      borderColor: warningColor[0]
    }
  },
  labelRoot: {
    ...theme.typography,
    color: grayColor[8] + " !important",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "1.42857"
  },
  labelRootError: {
    color: dangerColor[0]
  },
  labelRootSuccess: {
    color: successColor[0]
  },
  feedback: {
    position: "absolute",
    top: "18px",
    right: "0",
    zIndex: "2",
    display: "block",
    width: "24px",
    height: "24px",
    textAlign: "center",
    pointerEvents: "none"
  },
  marginTop: {
    marginTop: "16px"
  },
  formControl: {
    paddingBottom: "10px",
    margin: "27px 0 0 0",
    position: "relative",
    left: 0,
    verticalAlign: "unset"
  }
};

export default customInputStyle;
