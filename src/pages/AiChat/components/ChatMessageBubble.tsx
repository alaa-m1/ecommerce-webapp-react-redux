import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import parse from "html-react-parser";
import { ChatMessage } from "../types";

interface ChatMessageBubbleProps {
  message: ChatMessage;
  isStreaming?: boolean;
}

const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatMarkdown = (content: string): string => {
  let formatted = content;

  // Code blocks (```code```)
  formatted = formatted.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    '<pre style="background-color: rgba(0,0,0,0.1); padding: 12px; border-radius: 8px; overflow-x: auto; font-family: monospace; font-size: 0.875rem; margin: 8px 0;"><code>$2</code></pre>'
  );

  // Inline code (`code`)
  formatted = formatted.replace(
    /`([^`]+)`/g,
    '<code style="background-color: rgba(0,0,0,0.1); padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 0.875rem;">$1</code>'
  );

  // Bold (**text**)
  formatted = formatted.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  // Italic (*text*)
  formatted = formatted.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  // Line breaks
  formatted = formatted.replace(/\n/g, "<br/>");

  return formatted;
};

export const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({
  message,
  isStreaming = false,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isUser = message.role === "user";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  const userBgColor =
    theme.palette.mode === "dark"
      ? theme.palette.primary.dark
      : theme.palette.primary.main;

  const assistantBgColor =
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.08)"
      : "rgba(0, 0, 0, 0.04)";

  const userTextColor = theme.palette.primary.contrastText;
  const assistantTextColor = theme.palette.text.primary;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-start",
        gap: 1.5,
        mb: 2,
        px: { xs: 1, sm: 2 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Avatar
        sx={{
          width: 36,
          height: 36,
          bgcolor: isUser ? theme.palette.primary.main : theme.palette.grey[500],
          flexShrink: 0,
        }}
      >
        {isUser ? (
          <PersonIcon fontSize="small" />
        ) : (
          <SmartToyIcon fontSize="small" />
        )}
      </Avatar>

      <Box
        sx={{
          maxWidth: { xs: "85%", sm: "75%", md: "70%" },
          display: "flex",
          flexDirection: "column",
          alignItems: isUser ? "flex-end" : "flex-start",
        }}
      >
        <Box
          sx={{
            position: "relative",
            backgroundColor: isUser ? userBgColor : assistantBgColor,
            color: isUser ? userTextColor : assistantTextColor,
            borderRadius: isUser
              ? "18px 18px 4px 18px"
              : "18px 18px 18px 4px",
            px: 2,
            py: 1.5,
            wordBreak: "break-word",
            "& pre": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(0, 0, 0, 0.3)"
                  : "rgba(0, 0, 0, 0.08)",
            },
            "& code": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(0, 0, 0, 0.3)"
                  : "rgba(0, 0, 0, 0.08)",
            },
          }}
        >
          <Typography
            component="div"
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              "& br": {
                display: "block",
                content: '""',
                marginTop: "0.25em",
              },
            }}
          >
            {isUser ? message.content : parse(formatMarkdown(message.content))}
            {isStreaming && (
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  width: "8px",
                  height: "16px",
                  backgroundColor: assistantTextColor,
                  ml: 0.5,
                  animation: "blink 1s step-end infinite",
                  "@keyframes blink": {
                    "0%, 100%": { opacity: 1 },
                    "50%": { opacity: 0 },
                  },
                }}
              />
            )}
          </Typography>

          {!isUser && isHovered && !isStreaming && (
            <Box
              sx={{
                position: "absolute",
                top: 4,
                right: 4,
              }}
            >
              <Tooltip
                title={copied ? t("ai_chat_page.copied") : t("ai_chat_page.copy")}
                placement="top"
              >
                <IconButton
                  size="small"
                  onClick={handleCopy}
                  sx={{
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.08)",
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.2)"
                          : "rgba(0, 0, 0, 0.12)",
                    },
                  }}
                >
                  <ContentCopyIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>

        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.secondary,
            mt: 0.5,
            px: 1,
            fontSize: "0.7rem",
          }}
        >
          {formatTimestamp(message.timestamp)}
        </Typography>
      </Box>
    </Box>
  );
};
