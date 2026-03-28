import { LLMProvider } from "./types";

export const LLM_PROVIDERS: LLMProvider[] = [
  {
    id: "huggingface",
    name: "Hugging Face Inference API",
    apiUrl: "https://api-inference.huggingface.co/models",
    modelName: "mistralai/Mistral-7B-Instruct-v0.2",
    requiresKey: true,
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    apiUrl: "https://openrouter.ai/api/v1/chat/completions",
    modelName: "mistralai/mistral-7b-instruct",
    requiresKey: true,
  },
  {
    id: "groq",
    name: "Groq",
    apiUrl: "https://api.groq.com/openai/v1/chat/completions",
    modelName: "llama3-8b-8192",
    requiresKey: true,
  },
  {
    id: "cohere",
    name: "Cohere",
    apiUrl: "https://api.cohere.ai/v1/chat",
    modelName: "command-r",
    requiresKey: true,
  },
];

export const DEFAULT_SELECTED_MODEL = LLM_PROVIDERS[0].id;
