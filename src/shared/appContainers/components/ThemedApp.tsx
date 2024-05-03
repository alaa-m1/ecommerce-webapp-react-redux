import { Theme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import React, { useLayoutEffect, useMemo } from "react";
import { getTheme } from "theme/getTheme";
import { useAppSelector } from "utils/redux/hooks";
import { CssBaseline } from "@mui/material";
import GlobalStyle from "assets/style/GlobalStyle";
import { ThemeProvider } from "styled-components";
import Rtl from "./Rtl";

const ThemedApp = ({ children }: ThemedAppProps) => {
  const themeMode = useAppSelector((state) => state.user.themeMode);
  const direction = useAppSelector((state) => state.user.direction);

  useLayoutEffect(() => {
    if (direction) document.dir = direction;
  }, [direction]);

  const theme = useMemo<Theme>(
    () => getTheme({ themeMode, direction }),
    [themeMode, direction]
  );

  const styledTheme = {
    main: themeMode === "light" ? "#fff" : "#121212",
  };
  return (
    <Rtl docDirection={direction}>
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
