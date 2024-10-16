import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { StyledButton } from "shared";
import { useTranslation } from "react-i18next";
import { Box, BoxProps, styled, Typography } from "@mui/material";
import { useAppSelector } from "utils/redux/hooks";
import { ThemeMode } from "store/user/userReducer";

const CookiesConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const { t } = useTranslation();
  const themeMode = useAppSelector((state) => state.user.themeMode);
  // Check if consent has already been given
  useEffect(() => {
    const consentGiven = Cookies.get("cookieConsent");
    if (!consentGiven) {
      setShowConsent(true); // Show consent panel if no consent yet
    }
  }, []);

  // Handle accepting cookies
  const handleAccept = () => {
    Cookies.set("cookieConsent", "true", { expires: 365 }); // Set cookie for 1 year
    setShowConsent(false);
  };

  // Handle declining cookies
  const handleDecline = () => {
    Cookies.set("cookieConsent", "false", { expires: 365 }); // Set cookie for 1 year
    setShowConsent(false);
  };

  // If consent has been given, don't show the panel
  if (!showConsent) {
    return null;
  }

  return (
    <StyledPanel themeMode={themeMode}>
      <Typography>{t("utils.cookies_consent_msg")}</Typography>
      <StyledButton onClick={handleAccept} sx={{ mx: 1 }}>
        {t("utils.accept")}
      </StyledButton>
      <StyledButton onClick={handleDecline} sx={{ mx: 1 }}>
        {t("utils.decline")}
      </StyledButton>
    </StyledPanel>
  );
};

const StyledPanel = styled(Box, {
  shouldForwardProp: (prop) => prop !== "themeMode",
})<BoxProps & { themeMode: ThemeMode }>(({ theme, themeMode }) => ({
  position: "fixed",
  bottom: "0px",
  width: "100%",
  backgroundColor: themeMode === "light" ? "#f1f1f1" : "#3a2d6e",
  padding: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
  zIndex: "1003",
}));

export default CookiesConsent;
