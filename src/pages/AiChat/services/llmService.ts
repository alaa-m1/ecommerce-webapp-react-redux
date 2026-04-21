import axios, { AxiosError } from "axios";
import { LLMProvider, ChatMessage } from "../types";

const API_TIMEOUT = 60000;

interface HuggingFaceRequest {
  inputs: string;
  parameters?: {
    max_new_tokens?: number;
    temperature?: number;
    top_p?: number;
    return_full_text?: boolean;
  };
}

interface OpenAICompatibleRequest {
  model: string;
  messages: Array<{
    role: string;
    content: string;
  }>;
  temperature?: number;
  max_tokens?: number;
}

interface CohereRequest {
  message: string;
  model: string;
  chat_history?: Array<{
    role: string;
    message: string;
  }>;
  temperature?: number;
}

const formatMessagesForProvider = (
  provider: LLMProvider,
  messages: ChatMessage[]
): string | OpenAICompatibleRequest | CohereRequest => {
  switch (provider.id) {
    case "huggingface": {
      const conversationText = messages
        .map((msg) => {
          const role = msg.role === "user" ? "User" : "Assistant";
          return `${role}: ${msg.content}`;
        })
        .join("\n");
      return conversationText + "\nAssistant:";
    }

    case "openrouter":
    case "groq": {
      return {
        model: provider.modelName,
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        temperature: 0.7,
        max_tokens: 1024,
      };
    }

    case "cohere": {
      const lastMessage = messages[messages.length - 1];
      const chatHistory = messages.slice(0, -1).map((msg) => ({
        role: msg.role === "user" ? "USER" : "CHATBOT",
        message: msg.content,
      }));

      return {
        message: lastMessage.content,
        model: provider.modelName,
        chat_history: chatHistory.length > 0 ? chatHistory : undefined,
        temperature: 0.7,
      };
    }

    default:
      throw new Error(`Unsupported provider: ${provider.id}`);
  }
};

const extractResponseText = (
  provider: LLMProvider,
  responseData: any
): string => {
  switch (provider.id) {
    case "huggingface": {
      if (Array.isArray(responseData) && responseData.length > 0) {
        return responseData[0].generated_text || "";
      }
      if (responseData.generated_text) {
        return responseData.generated_text;
      }
      throw new Error("Invalid response format from Hugging Face");
    }

    case "openrouter":
    case "groq": {
      if (
        responseData.choices &&
        responseData.choices.length > 0 &&
        responseData.choices[0].message
      ) {
        return responseData.choices[0].message.content || "";
      }
      throw new Error("Invalid response format from OpenAI-compatible API");
    }

    case "cohere": {
      if (responseData.text) {
        return responseData.text;
      }
      throw new Error("Invalid response format from Cohere");
    }

    default:
      throw new Error(`Unsupported provider: ${provider.id}`);
  }
};

const getApiKey = (provider: LLMProvider): string | null => {
  const storageKey = `llm_api_key_${provider.id}`;
  return localStorage.getItem(storageKey);
};

export const sendMessage = async (
  provider: LLMProvider,
  messages: ChatMessage[]
): Promise<string> => {
  try {
    const requestData = formatMessagesForProvider(provider, messages);
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (provider.requiresKey) {
      const apiKey = getApiKey(provider);
      if (!apiKey) {
        throw new Error(
          `API key required for ${provider.name}. Please set your API key in settings.`
        );
      }

      switch (provider.id) {
        case "huggingface":
          headers["Authorization"] = `Bearer ${apiKey}`;
          break;
        case "openrouter":
          headers["Authorization"] = `Bearer ${apiKey}`;
          headers["HTTP-Referer"] = window.location.origin;
          headers["X-Title"] = "E-commerce AI Chat";
          break;
        case "groq":
          headers["Authorization"] = `Bearer ${apiKey}`;
          break;
        case "cohere":
          headers["Authorization"] = `Bearer ${apiKey}`;
          break;
      }
    }

    let url = provider.apiUrl;
    if (provider.id === "huggingface") {
      url = `${provider.apiUrl}/${provider.modelName}`;
    }

    const response = await axios.post(url, requestData, {
      headers,
      timeout: API_TIMEOUT,
    });

    const responseText = extractResponseText(provider, response.data);

    if (!responseText || responseText.trim() === "") {
      throw new Error("Received empty response from the AI model");
    }

    return responseText.trim();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        const status = axiosError.response.status;
        const data = axiosError.response.data as any;

        if (status === 401 || status === 403) {
          throw new Error(
            `Authentication failed for ${provider.name}. Please check your API key.`
          );
        }

        if (status === 429) {
          throw new Error(
            `Rate limit exceeded for ${provider.name}. Please try again later.`
          );
        }

        if (status === 503) {
          throw new Error(
            `${provider.name} service is currently unavailable. Please try again later.`
          );
        }

        const errorMessage =
          data?.error?.message || data?.message || data?.error || "Unknown error";
        throw new Error(`${provider.name} error: ${errorMessage}`);
      }

      if (axiosError.request) {
        throw new Error(
          `Network error: Unable to reach ${provider.name}. Please check your internet connection.`
        );
      }
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("An unexpected error occurred while sending the message");
  }
};

export const setApiKey = (providerId: string, apiKey: string): void => {
  const storageKey = `llm_api_key_${providerId}`;
  if (apiKey && apiKey.trim() !== "") {
    localStorage.setItem(storageKey, apiKey.trim());
  } else {
    localStorage.removeItem(storageKey);
  }
};

export const hasApiKey = (providerId: string): boolean => {
  const storageKey = `llm_api_key_${providerId}`;
  const key = localStorage.getItem(storageKey);
  return key !== null && key.trim() !== "";
};

const supportsStreaming = (provider: LLMProvider): boolean => {
  return ["openrouter", "groq", "cohere"].includes(provider.id);
};

const parseStreamChunk = (
  provider: LLMProvider,
  chunk: string
): string | null => {
  try {
    if (chunk.startsWith("data: ")) {
      const jsonStr = chunk.slice(6).trim();
      
      if (jsonStr === "[DONE]") {
        return null;
      }

      const data = JSON.parse(jsonStr);

      switch (provider.id) {
        case "openrouter":
        case "groq": {
          if (
            data.choices &&
            data.choices.length > 0 &&
            data.choices[0].delta?.content
          ) {
            return data.choices[0].delta.content;
          }
          return null;
        }

        case "cohere": {
          if (data.text) {
            return data.text;
          }
          if (data.event_type === "text-generation") {
            return data.text || "";
          }
          return null;
        }

        default:
          return null;
      }
    }
    return null;
  } catch (error) {
    console.error("Error parsing stream chunk:", error);
    return null;
  }
};

export const sendMessageStream = async (
  provider: LLMProvider,
  messages: ChatMessage[],
  onChunk: (text: string) => void,
  abortSignal?: AbortSignal
): Promise<void> => {
  if (!supportsStreaming(provider)) {
    const response = await sendMessage(provider, messages);
    onChunk(response);
    return;
  }

  try {
    const requestData = formatMessagesForProvider(provider, messages);
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    };

    if (provider.requiresKey) {
      const apiKey = getApiKey(provider);
      if (!apiKey) {
        throw new Error(
          `API key required for ${provider.name}. Please set your API key in settings.`
        );
      }

      switch (provider.id) {
        case "openrouter":
          headers["Authorization"] = `Bearer ${apiKey}`;
          headers["HTTP-Referer"] = window.location.origin;
          headers["X-Title"] = "E-commerce AI Chat";
          break;
        case "groq":
          headers["Authorization"] = `Bearer ${apiKey}`;
          break;
        case "cohere":
          headers["Authorization"] = `Bearer ${apiKey}`;
          break;
      }
    }

    let url = provider.apiUrl;
    if (provider.id === "huggingface") {
      url = `${provider.apiUrl}/${provider.modelName}`;
    }

    const requestBody =
      typeof requestData === "string"
        ? { inputs: requestData }
        : { ...requestData, stream: true };

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
      signal: abortSignal,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const status = response.status;

      if (status === 401 || status === 403) {
        throw new Error(
          `Authentication failed for ${provider.name}. Please check your API key.`
        );
      }

      if (status === 429) {
        throw new Error(
          `Rate limit exceeded for ${provider.name}. Please try again later.`
        );
      }

      if (status === 503) {
        throw new Error(
          `${provider.name} service is currently unavailable. Please try again later.`
        );
      }

      const errorMessage =
        (errorData as any)?.error?.message ||
        (errorData as any)?.message ||
        (errorData as any)?.error ||
        "Unknown error";
      throw new Error(`${provider.name} error: ${errorMessage}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Response body is not readable");
    }

    const decoder = new TextDecoder();
    let buffer = "";

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine === "" || trimmedLine === "data: [DONE]") {
          continue;
        }

        const content = parseStreamChunk(provider, trimmedLine);
        if (content) {
          onChunk(content);
        }
      }
    }

    if (buffer.trim()) {
      const content = parseStreamChunk(provider, buffer.trim());
      if (content) {
        onChunk(content);
      }
    }
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request was cancelled");
    }

    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        `Network error: Unable to reach ${provider.name}. Please check your internet connection.`
      );
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("An unexpected error occurred while streaming the message");
  }
};
