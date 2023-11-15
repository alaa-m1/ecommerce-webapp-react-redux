import { Alert, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "utils/redux/hooks";

export const InfoSection = () => {
  const { t } = useTranslation();
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
          backgroundColor: currentThemeMode === "dark" ? "#e65100" : "#0288d1",
        }}
      >
        {t("home_api_info")}:&nbsp;
        <a href="https://fakestoreapi.com/">fakestoreapi</a>
      </Alert>
      <Alert
        sx={{ mb: 1, width: "60%" }}
        severity="info"
        style={{
          backgroundColor: currentThemeMode === "dark" ? "#e65100" : "#0288d1",
        }}
      >
        {t("home_translation_info")}
      </Alert>
    </Box>
  );
};
