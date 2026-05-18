import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography, IconButton, Alert, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ErrorBannerProps {
  error: string | null;
  onClose: () => void;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ error, onClose }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  if (!error) return null;

  // Check for specific error types to provide better messages
  let displayError = error;
  let severity: "error" | "warning" | "info" = "error";

  if (error.includes("429") || error.toLowerCase().includes("rate limit")) {
    displayError = t("ai_chat_page.rate_limit_error");
    severity = "warning";
  } else if (error.toLowerCase().includes("network") || error.toLowerCase().includes("fetch") || error.toLowerCase().includes("offline") || error.toLowerCase().includes("internet")) {
    displayError = t("ai_chat_page.network_error");
    severity = "warning";
  } else if (error.toLowerCase().includes("empty") || error.toLowerCase().includes("empty response")) {
    displayError = t("ai_chat_page.empty_response_error");
  } else if (error.toLowerCase().includes("stopped by user")) {
    displayError = t("ai_chat_page.stopped_by_user");
    severity = "info";
  } else if (error.toLowerCase().includes("authentication") || error.toLowerCase().includes("api key")) {
    displayError = error; // Show the original error for auth issues
  }

  return (
    <Alert
      severity={severity}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={onClose}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
      sx={{
        mx: { xs: 1, sm: 2 },
        mt: 2,
        borderRadius: 1,
        "& .MuiAlert-message": {
          typography: "body2",
        },
      }}
    >
      {displayError}
    </Alert>
  );
};
