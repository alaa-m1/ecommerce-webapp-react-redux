import { Theme, createTheme } from "@mui/material";
import type {} from "@mui/x-data-grid/themeAugmentation";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import { arSD, enUS } from "@mui/x-data-grid/locales";

const fontFamily = ["Noto Kufi Arabic", "Open Sans", "sans-serif", "Helvetica"];

declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      hover: React.CSSProperties["color"];
    };
  }
  interface PaletteOptions {
    custom: {
      hover: React.CSSProperties["color"];
    };
  }
  interface TypographyVariants {
    mainTitle: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    mainTitle?: React.CSSProperties;
  }
}
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    mainTitle: true;
  }
}

export const getTheme = ({
  themeMode,
  direction,
}: {
  themeMode: "light" | "dark";
  direction: "rtl" | "ltr";
}): Theme => {
  const localization = direction === "ltr" ? enUS : arSD;
  const theme = createTheme(
    {
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
        error: { main: "#d32f2f", dark: "#c62828", light: "#ef5350" },
        custom: { hover: "#e76712" },
      },
      spacing: 4,
      typography: {
        fontFamily: fontFamily.join(","),
        mainTitle: {
          fontSize: "2rem",
          color: "blue",
        },
        subtitle1: {
          // fontSize: 20,
        },
        body1: {
          fontWeight: 500,
        },
        button: {
          fontStyle: "italic",
        },
      },

      components: {
        MuiPickersDay: {
          styleOverrides: {
            root: {
              color: "#1565c0",
              borderRadius: "20px",
              borderWidth: "1px",
              borderColor: "#2196f3",
              border: "1px solid",
              backgroundColor: "#90caf9",
              "& .MuiPickersDay-root": {
                "& .Mui-selected": {
                  backgroundColor: "red",
                  color: "red",
                },
              },
              "&:focus": {
                color: "lime",
                backgroundColor: "lime !important",
              },
              "& .Mui-selected": {
                color: "red",
                backgroundColor: "yellow",
              },
              "& .Mui-focused": {
                color: "red",
                backgroundColor: "blue",
              },
            },
          },
        },
        MuiCssBaseline: {
          styleOverrides: (themeParam) => ({
            //   h1: {
            //     color: themeParam.palette.primary.main,
            //   },
            "@font-face": {
              fontFamily: "Raleway",
              fontStyle: "normal",
              fontDisplay: "swap",
              fontWeight: 400,
              src: "local('Raleway'), local('Raleway-Regular'), url(${RalewayWoff2}) format('woff2')",
              unicodeRange:
                "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
            },
          }),
        },
        // MuiTypography: {
        //   // defaultProps: {
        //   //   fontSize: "14px",
        //   // },
        // },
        MuiTypography: {
          defaultProps: {
            variantMapping: {
              // Map the new variant to render a <h1> by default
              mainTitle: "h1",
            },
          },
        },
        MuiOutlinedInput: {
          defaultProps: {
            sx: {
              fontSize: "20px",
            },
          },
        },
        MuiInputLabel: {
          defaultProps: {
            sx: {
              fontSize: "20px",
            },
          },
          styleOverrides: {
            root: ({ theme }) => ({
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
        MuiSlider: {
          styleOverrides: {
            // valueLabel: ({ ownerState, theme }) => ({
            //   ...(ownerState.orientation === 'vertical' && {
            //     backgroundColor: 'transparent',
            //     color: theme.palette.grey[500],
            //   }),
            // }),
          },
        },
        MuiButton: {
          defaultProps: {
            variant: "contained",
            disableElevation: true,
            // disableRipple: true,
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
    },
    localization
  );
  theme.typography.h3 = {
    fontSize: "1.2rem",
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2.4rem",
    },
  };
  // theme = responsiveFontSizes(theme);
  return theme;
};
