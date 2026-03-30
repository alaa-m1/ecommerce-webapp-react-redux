import { createSelector } from "reselect";
import { RootState } from "store/store";

const selectAiChatReducer = (state: RootState) => state.aiChat;

export const selectConversations = createSelector(
  [selectAiChatReducer],
  (aiChat) => aiChat.conversations
);

export const selectActiveConversationId = createSelector(
  [selectAiChatReducer],
  (aiChat) => aiChat.activeConversationId
);

export const selectActiveConversation = createSelector(
  [selectConversations, selectActiveConversationId],
  (conversations, activeConversationId) =>
    conversations.find((c) => c.id === activeConversationId) ?? null
);

export const selectActiveMessages = createSelector(
  [selectActiveConversation],
  (conversation) => conversation?.messages ?? []
);

export const selectIsLoading = createSelector(
  [selectAiChatReducer],
  (aiChat) => aiChat.isLoading
);

export const selectError = createSelector(
  [selectAiChatReducer],
  (aiChat) => aiChat.error
);

export const selectSelectedModel = createSelector(
  [selectAiChatReducer],
  (aiChat) => aiChat.selectedModel
);
