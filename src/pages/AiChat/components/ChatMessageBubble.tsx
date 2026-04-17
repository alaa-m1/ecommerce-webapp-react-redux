import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography, IconButton, Tooltip, Avatar, useTheme } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import parse from "html-react-parser";
import { ChatMessage } from "../types";

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const markdownToHtml = (text: string): string => {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/```[\w]*\n?([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/^[-*] (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>")
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n(?!<)/g, "<br/>");
};

export const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ message }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const isUser = message.role === "user";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const userBubbleBg =
    theme.palette.mode === "dark"
      ? theme.palette.primary.dark
      : theme.palette.primary.main;

  const assistantBubbleBg =
    theme.palette.mode === "dark" ? "#2a2a2a" : "#f0f0f0";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-start",
        gap: 1.5,
        mb: 2,
        px: 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Avatar
        sx={{
          width: 32,
          height: 32,
          flexShrink: 0,
          bgcolor: isUser
            ? theme.palette.primary.main
            : theme.palette.mode === "dark"
            ? "#444"
            : "#e0e0e0",
          color: isUser
            ? "#fff"
            : theme.palette.mode === "dark"
            ? "#90caf9"
            : theme.palette.secondary.main,
        }}
      >
        {isUser ? (
          <PersonIcon sx={{ fontSize: 18 }} />
        ) : (
          <SmartToyIcon sx={{ fontSize: 18 }} />
        )}
      </Avatar>

      <Box
        sx={{
          maxWidth: "75%",
          display: "flex",
          flexDirection: "column",
          alignItems: isUser ? "flex-end" : "flex-start",
          gap: 0.5,
          position: "relative",
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1.5,
            borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
            backgroundColor: isUser ? userBubbleBg : assistantBubbleBg,
            color: isUser
              ? "#fff"
              : theme.palette.text.primary,
            boxShadow: theme.shadows[1],
            wordBreak: "break-word",
            "& pre": {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1a1a1a" : "#e8e8e8",
              borderRadius: 1,
              p: 1.5,
              overflowX: "auto",
              fontSize: "0.85rem",
              my: 1,
            },
            "& code": {
              fontFamily: "monospace",
              fontSize: "0.85rem",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.08)",
              px: 0.5,
              borderRadius: 0.5,
            },
            "& pre code": {
              backgroundColor: "transparent",
              px: 0,
            },
            "& h1, & h2, & h3": {
              mt: 1,
              mb: 0.5,
            },
            "& ul": {
              pl: 2,
              my: 0.5,
            },
          }}
        >
          {isUser ? (
            <Typography
              variant="body2"
              sx={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}
            >
              {message.content}
            </Typography>
          ) : (
            <Typography
              variant="body2"
              component="div"
              sx={{ lineHeight: 1.6 }}
            >
              {parse(markdownToHtml(message.content))}
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            flexDirection: isUser ? "row-reverse" : "row",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: "0.7rem",
            }}
          >
            {formatTimestamp(message.timestamp)}
          </Typography>

          {!isUser && (
            <Tooltip
              title={copied ? t("ai_chat_page.copied") : t("ai_chat_page.copy")}
              placement="top"
            >
              <IconButton
                size="small"
                onClick={handleCopy}
                sx={{
                  opacity: hovered || copied ? 1 : 0,
                  transition: "opacity 0.2s",
                  p: 0.5,
                  color: copied
                    ? theme.palette.success.main
                    : theme.palette.text.secondary,
                }}
              >
                {copied ? (
                  <CheckIcon sx={{ fontSize: 14 }} />
                ) : (
                  <ContentCopyIcon sx={{ fontSize: 14 }} />
                )}
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
    </Box>
  );
};
