import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadConversations } from "pages/AiChat/utils/chatStorage";
import { ChatConversation } from "pages/AiChat/types";

export const initializeChatFromStorage = createAsyncThunk<ChatConversation[]>(
  "aiChat/initializeFromStorage",
  async () => {
    const conversations = loadConversations();
    return conversations;
  }
);
