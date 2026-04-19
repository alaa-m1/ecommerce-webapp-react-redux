import React, { useEffect, useState } from "react";
import { useAppDispatch } from "utils/redux/hooks";
import { initializeChatFromStorage } from "store/aiChat/aiChatThunks";
import {
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ChatSidebar } from "./components/ChatSidebar";
import { ChatMessageList } from "./components/ChatMessageList";
import { ChatInput } from "./components/ChatInput";
import { useChatHistory } from "./hooks/useChatHistory";
import { useChat } from "./hooks/useChat";
import { useAppSelector } from "utils/redux/hooks";
import { selectActiveMessages } from "store/aiChat/aiChatSelectors";

export const AiChatPage = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const {
    conversations,
    activeConversation,
    createNewChat,
    switchChat,
    deleteChat,
    deleteAllChats,
  } = useChatHistory();

  const messages = useAppSelector(selectActiveMessages);

  const { sendMessage, stopGeneration, isLoading } = useChat();

  useEffect(() => {
    dispatch(initializeChatFromStorage());
  }, [dispatch]);

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

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
      {isMobile && (
        <Box
          sx={{
            p: 1,
            borderBottom: `1px solid ${
              theme.palette.mode === "dark" ? "#333" : "#e0e0e0"
            }`,
          }}
        >
          <IconButton onClick={toggleSidebar} size="small">
            <MenuIcon />
          </IconButton>
        </Box>
      )}

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <ChatMessageList messages={messages} />
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
