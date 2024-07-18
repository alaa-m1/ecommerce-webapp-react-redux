import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import { QueryErrorResetBoundary } from "react-query";

export const ReactQueryErrorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary, error }) => (
          <FallbackBox
            // errorMessage="The service is not available now !!"
            errorMessage={error.message}
            onClick={() => resetErrorBoundary()}
          />
        )}
      >
        {children}
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
);

export const FallbackBox = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  errorMessage,
  onClick,
}: {
  errorMessage: string;
  onClick: () => void;
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "absolute",
        width: "600px",
        height: "400px",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
        margin: "0px 0px 100px 100px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        boxShadow: "4px 4px 10px #ccc",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "5px",
      }}
    >
      <img
        src="/images/system-error.png"
        alt="System error logo"
        style={{ width: "auto", height: "250px" }}
      />
      <Typography
        variant="h5"
        sx={{ mb: 1, textAlign: "center", fontSize:"16px" }}
        color={theme.palette.error.main}
      >
        {/* {errorMessage} */}
        {t("requests.request_error_message")}
      </Typography>
      <Button onClick={onClick}>Try again</Button>
    </Box>
  );
};
