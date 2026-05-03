export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  id: string;
  isStreaming?: boolean;
};

export type ChatConversation = {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
  model: string;
};

export type LLMProvider = {
  id: string;
  name: string;
  apiUrl: string;
  modelName: string;
  requiresKey: boolean;
};

export type ChatState = {
  conversations: ChatConversation[];
  activeConversationId: string | null;
  isLoading: boolean;
  error: string | null;
  selectedModel: string;
};
