import React from "react";
import { Alert, Box, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "utils/redux/hooks";

export const InfoSection = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const currentThemeMode = useAppSelector((state) => state.user.themeMode);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "left",
      }}
    >
      <Alert
        severity="info"
        sx={{
          mb: 1,
          width: "60%",
          backgroundColor:
            currentThemeMode === "dark"
              ? theme.palette.secondary.main
              : theme.palette.secondary.main,
          "& path": {
            color: "primary.light",
          },
        }}
      >
        <Typography fontSize={16} color="primary.light">
          {t("home_api_info")}:&nbsp;
          <a href="https://fakestoreapi.com/">fakestoreapi</a>
        </Typography>
      </Alert>
      <Alert
        severity="info"
        sx={{
          mb: 1,
          width: "60%",
          backgroundColor:
            currentThemeMode === "dark"
              ? theme.palette.secondary.main
              : theme.palette.secondary.main,
          "& path": {
            color: "primary.light",
          },
        }}
      >
        <Typography fontSize={16} color="primary.light">
          {t("home_translation_info")}
        </Typography>
      </Alert>
    </Box>
  );
};
