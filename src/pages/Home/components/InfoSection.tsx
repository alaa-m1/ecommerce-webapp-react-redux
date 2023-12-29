import React from "react";
import { Alert, Box, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "utils/redux/hooks";

export const InfoSection = () => {
  const { t } = useTranslation();
  const theme= useTheme();
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
        sx={{ mb: 1, width: "60%" }}
        severity="info"
        style={{
          backgroundColor: currentThemeMode === "dark" ?  theme.palette.secondary.main : theme.palette.secondary.main,
        }}
      >
        {t("home_api_info")}:&nbsp;
        <a href="https://fakestoreapi.com/">fakestoreapi</a>
      </Alert>
      <Alert
        sx={{ mb: 1, width: "60%" }}
        severity="info"
        style={{
          backgroundColor: currentThemeMode === "dark" ? theme.palette.secondary.main : theme.palette.secondary.main,
        }}
      >
        {t("home_translation_info")}
      </Alert>
    </Box>
  );
};
