import { Middleware } from "@reduxjs/toolkit";
import { saveConversations } from "pages/AiChat/utils/chatStorage";
import { RootState } from "../store";

export const aiChatMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type?.startsWith("aiChat/")) {
    const mutatingActions = [
      "aiChat/addConversation",
      "aiChat/deleteConversation",
      "aiChat/clearConversations",
      "aiChat/addMessage",
      "aiChat/updateLastAssistantMessage",
    ];

    if (mutatingActions.some((type) => action.type === type)) {
      const state = store.getState();
      saveConversations(state.aiChat.conversations);
    }
  }

  return result;
};
