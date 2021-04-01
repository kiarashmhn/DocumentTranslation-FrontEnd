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
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const store = createStore(snackbarReducer, applyMiddleware(thunk));
const hist = createBrowserHistory();

class App extends Component {
  render() {
    let stripe = loadStripe(
      "pk_test_51IMcfSDJralPixYMYcqmdwXKdFhT0ZbkdpLtu1DjX3K9VSMv7OTdEbolmicfnVuDigV8xV2PeiDoPPGlLFRiV49x00HLxkwkxq"
    );
    return (
      <Provider store={store}>
        <Elements stripe={stripe}>
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
                  <PrivateRoute
                    path={URLConstant.PAYMENT}
                    component={Payment}
                  />
                  <Route exact path="/" component={HomePage} />
                  <Route exact path="/LegalNotes" component={LegalNotes} />
                  <Route
                    exact
                    path="/PaymentSuccess"
                    component={PaymentSuccess}
                  />
                </Switch>
              </Suspense>
            </MuiThemeProvider>
          </Router>
        </Elements>
      </Provider>
    );
  }
}

serviceWorker.register();

export default App;
