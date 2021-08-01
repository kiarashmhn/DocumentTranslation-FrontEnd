import React, { Fragment, Suspense, Component } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import * as serviceWorker from "./serviceWorker";
import Pace from "./components/Template/Pace";
import UserPanel from "./components/UserPanel";
import HomePage from "./components/HomePage";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import Snackbar from "./components/Snackbar/Snackbar";
import snackbarReducer from "./components/Snackbar/SnackbarReducer";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import * as URLConstant from "./URLConstant";
import AdminPanel from "./components/AdminPanel";
import Payment from "./components/Payment/Payment";
import LegalNotes from "./components/LegalNotes";
import PaymentSuccess from "./components/Payment/PaymentSuccess";
import DataPrivacy from "./components/DataPrivacy";
import FAQ from "./components/FAQ/FAQ";
import DevisSuccess from "./components/Payment/DevisSuccess";
import ReactGA from "react-ga";

const store = createStore(snackbarReducer, applyMiddleware(thunk));
const hist = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
    ReactGA.initialize("G-EV3WSTL6BG");
  }
  componentDidMount() {
    hist.listen(location => {
      ReactGA.set({ page: location.pathname }); // Update the user's current page
      ReactGA.pageview(location.pathname); // Record a pageview for the given page
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Snackbar />
        <Router history={hist}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            <Pace color={theme.palette.secondary.main} />
            <Suspense fallback={<Fragment />}>
              <Switch>
                <PrivateRoute
                  path={URLConstant.ADMIN_PANEL}
                  component={AdminPanel}
                />
                <PrivateRoute
                  path={URLConstant.USER_PANEL}
                  component={UserPanel}
                />
                <PrivateRoute path={URLConstant.PAYMENT} component={Payment} />
                <Route exact path="/" component={HomePage} />
                <Route exact path="/LegalNotes" component={LegalNotes} />
                <Route exact path="/DataPrivacy" component={DataPrivacy} />
                <Route exact path="/FAQ" component={FAQ} />
                <Route
                  exact
                  path="/PaymentSuccess"
                  component={PaymentSuccess}
                />
                <Route exact path="/DevisSuccess" component={DevisSuccess} />
              </Switch>
            </Suspense>
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

serviceWorker.register();

export default App;
