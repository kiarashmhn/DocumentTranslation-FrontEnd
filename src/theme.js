import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

// colors
const primary = "#05445E";
const secondary = "#189AB4";
const black = "#343a40";
const darkBlack = "rgb(36, 40, 44)";
const background = "#f5f5f5";
const warningLight = "rgba(253, 200, 69, .3)";
const warningMain = "rgba(253, 200, 69, .5)";
const warningDark = "rgba(253, 200, 69, .7)";
/*const babyBlue = "#D4F1F4";
const blueGreen = "#75E6DA";*/
export const warningColor = ["#ff9800", "#ffa726", "#fb8c00", "#ffa21a"];
export const dangerColor = ["#f44336", "#ef5350", "#e53935", "#f55a4e"];
export const successColor = ["#4caf50", "#66bb6a", "#43a047", "#5cb860"];
export const grayColor = [
  "#999",
  "#777",
  "#3C4858",
  "#AAAAAA",
  "#D2D2D2",
  "#DDD",
  "#b4b4b4",
  "#555555",
  "#333",
  "#a9afbb",
  "#eee",
  "#e7e7e7"
];

// border
const borderWidth = 2;
const borderColor = "rgba(0, 0, 0, 0.13)";

// breakpoints
const xl = 1920;
const lg = 1280;
const md = 960;
const sm = 600;
const xs = 0;

// spacing
const spacing = 8;

const theme = createMuiTheme({
  font: {
    fontFamily: `"MyFont","OS"`
  },
  palette: {
    primary: { main: primary },
    secondary: { main: secondary },
    common: {
      black,
      darkBlack
    },
    warning: {
      light: warningLight,
      main: warningMain,
      dark: warningDark
    },
    danger: {
      main: dangerColor[2]
    },
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
    background: {
      default: background
    },
    spacing
  },
  breakpoints: {
    // Define custom breakpoint values.
    // These will apply to Material-UI components that use responsive
    // breakpoints, such as `Grid` and `Hidden`. You can also use the
    // theme breakpoint functions `up`, `down`, and `between` to create
    // media queries for these breakpoints
    values: {
      xl,
      lg,
      md,
      sm,
      xs
    }
  },
  border: {
    borderColor: borderColor,
    borderWidth: borderWidth
  },
  overrides: {
    MuiExpansionPanel: {
      root: {
        position: "static"
      }
    },
    MuiTableCell: {
      root: {
        paddingLeft: spacing * 2,
        paddingRight: spacing * 2,
        borderBottom: `${borderWidth}px solid ${borderColor}`,
        [`@media (max-width:  ${sm}px)`]: {
          paddingLeft: spacing,
          paddingRight: spacing
        }
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: borderColor,
        height: borderWidth
      }
    },
    MuiPrivateNotchedOutline: {
      root: {
        borderWidth: borderWidth
      }
    },
    MuiListItem: {
      divider: {
        borderBottom: `${borderWidth}px solid ${borderColor}`
      }
    },
    MuiDialog: {
      paper: {
        width: "100%",
        maxWidth: 430,
        marginLeft: spacing,
        marginRight: spacing
      }
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: darkBlack
      }
    },
    MuiExpansionPanelDetails: {
      root: {
        [`@media (max-width:  ${sm}px)`]: {
          paddingLeft: spacing,
          paddingRight: spacing
        }
      }
    }
  },
  typography: {
    fontFamily: `"MyFont","OS"`,
    useNextVariants: true
  },
  direction: "rtl"
});

export default responsiveFontSizes(theme);
