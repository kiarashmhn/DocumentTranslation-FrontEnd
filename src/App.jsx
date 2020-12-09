import React, { Fragment, Suspense, Component } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { Route, Router, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import * as serviceWorker from "./serviceWorker";
import Pace from "./shared/components/Pace";
import MainPage from "./logged_in/components/MainPage";
import HomePage from "./logged_out/components/HomePage";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import Snackbar from "../src/custom/Snackbar/Snackbar";
import snackbarReducer from "./custom/Snackbar/SnackbarReducer";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";

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
                <Route path="/userPanel">
                  <MainPage />
                </Route>
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
