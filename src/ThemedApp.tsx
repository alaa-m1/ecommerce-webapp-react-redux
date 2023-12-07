import { Theme, ThemeProvider } from "@mui/material";
import React, { useMemo } from "react";
import { getTheme } from "theme/getTheme";
import { useAppSelector } from "utils/redux/hooks";
import { CssBaseline } from "@mui/material";
import GlobalStyle from "assets/style/GlobalStyle";

const ThemedApp = ({ children }: ThemedAppProps) => {
  const currentThemeMode = useAppSelector((state) => state.user.themeMode);
  const theme = useMemo<Theme>(
    () => (currentThemeMode === "light" ? getTheme("light") : getTheme("dark")),
    [currentThemeMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

type ThemedAppProps = { children: React.ReactNode };

export default ThemedApp;
