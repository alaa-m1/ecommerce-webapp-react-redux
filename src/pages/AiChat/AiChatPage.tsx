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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
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
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.background.paper
              : "#fff",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {isMobile && (
            <IconButton onClick={toggleSidebar} size="small">
              <MenuIcon />
            </IconButton>
          )}
          <ModelSelector />
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
        <ChatMessageList messages={messages} onRetry={retryLastMessage} />
        <ChatInput
          onSend={sendMessage}
          onStop={stopGeneration}
          isLoading={isLoading}
          disabled={!activeConversation}
        />
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
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
        sidebarOpen && sidebarContent
      )}

      {mainContent}
    </Box>
  );
};

export default AiChatPage;
