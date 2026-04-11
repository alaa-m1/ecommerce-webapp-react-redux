import React from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { ChatConversation } from "../types";

interface ChatSidebarProps {
  conversations: ChatConversation[];
  activeConversationId: string | null;
  onNewChat: () => void;
  onSelectChat: (conversationId: string) => void;
  onDeleteChat: (conversationId: string) => void;
  onDeleteAll: () => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  conversations,
  activeConversationId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onDeleteAll,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<AddIcon />}
          onClick={onNewChat}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            py: 1.2,
          }}
        >
          {t("ai_chat_page.new_chat")}
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: "auto", py: 1 }}>
        {conversations.length === 0 ? (
          <Box
            sx={{
              p: 3,
              textAlign: "center",
              color: theme.palette.text.secondary,
            }}
          >
            <Typography variant="body2">
              {t("ai_chat_page.no_history")}
            </Typography>
          </Box>
        ) : (
          <List disablePadding>
            {conversations.map((conversation) => (
              <ListItem
                key={conversation.id}
                disablePadding
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label={t("ai_chat_page.delete_chat")}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteChat(conversation.id);
                    }}
                    size="small"
                    sx={{
                      opacity: 0.6,
                      "&:hover": {
                        opacity: 1,
                        color: theme.palette.error.main,
                      },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                }
                sx={{
                  mb: 0.5,
                  px: 1,
                }}
              >
                <ListItemButton
                  selected={conversation.id === activeConversationId}
                  onClick={() => onSelectChat(conversation.id)}
                  sx={{
                    borderRadius: 1,
                    py: 1.5,
                    px: 2,
                    "&.Mui-selected": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(144, 202, 249, 0.16)"
                          : "rgba(25, 118, 210, 0.12)",
                      "&:hover": {
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "rgba(144, 202, 249, 0.24)"
                            : "rgba(25, 118, 210, 0.18)",
                      },
                    },
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.08)"
                          : "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  <ListItemText
                    primary={conversation.title}
                    secondary={formatDate(conversation.updatedAt)}
                    primaryTypographyProps={{
                      noWrap: true,
                      fontSize: "0.9rem",
                      fontWeight:
                        conversation.id === activeConversationId ? 600 : 400,
                    }}
                    secondaryTypographyProps={{
                      fontSize: "0.75rem",
                      noWrap: true,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {conversations.length > 0 && (
        <Box
          sx={{
            p: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Button
            variant="outlined"
            fullWidth
            startIcon={<DeleteSweepIcon />}
            onClick={onDeleteAll}
            color="error"
            sx={{
              textTransform: "none",
              py: 1,
            }}
          >
            {t("ai_chat_page.delete_all")}
          </Button>
        </Box>
      )}
    </Box>
  );
};
