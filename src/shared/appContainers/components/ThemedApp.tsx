import { Theme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import React, { useLayoutEffect, useMemo } from "react";
import { getTheme } from "theme/getTheme";
import { useAppSelector } from "utils/redux/hooks";
import { CssBaseline } from "@mui/material";
import GlobalStyle from "assets/style/GlobalStyle";
import { ThemeProvider } from "styled-components";
import Rtl from "./Rtl";
import { useGetUIThemeMode } from "shared/hooks";
import { Helmet } from "react-helmet-async";
import 'primeicons/primeicons.css';

// import "primereact/resources/themes/md-light-indigo/theme.css";
const ThemedApp = ({ children }: ThemedAppProps) => {
  const themeMode = useGetUIThemeMode();
  const direction = useAppSelector((state) => state.user.direction);

  useLayoutEffect(() => {
    if (direction) document.dir = direction;
  }, [direction]);

  const theme = useMemo<Theme>(
    () => getTheme({ themeMode, direction }),
    [themeMode, direction]
  );

  const styledTheme = {
    main: themeMode === "light" ? "#eee" : "#212121",
  };
  return (
    <>
      <Helmet>
        {themeMode === "dark" ? (
          <link
            id="dark-theme"
            rel="stylesheet"

            // href="/themes/md-dark-indigo/theme.css"
            href="/themes/mdc-dark-indigo/theme.css"
          />
        ) : (
          <link
            id="light-theme"
            rel="stylesheet"
                        // href="/themes/md-light-indigo/theme.css"
            href="/themes/mdc-light-indigo/theme.css"
          />
        )}
      </Helmet>

      <Rtl docDirection={direction}>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={styledTheme}>
            <CssBaseline enableColorScheme />
            <GlobalStyle />
            {children}
          </ThemeProvider>
        </MuiThemeProvider>
      </Rtl>
    </>
  );
};

type ThemedAppProps = { children: React.ReactNode };

export default ThemedApp;
