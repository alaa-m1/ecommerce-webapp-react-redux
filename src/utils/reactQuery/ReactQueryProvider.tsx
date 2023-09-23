import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClientProvider, QueryErrorResetBoundary } from "react-query";
import { queryClient } from "./queryClient";
import { ReactQueryDevtools } from "react-query/devtools";

export const ReactQueryProvider = ({
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
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
);

export const FallbackBox = ({
  errorMessage,
  onClick,
}: {
  errorMessage: string;
  onClick: () => void;
}) => {
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
      <Typography
        variant="h5"
        sx={{ mb: 1, textAlign: "center" }}
        color={theme.palette.error.main}
      >
        {errorMessage}
      </Typography>
      <Button onClick={onClick}>Try again</Button>
    </Box>
  );
};
