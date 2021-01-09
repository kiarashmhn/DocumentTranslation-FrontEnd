import React, { Fragment, Suspense, Component } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { Route, Router, Switch } from "react-router-dom";
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
import CreateOrder from "./components/order/CreateOrder";
import * as URLConstant from "./URLConstant";

const store = createStore(snackbarReducer, applyMiddleware(thunk));
const hist = createBrowserHistory();

class App extends Component {
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
                  component={CreateOrder}
                />
                <PrivateRoute
                  path={URLConstant.USER_PANEL}
                  component={UserPanel}
                />
                <Route>
                  <HomePage />
                </Route>
              </Switch>
            </Suspense>
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}
//document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
//document.body.setAttribute("dir", "rtl");
serviceWorker.register();

export default App;
