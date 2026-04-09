import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  selectConversations,
  selectActiveConversation,
  selectSelectedModel,
} from '../../../store/aiChat/aiChatSelectors';
import {
  addConversation,
  setActiveConversation,
  deleteConversation as deleteConversationAction,
  clearConversations,
} from '../../../store/aiChat/aiChatSlice';
import { ChatConversation } from '../types';

export const useChatHistory = () => {
  const dispatch = useDispatch();
  const conversations = useSelector(selectConversations);
  const activeConversation = useSelector(selectActiveConversation);
  const selectedModel = useSelector(selectSelectedModel);

  const generateConversationTitle = useCallback((firstMessage: string): string => {
    const maxLength = 50;
    const trimmed = firstMessage.trim();
    if (trimmed.length <= maxLength) {
      return trimmed;
    }
    return trimmed.substring(0, maxLength) + '...';
  }, []);

  const createNewChat = useCallback(() => {
    const now = Date.now();
    const newConversation: ChatConversation = {
      id: uuidv4(),
      title: 'New Chat',
      messages: [],
      createdAt: now,
      updatedAt: now,
      model: selectedModel,
    };

    dispatch(addConversation(newConversation));
    dispatch(setActiveConversation(newConversation.id));

    return newConversation.id;
  }, [dispatch, selectedModel]);

  const switchChat = useCallback(
    (conversationId: string) => {
      dispatch(setActiveConversation(conversationId));
    },
    [dispatch]
  );

  const deleteChat = useCallback(
    (conversationId: string) => {
      dispatch(deleteConversationAction(conversationId));
    },
    [dispatch]
  );

  const deleteAllChats = useCallback(() => {
    dispatch(clearConversations());
  }, [dispatch]);

  return {
    conversations,
    activeConversation,
    createNewChat,
    switchChat,
    deleteChat,
    deleteAllChats,
    generateConversationTitle,
  };
};
