import { Theme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import React, { useLayoutEffect, useMemo } from "react";
import { getTheme } from "theme/getTheme";
import { useAppSelector } from "utils/redux/hooks";
import { CssBaseline } from "@mui/material";
import GlobalStyle from "assets/style/GlobalStyle";
import { ThemeProvider } from "styled-components";
import Rtl from "./Rtl";

const ThemedApp = ({ children }: ThemedAppProps) => {
  const currentThemeMode = useAppSelector((state) => state.user.themeMode);
  const currentDocDirection = useAppSelector((state) => state.user.direction);

  useLayoutEffect(() => {
    if (currentDocDirection) document.dir = currentDocDirection;
  }, [currentDocDirection]);

  const theme = useMemo<Theme>(
    () => (currentThemeMode === "light" ? getTheme("light") : getTheme("dark")),
    [currentThemeMode]
  );

  const styledTheme = {
    main: currentThemeMode === "light" ? "#fff" : "#121212",
  };
  return (
    <Rtl docDirection={currentDocDirection}>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={styledTheme}>
          <CssBaseline enableColorScheme />
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </MuiThemeProvider>
    </Rtl>
  );
};

type ThemedAppProps = { children: React.ReactNode };

export default ThemedApp;
