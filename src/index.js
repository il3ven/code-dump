import React, { useState } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import Main from "./main";

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import { themes } from "./components/themes";
import { useDarkMode } from "./components/useDarkMode";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Welcome from "./components/welcome";

const App = (props) => {
  const [themeKey, themeSetter] = useDarkMode();
  const [firstVisit, setFirstVisit] = useState(true);

  return (
    <ThemeProvider theme={themes[themeKey]}>
      <GlobalStyles />

      <Router>
        <Switch>
          <Route exact path="/">
            {firstVisit && <Welcome />}
            <Main state="save" themeKey={themeKey} themeSetter={themeSetter} />
          </Route>
          <Route path="/get/:id">
            <Main state="get" themeKey={themeKey} themeSetter={themeSetter} />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
