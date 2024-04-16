import { Theme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import React, { useMemo } from "react";
import { getTheme } from "theme/getTheme";
import { useAppSelector } from "utils/redux/hooks";
import { CssBaseline } from "@mui/material";
import GlobalStyle from "assets/style/GlobalStyle";
import { ThemeProvider } from "styled-components";

const ThemedApp = ({ children }: ThemedAppProps) => {
  const currentThemeMode = useAppSelector((state) => state.user.themeMode);
  const theme = useMemo<Theme>(
    () => (currentThemeMode === "light" ? getTheme("light") : getTheme("dark")),
    [currentThemeMode]
  );
  const styledTheme = {
    main: currentThemeMode === "light" ? "#fff" : "#121212",
  };
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={styledTheme}>
        <CssBaseline enableColorScheme/>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

type ThemedAppProps = { children: React.ReactNode };

export default ThemedApp;
