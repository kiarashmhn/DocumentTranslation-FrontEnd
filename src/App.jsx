import React, { Fragment, Suspense, Component } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import * as serviceWorker from "./serviceWorker";
import Pace from "./shared/components/Pace";
import MainPage from "./logged_in/components/MainPage";
import HomePage from "./logged_out/components/HomePage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles />
          <Pace color={theme.palette.secondary.main} />
          <Suspense fallback={<Fragment />}>
            <Switch>
              <Route path="/c">
                <MainPage />
              </Route>
              <Route>
                <HomePage />
              </Route>
            </Switch>
          </Suspense>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}
//document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
//document.body.setAttribute("dir", "rtl");
serviceWorker.register();

export default App;
