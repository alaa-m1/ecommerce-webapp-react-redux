import { CssBaseline, Theme, ThemeProvider } from "@mui/material";
import App from "App";
import { useMemo } from "react";
import { getTheme } from "theme/getTheme";
import { useAppSelector } from "utils/redux/hooks";

const ThemedApp = () => {
  const currentThemeMode = useAppSelector((state) => state.user.themeMode);
  const theme = useMemo<Theme>(
    () => (currentThemeMode === "light" ? getTheme("light") : getTheme("dark")),
    [currentThemeMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};
export default ThemedApp;
