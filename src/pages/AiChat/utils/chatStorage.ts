import { ChatConversation } from "../types";

const STORAGE_KEY = "ai_chat_conversations";

export const saveConversations = (conversations: ChatConversation[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  } catch {
    // ignore
  }
};

export const loadConversations = (): ChatConversation[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed as ChatConversation[];
  } catch {
    return [];
  }
};

export const deleteConversation = (id: string): ChatConversation[] => {
  const conversations = loadConversations();
  const next = conversations.filter((c) => c.id !== id);
  saveConversations(next);
  return next;
};

export const clearAllConversations = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
};
