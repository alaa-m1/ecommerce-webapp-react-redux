import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "utils/redux/hooks";
import { initializeChatFromStorage } from "store/aiChat/aiChatThunks";
import { setError } from "store/aiChat/aiChatSlice";
import {
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  Alert,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ClearIcon from "@mui/icons-material/Clear";
import { ChatSidebar } from "./components/ChatSidebar";
import { ChatMessageList } from "./components/ChatMessageList";
import { ChatInput } from "./components/ChatInput";
import { ModelSelector } from "./components/ModelSelector";
import { ErrorBanner } from "./components/ErrorBanner";
import { useChatHistory } from "./hooks/useChatHistory";
import { useChat } from "./hooks/useChat";
import { useAppSelector } from "utils/redux/hooks";
import { selectActiveMessages, selectError } from "store/aiChat/aiChatSelectors";

export const AiChatPage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showNetworkBanner, setShowNetworkBanner] = useState(false);
  const currentDocDirection = useAppSelector((state) => state.user.direction);

  const {
    conversations,
    activeConversation,
    createNewChat,
    switchChat,
    deleteChat,
    deleteAllChats,
  } = useChatHistory();

  const messages = useAppSelector(selectActiveMessages);
  const error = useAppSelector(selectError);

  const { sendMessage, stopGeneration, isLoading, retryLastMessage } = useChat();

  const handleClearChat = () => {
    if (activeConversation) {
      deleteChat(activeConversation.id);
    }
  };

  const handlePromptClick = (prompt: string) => {
    if (!activeConversation) {
      createNewChat();
    }
    sendMessage(prompt);
  };

  useEffect(() => {
    dispatch(initializeChatFromStorage());
  }, [dispatch]);

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  // Network online/offline detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowNetworkBanner(true);
      setTimeout(() => setShowNetworkBanner(false), 5000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowNetworkBanner(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+N / Cmd+Shift+N to start new chat
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "n") {
        e.preventDefault();
        createNewChat();
      }

      // Escape to stop generation
      if (e.key === "Escape" && isLoading) {
        e.preventDefault();
        stopGeneration();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLoading, createNewChat, stopGeneration]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const sidebarWidth = 280;

  const sidebarContent = (
    <Box
      sx={{
        width: sidebarWidth,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#f5f5f5",
        borderRight: `1px solid ${
          theme.palette.mode === "dark" ? "#333" : "#e0e0e0"
        }`,
      }}
    >
      <ChatSidebar
        conversations={conversations}
        activeConversationId={activeConversation?.id || null}
        onNewChat={createNewChat}
        onSelectChat={switchChat}
        onDeleteChat={deleteChat}
        onDeleteAll={deleteAllChats}
      />
    </Box>
  );

  const mainContent = (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          p: { xs: 1, sm: 2 },
          borderBottom: `1px solid ${
            theme.palette.mode === "dark" ? "#333" : "#e0e0e0"
          }`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: theme.palette.mode === "dark"
            ? `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`
            : `linear-gradient(180deg, #fff 0%, #f8f9fa 100%)`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {isMobile && (
            <IconButton onClick={toggleSidebar} size="small">
              <MenuIcon />
            </IconButton>
          )}
          <ModelSelector />
          {activeConversation && messages.length > 0 && (
            <Tooltip title={t("ai_chat_page.clear_chat")}>
              <IconButton
                onClick={handleClearChat}
                size="small"
                aria-label={t("ai_chat_page.clear_chat")}
                sx={{
                  color: theme.palette.text.secondary,
                  "&:hover": {
                    color: theme.palette.error.main,
                  },
                }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {showNetworkBanner && (
          <Alert
            severity={isOnline ? "success" : "warning"}
            sx={{ mx: { xs: 1, sm: 2 }, mt: 2, borderRadius: 1 }}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setShowNetworkBanner(false)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {isOnline
              ? t("ai_chat_page.network_online")
              : t("ai_chat_page.network_offline")}
          </Alert>
        )}
        <ErrorBanner error={error} onClose={() => dispatch(setError(null))} />
        {/* Screen reader live region for loading state */}
        <Box
          id="chat-loading-status"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          sx={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0, 0, 0, 0)" }}
        >
          {isLoading ? t("ai_chat_page.loading") : ""}
        </Box>
        <ChatMessageList messages={messages} onRetry={retryLastMessage} onPromptClick={handlePromptClick} />
        <ChatInput
          onSend={sendMessage}
          onStop={stopGeneration}
          isLoading={isLoading}
          disabled={!activeConversation || !isOnline}
          autoFocusAfterSend={true}
        />
      </Box>
    </Box>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        display: "flex",
        height: "calc(100vh - 120px)",
        width: "100%",
        overflow: "hidden",
        backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#fff",
      }}
    >
      {isMobile ? (
        <Drawer
          anchor="left"
          open={sidebarOpen}
          onClose={toggleSidebar}
          SlideProps={{
            direction: currentDocDirection === "rtl" ? "left" : "right",
          }}
          transitionDuration={{ enter: 300, exit: 250 }}
          sx={{
            "& .MuiDrawer-paper": {
              width: sidebarWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      ) : (
        <motion.div
          initial={false}
          animate={{
            width: sidebarOpen ? sidebarWidth : 0,
            opacity: sidebarOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}
        >
          {sidebarOpen && sidebarContent}
        </motion.div>
      )}

      {mainContent}
    </motion.div>
  );
};

export default AiChatPage;
