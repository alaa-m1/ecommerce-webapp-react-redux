import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Box, TextField, IconButton, useTheme } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import StopIcon from "@mui/icons-material/Stop";

interface ChatInputProps {
  onSend: (message: string) => void;
  onStop: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  onStop,
  isLoading,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isLoading && !disabled) {
      inputRef.current?.focus();
    }
  }, [isLoading, disabled]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isSendDisabled = !value.trim() || isLoading || disabled;

  return (
    <Box
      sx={{
        px: { xs: 1, sm: 2 },
        py: 1.5,
        borderTop: `1px solid ${
          theme.palette.mode === "dark" ? "#333" : "#e0e0e0"
        }`,
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.background.paper
            : "#fff",
        display: "flex",
        alignItems: "flex-end",
        gap: 1,
      }}
    >
      <TextField
        inputRef={inputRef}
        fullWidth
        multiline
        minRows={1}
        maxRows={4}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading || disabled}
        placeholder={t("ai_chat_page.placeholder")}
        variant="outlined"
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.02)",
            "& fieldset": {
              borderColor:
                theme.palette.mode === "dark" ? "#444" : "#e0e0e0",
            },
            "&:hover fieldset": {
              borderColor:
                theme.palette.mode === "dark" ? "#666" : "#bbb",
            },
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.primary.main,
            },
            "&.Mui-disabled": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.02)"
                  : "rgba(0,0,0,0.01)",
            },
          },
        }}
      />

      {isLoading ? (
        <IconButton
          onClick={onStop}
          color="error"
          aria-label={t("ai_chat_page.stop")}
          sx={{
            borderRadius: 3,
            px: 1.5,
            py: 1,
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(244,67,54,0.15)"
                : "rgba(244,67,54,0.08)",
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(244,67,54,0.25)"
                  : "rgba(244,67,54,0.15)",
            },
          }}
        >
          <StopIcon />
        </IconButton>
      ) : (
        <IconButton
          onClick={handleSend}
          disabled={isSendDisabled}
          color="primary"
          aria-label={t("ai_chat_page.send")}
          sx={{
            borderRadius: 3,
            px: 1.5,
            py: 1,
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(144,202,249,0.15)"
                : "rgba(25,118,210,0.08)",
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(144,202,249,0.25)"
                  : "rgba(25,118,210,0.15)",
            },
            "&.Mui-disabled": {
              backgroundColor: "transparent",
            },
          }}
        >
          <SendIcon />
        </IconButton>
      )}
    </Box>
  );
};
