import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography, useTheme } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage } from "../types";
import { ChatMessageBubble } from "./ChatMessageBubble";

interface ChatMessageListProps {
  messages: ChatMessage[];
  onRetry?: () => void;
}

const messageVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages, onRetry }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Also scroll when the last message's content changes during streaming
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === "assistant" && lastMessage.isStreaming) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          p: 4,
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Box
            sx={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: theme.palette.mode === "dark"
                ? `linear-gradient(135deg, rgba(144, 202, 249, 0.2) 0%, rgba(144, 202, 249, 0.05) 100%)`
                : `linear-gradient(135deg, rgba(25, 118, 210, 0.15) 0%, rgba(25, 118, 210, 0.05) 100%)`,
              boxShadow: theme.palette.mode === "dark"
                ? "0 8px 32px rgba(144, 202, 249, 0.15)"
                : "0 8px 32px rgba(25, 118, 210, 0.1)",
              mb: 1,
            }}
          >
            <SmartToyIcon
              sx={{
                fontSize: 48,
                color: theme.palette.primary.main,
              }}
            />
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
              mb: 1,
              letterSpacing: -0.5,
            }}
          >
            {t("ai_chat_page.welcome_message")}
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        >
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: 400,
              lineHeight: 1.6,
            }}
          >
            {t("ai_chat_page.welcome_subtitle")}
          </Typography>
        </motion.div>
      </Box>
    );
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        flexGrow: 1,
        overflowY: "auto",
        py: 2,
        px: { xs: 1, sm: 2 },
        display: "flex",
        flexDirection: "column",
        "&::-webkit-scrollbar": {
          width: 6,
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.15)"
              : "rgba(0,0,0,0.15)",
          borderRadius: 3,
        },
      }}
      role="log"
      aria-live="polite"
      aria-atomic="false"
    >
      {/* Screen reader announcement for new messages */}
      {messages.length > 0 && (
        <Box
          sx={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0, 0, 0, 0)" }}
          role="status"
          aria-live="polite"
        >
          {messages[messages.length - 1].role === "assistant" 
            ? `New ${messages[messages.length - 1].role} message: ${messages[messages.length - 1].content.substring(0, 100)}`
            : ""}
        </Box>
      )}
      <AnimatePresence initial={false}>
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
          >
            <ChatMessageBubble
              message={message}
              onRetry={onRetry}
              isLastMessage={index === messages.length - 1}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      <div ref={bottomRef} />
    </Box>
  );
};
