import { Theme, createTheme } from "@mui/material";
import type {} from "@mui/x-data-grid/themeAugmentation";

const primaryColor = "#1976d2";
const secondaryColor = "#9c27b0";
const disabledColor = "#ccc";

const fontFamily = ["Enriqueta", "Open Sans", "sans-serif"];

declare module "@mui/material/styles" {
  interface Palette {
    Error: {
      main: React.CSSProperties["color"];
      dark: React.CSSProperties["color"];
      light: React.CSSProperties["color"];
    };
  }
  interface PaletteOptions {
    Error: {
      main: React.CSSProperties["color"];
      dark: React.CSSProperties["color"];
      light: React.CSSProperties["color"];
    };
  }
}

export const getTheme = (themeMode: "light" | "dark"): Theme =>
  createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: themeMode === "dark" ? "#1976d2" : "#fff",
        dark: themeMode === "dark" ? "#fff" : "#272727",
        light: themeMode === "dark" ? "#1976d2" : "#272727",
      },
      secondary: {
        main: themeMode === "dark" ? "#ff9800" : "#1976d2",
        dark: themeMode === "dark" ? "#1976d2" : "#aaa",
        light: themeMode === "dark" ? "#272727" : "#5C50E7",
      },
      success: { main: "#2e7d32", dark: "#1b5e20", light: "#4caf50" },
      info: {
        main: "#0288d1",
        dark: "#01579b",
        light: themeMode === "dark" ? "#272727" : "#fff",
      },
      warning: { main: "#ed6c02", dark: "#e65100", light: "#ff9800" },
      Error: { main: "#d32f2f", dark: "#c62828", light: "#ef5350" },
    },
    typography: {
      fontFamily: fontFamily.join(","),
    },
    components: {
      MuiTypography: {
        defaultProps: {
          fontSize: "15px",
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: ({ ownerState, theme }) => ({
            color: theme.palette.primary.light,
            "&.Mui-focused": {
              color: "#00f",
            },
          }),
        },
      },
      MuiIconButton: {
        defaultProps: {
          size: "medium",
        },
        styleOverrides: {
          root: {
            "& path": {
              color: themeMode === "dark" ? "#ff9800" : "#1976d2",
            },
          },
        },
      },
      MuiButton: {
        defaultProps: {
          variant: "contained",
          disableElevation: true,
          disableRipple: true,
          size: "medium",
          color: themeMode === "dark" ? "warning" : "info",
        },
        styleOverrides: {
          root: {
            fontFamily: fontFamily,
            padding: "5px 10px",
            fontSize: "12px",
            fontWeight: 600,
            alignItems: "center",
            textTransform: "unset",
            // color: themeMode==="dark"?"#1976d2":"#fff",
            // backgroundColor: themeMode==="dark"?"#fff":"#1976d2",
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontFamily: fontFamily,
          },
        },
      },
      MuiDataGrid: {
        defaultProps: {
          density: "compact",
        },
        styleOverrides: {
          root: {
            border: "none",
          },
          columnHeaders: {
            backgroundColor: themeMode === "dark" ? "#ccc" : "#eee",
          },
          columnHeaderTitle: {
            color: themeMode === "dark" ? "#1976d2" : "#272727",
          },
          cellContent: {
            color: themeMode === "dark" ? "#1976d2" : "#272727",
          },
        },
      },
    },
  });
