import React, { useState } from "react";

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../src/components/globalStyles";
import { themes } from "../src/components/themes";
import { useDarkMode } from "../src/hooks/useDarkMode";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Collapse } from "react-collapse";
import Welcome from "../src/components/welcome";
import { useWelcomePref } from "../src/hooks/useWelcomePref";

config.autoAddCss = false;

const App = ({ Component, pageProps, initialWelcomePref }) => {
  const [themeKey, themeSetter] = useDarkMode();
  const [welcomePref, setWelcomePref] = useWelcomePref(initialWelcomePref);
  const [featureOpen, setFeatureOpen] = useState(false);

  const handleTips = () => {
    setWelcomePref(true);
    setFeatureOpen(true);
  };

  return (
    <ThemeProvider theme={themes[themeKey]}>
      <GlobalStyles />
      <Collapse isOpened={welcomePref}>
        <Welcome
          onClose={() => {
            setWelcomePref(false);
          }}
          featureOpen={featureOpen}
          setFeatureOpen={setFeatureOpen}
        />
      </Collapse>

      <Component
        themeKey={themeKey}
        themeSetter={themeSetter}
        handleTips={handleTips}
        {...pageProps}
      />
    </ThemeProvider>
  );
};

App.getInitialProps = async ({ ctx }) => {
  const { req, res } = ctx;

  let props = { initialWelcomePref: true };

  if (req?.cookies.welcomePref) {
    props.initialWelcomePref = req?.cookies.welcomePref === "true";
  } else {
    res?.setHeader("Set-Cookie", "welcomePref=true; path=/");
  }

  return props;
};

export default App;
