import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  setLoading,
  setError,
  updateLastAssistantMessage,
} from "store/aiChat/aiChatSlice";
import {
  selectActiveConversationId,
  selectActiveMessages,
  selectIsLoading,
  selectError,
  selectSelectedModel,
} from "store/aiChat/aiChatSelectors";
import { sendMessageStream } from "../services/llmService";
import { LLM_PROVIDERS } from "../constants";
import { ChatMessage } from "../types";

export const useChat = () => {
  const dispatch = useDispatch();
  const activeConversationId = useSelector(selectActiveConversationId);
  const messages = useSelector(selectActiveMessages);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const selectedModelId = useSelector(selectSelectedModel);

  const abortControllerRef = useRef<AbortController | null>(null);
  const lastUserMessageRef = useRef<ChatMessage | null>(null);

  const sendMessage = useCallback(
    async (userMessage: string) => {
      if (!activeConversationId) {
        dispatch(setError("No active conversation"));
        return;
      }

      if (!userMessage.trim()) {
        dispatch(setError("Message cannot be empty"));
        return;
      }

      const provider = LLM_PROVIDERS.find((p) => p.id === selectedModelId);
      if (!provider) {
        dispatch(setError("Invalid model selected"));
        return;
      }

      dispatch(setError(null));
      dispatch(setLoading(true));

      const userMsg: ChatMessage = {
        id: `${Date.now()}-user`,
        role: "user",
        content: userMessage.trim(),
        timestamp: Date.now(),
      };

      lastUserMessageRef.current = userMsg;

      dispatch(
        addMessage({
          conversationId: activeConversationId,
          message: userMsg,
        })
      );

      const assistantMsg: ChatMessage = {
        id: `${Date.now()}-assistant`,
        role: "assistant",
        content: "",
        timestamp: Date.now(),
      };

      dispatch(
        addMessage({
          conversationId: activeConversationId,
          message: assistantMsg,
        })
      );

      abortControllerRef.current = new AbortController();

      try {
        const conversationMessages = [...messages, userMsg];

        let accumulatedContent = "";

        await sendMessageStream(
          provider,
          conversationMessages,
          (chunk: string) => {
            accumulatedContent += chunk;
            dispatch(
              updateLastAssistantMessage({
                conversationId: activeConversationId,
                content: accumulatedContent,
              })
            );
          },
          abortControllerRef.current.signal
        );

        if (accumulatedContent.trim() === "") {
          dispatch(setError("Received empty response from the AI model"));
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unexpected error occurred";
        dispatch(setError(errorMessage));

        dispatch(
          updateLastAssistantMessage({
            conversationId: activeConversationId,
            content: `Error: ${errorMessage}`,
          })
        );
      } finally {
        dispatch(setLoading(false));
        abortControllerRef.current = null;
      }
    },
    [activeConversationId, messages, selectedModelId, dispatch]
  );

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      dispatch(setLoading(false));
      dispatch(setError("Generation stopped by user"));
    }
  }, [dispatch]);

  const retryLastMessage = useCallback(() => {
    if (lastUserMessageRef.current) {
      sendMessage(lastUserMessageRef.current.content);
    }
  }, [sendMessage]);

  return {
    sendMessage,
    stopGeneration,
    isLoading,
    error,
    retryLastMessage,
  };
};
