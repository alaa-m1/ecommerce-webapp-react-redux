import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_SELECTED_MODEL } from "pages/AiChat/constants";
import { ChatConversation, ChatMessage, ChatState } from "pages/AiChat/types";
import { initializeChatFromStorage } from "./aiChatThunks";

const initialState: ChatState = {
  conversations: [],
  activeConversationId: null,
  isLoading: false,
  error: null,
  selectedModel: DEFAULT_SELECTED_MODEL,
};

type SetActiveConversationPayload = string | null;

type AddConversationPayload = ChatConversation;

type DeleteConversationPayload = string;

type AddMessagePayload = {
  conversationId: string;
  message: ChatMessage;
};

type UpdateLastAssistantMessagePayload = {
  conversationId: string;
  content: string;
};

type SetLoadingPayload = boolean;

type SetErrorPayload = string | null;

type SetSelectedModelPayload = string;

const aiChatSlice = createSlice({
  name: "aiChat",
  initialState,
  reducers: {
    setActiveConversation: (
      state,
      action: PayloadAction<SetActiveConversationPayload>
    ) => {
      state.activeConversationId = action.payload;
    },

    addConversation: (state, action: PayloadAction<AddConversationPayload>) => {
      state.conversations.unshift(action.payload);
      state.activeConversationId = action.payload.id;
    },

    deleteConversation: (
      state,
      action: PayloadAction<DeleteConversationPayload>
    ) => {
      const id = action.payload;
      state.conversations = state.conversations.filter((c) => c.id !== id);

      if (state.activeConversationId === id) {
        state.activeConversationId = state.conversations[0]?.id ?? null;
      }
    },

    clearConversations: (state) => {
      state.conversations = [];
      state.activeConversationId = null;
    },

    addMessage: (state, action: PayloadAction<AddMessagePayload>) => {
      const { conversationId, message } = action.payload;
      const conversation = state.conversations.find((c) => c.id === conversationId);
      if (!conversation) return;

      conversation.messages.push(message);
      conversation.updatedAt = Date.now();
    },

    updateLastAssistantMessage: (
      state,
      action: PayloadAction<UpdateLastAssistantMessagePayload>
    ) => {
      const { conversationId, content } = action.payload;
      const conversation = state.conversations.find((c) => c.id === conversationId);
      if (!conversation) return;

      for (let i = conversation.messages.length - 1; i >= 0; i -= 1) {
        const msg = conversation.messages[i];
        if (msg.role === "assistant") {
          msg.content = content;
          conversation.updatedAt = Date.now();
          return;
        }
      }
    },

    setLoading: (state, action: PayloadAction<SetLoadingPayload>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<SetErrorPayload>) => {
      state.error = action.payload;
    },

    setSelectedModel: (state, action: PayloadAction<SetSelectedModelPayload>) => {
      state.selectedModel = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeChatFromStorage.fulfilled, (state, action) => {
      state.conversations = action.payload;
      if (action.payload.length > 0 && !state.activeConversationId) {
        state.activeConversationId = action.payload[0].id;
      }
    });
  },
});

export const {
  setActiveConversation,
  addConversation,
  deleteConversation,
  clearConversations,
  addMessage,
  updateLastAssistantMessage,
  setLoading,
  setError,
  setSelectedModel,
} = aiChatSlice.actions;

export const aiChatReducer = aiChatSlice.reducer;
