# AI Chat Page - Implementation Plan (30 Steps)

> **Instructions:** Each step represents one commit/session of work.
> When asked "Do the next step which is mentioned in the TODO file", find the first step that is NOT marked as ✅, implement it, then mark it as ✅ with the completion date.

---

## Phase 1: Foundation & Setup (Steps 1–6)

### Step 1 — Create the base ChatPage component and folder structure
- [x] Create `src/pages/AiChat/` directory ✅ (2026-03-24)
- [x] Create `AiChatPage.tsx` with a minimal placeholder component ✅ (2026-03-24)
- [x] Create `src/pages/AiChat/components/` directory for sub-components ✅ (2026-03-24)
- [x] Export the page component as a default export (same pattern as `AboutPage`) ✅ (2026-03-24)

### Step 2 — Register the route and add lazy loading
- [x] Add a lazy import for `AiChatPage` in `src/routes/index.tsx` ✅ (2026-03-27)
- [x] Add a new `<Route path="ai-chat" ...>` wrapped in `<SuspensedPageView>` ✅ (2026-03-27)
- [x] Verify the page renders at `/ai-chat` ✅ (2026-03-29)

### Step 3 — Add the navigation link to the main navigator
- [x] Add a new entry in `src/shared/constants/linksDetails.tsx` for the AI Chat page (with a suitable MUI icon, e.g. `SmartToyIcon`) ✅ (2026-03-28)
- [x] The link label key should be `"ai_chat"` ✅ (2026-03-28)
- [x] The link should appear in both the desktop MenuBar and the mobile Drawer ✅ (2026-03-28)

### Step 4 — Add translation keys for all three languages (EN, AR, DE)
- [x] Add a new `"ai_chat"` top-level key in `public/locales/en/translation.json`, `ar/translation.json`, and `de/translation.json` for the nav label ✅ (2026-03-28)
- [x] Add a new `"ai_chat_page"` nested object in all three translation files containing keys: `title`, `subtitle`, `placeholder`, `send`, `stop`, `clear_chat`, `new_chat`, `select_model`, `chat_history`, `no_history`, `delete_chat`, `delete_all`, `confirm_delete`, `cancel`, `loading`, `error_message`, `copy`, `copied`, `retry`, `welcome_message`, `welcome_subtitle` ✅ (2026-03-28)
- [x] Provide proper translations for Arabic and German ✅ (2026-03-28)

### Step 5 — Define TypeScript types for the chat feature
- [x] Create `src/pages/AiChat/types.ts` ✅ (2026-03-28)
- [x] Define types: `ChatMessage` (role: 'user' | 'assistant', content: string, timestamp: number, id: string) ✅ (2026-03-28)
- [x] Define `ChatConversation` (id: string, title: string, messages: ChatMessage[], createdAt: number, updatedAt: number, model: string) ✅ (2026-03-28)
- [x] Define `LLMProvider` (id: string, name: string, apiUrl: string, modelName: string, requiresKey: boolean) ✅ (2026-03-28)
- [x] Define `ChatState` (conversations: ChatConversation[], activeConversationId: string | null, isLoading: boolean, error: string | null, selectedModel: string) ✅ (2026-03-28)

### Step 6 — Create constants for available free LLM APIs
- [x] Create `src/pages/AiChat/constants.ts` ✅ (2026-03-28)
- [x] Define the list of free LLM providers (e.g., HuggingFace Inference API free tier, free OpenRouter models, Cohere free tier, etc.) ✅ (2026-03-28)
- [x] Each provider entry must include: id, display name, API endpoint URL, model identifier, and whether an API key is needed ✅ (2026-03-28)
- [x] Export the default selected model constant ✅ (2026-03-28)

---

## Phase 2: State Management & LocalStorage (Steps 7–10)

### Step 7 — Create localStorage utility for chat persistence
- [x] Create `src/pages/AiChat/utils/chatStorage.ts` ✅ (2026-03-29)
- [x] Implement `saveConversations(conversations: ChatConversation[]): void` ✅ (2026-03-29)
- [x] Implement `loadConversations(): ChatConversation[]` ✅ (2026-03-29)
- [x] Implement `deleteConversation(id: string): ChatConversation[]` ✅ (2026-03-29)
- [x] Implement `clearAllConversations(): void` ✅ (2026-03-29)
- [x] Use a namespaced localStorage key (e.g., `ai_chat_conversations`) ✅ (2026-03-29)

### Step 8 — Create a Redux slice for chat state
- [x] Create `src/store/aiChat/` directory ✅ (2026-03-30)
- [x] Create `aiChatSlice.ts` using `createSlice` from Redux Toolkit ✅ (2026-03-30)
- [x] Define initial state matching the `ChatState` type ✅ (2026-03-30)
- [x] Add reducers: `setActiveConversation`, `addConversation`, `deleteConversation`, `clearConversations`, `addMessage`, `updateLastAssistantMessage`, `setLoading`, `setError`, `setSelectedModel` ✅ (2026-03-30)
- [x] Register the slice in `src/store/rootReducer.ts` and `src/store/store.ts` ✅ (2026-03-30)

### Step 9 — Create Redux selectors for the chat state
- [x] Create `src/store/aiChat/aiChatSelectors.ts` ✅ (2026-03-30)
- [x] Implement selectors: `selectConversations`, `selectActiveConversation`, `selectActiveMessages`, `selectIsLoading`, `selectError`, `selectSelectedModel` ✅ (2026-03-30)
- [x] Use `reselect` for memoised selectors (consistent with existing patterns) ✅ (2026-03-30)

### Step 10 — Sync Redux state with localStorage
- [x] Create `src/store/aiChat/aiChatMiddleware.ts` (or use a thunk) ✅ (2026-04-04)
- [x] On app load, hydrate Redux chat state from localStorage ✅ (2026-04-04)
- [x] After every conversation mutation (add/delete/update), persist to localStorage ✅ (2026-04-04)
- [x] Export an `initializeChatFromStorage` thunk that is dispatched in `AiChatPage` on mount ✅ (2026-04-04)

---

## Phase 3: API Integration (Steps 11–14)

### Step 11 — Create the base API service for LLM calls
- [x] Create `src/pages/AiChat/services/llmService.ts` ✅ (2026-04-05)
- [x] Implement an `sendMessage(provider: LLMProvider, messages: ChatMessage[]): Promise<string>` function using `axios` ✅ (2026-04-05)
- [x] Handle the request/response format for each provider ✅ (2026-04-05)
- [x] Include proper error handling and timeout configuration ✅ (2026-04-05)

### Step 12 — Implement streaming support for word-by-word response rendering
- [x] Extend `llmService.ts` with a `sendMessageStream(provider: LLMProvider, messages: ChatMessage[], onChunk: (text: string) => void): Promise<void>` function ✅ (2026-04-06)
- [x] Use `fetch` with `ReadableStream` for SSE/streaming responses ✅ (2026-04-06)
- [x] Fall back to the non-streaming `sendMessage` for providers that don't support streaming ✅ (2026-04-06)
- [x] The `onChunk` callback will dispatch `updateLastAssistantMessage` to Redux for real-time UI updates ✅ (2026-04-06)

### Step 13 — Create a custom hook `useChat` for chat logic
- [x] Create `src/pages/AiChat/hooks/useChat.ts` ✅ (2026-04-08)
- [x] Encapsulate: sending a message, receiving streamed response, error handling, retry logic, and stop/abort functionality ✅ (2026-04-08)
- [x] Use an `AbortController` to allow the user to stop a pending request ✅ (2026-04-08)
- [x] Return: `sendMessage`, `stopGeneration`, `isLoading`, `error`, `retryLastMessage` ✅ (2026-04-08)

### Step 14 — Create a custom hook `useChatHistory` for conversation management
- [x] Create `src/pages/AiChat/hooks/useChatHistory.ts` ✅ (2026-04-09)
- [x] Encapsulate: creating a new conversation, switching active conversation, deleting a conversation, deleting all conversations ✅ (2026-04-09)
- [x] Auto-generate conversation title from the first user message ✅ (2026-04-09)
- [x] Return: `conversations`, `activeConversation`, `createNewChat`, `switchChat`, `deleteChat`, `deleteAllChats` ✅ (2026-04-09)

---

## Phase 4: Core UI Components (Steps 15–21)

### Step 15 — Build the main ChatPage layout
- [x] Update `AiChatPage.tsx` with the full page layout ✅ (2026-04-10)
- [x] Use MUI `Box`, `Paper`, `Grid` components consistent with other pages ✅ (2026-04-10)
- [x] Layout: sidebar (chat history list) on the left, main chat area on the right ✅ (2026-04-10)
- [x] Make the layout responsive (sidebar collapses on small screens into a drawer) ✅ (2026-04-10)
- [x] Apply the project's theme colors and spacing conventions ✅ (2026-04-10)

### Step 16 — Build the ChatSidebar component (conversation history list)
- [x] Create `src/pages/AiChat/components/ChatSidebar.tsx` ✅ (2026-04-11)
- [x] Display list of saved conversations with title and date ✅ (2026-04-11)
- [x] Add a "New Chat" button at the top ✅ (2026-04-11)
- [x] Add a "Delete All" button at the bottom ✅ (2026-04-11)
- [x] Highlight the active conversation ✅ (2026-04-11)
- [x] Each conversation item has a delete icon button ✅ (2026-04-11)
- [x] Use translations for all labels ✅ (2026-04-11)

### Step 17 — Build the ChatMessageBubble component
- [x] Create `src/pages/AiChat/components/ChatMessageBubble.tsx` ✅ (2026-04-12)
- [x] Render user messages aligned to the right with a distinct background color ✅ (2026-04-12)
- [x] Render assistant messages aligned to the left with a different background color ✅ (2026-04-12)
- [x] Display an avatar/icon for each role (user icon, bot/AI icon) ✅ (2026-04-12)
- [x] Show timestamp below each message ✅ (2026-04-12)
- [x] Add a "Copy" button on hover for assistant messages ✅ (2026-04-12)
- [x] Support rendering markdown in assistant responses (use a simple approach or `html-react-parser`) ✅ (2026-04-12)

### Step 18 — Build the ChatMessageList component
- [x] Create `src/pages/AiChat/components/ChatMessageList.tsx` ✅ (2026-04-14)
- [x] Render the list of `ChatMessageBubble` components for the active conversation ✅ (2026-04-14)
- [x] Auto-scroll to the bottom when new messages arrive ✅ (2026-04-14)
- [x] Show a welcome/empty state when there are no messages (with translated welcome text) ✅ (2026-04-14)
- [x] Use `framer-motion` for smooth message entrance animations ✅ (2026-04-14)

### Step 19 — Build the ChatInput component (message input area)
- [ ] Create `src/pages/AiChat/components/ChatInput.tsx`
- [ ] MUI `TextField` (multiline) with a send button (icon button)
- [ ] Support `Enter` to send and `Shift+Enter` for new line
- [ ] Disable the input and show a "Stop" button while the assistant is generating
- [ ] Use the project's existing `MUITextField` or `TextField` component style as reference
- [ ] Use translations for placeholder text

### Step 20 — Build the ModelSelector combobox component
- [ ] Create `src/pages/AiChat/components/ModelSelector.tsx`
- [ ] Use MUI `Select` or `Autocomplete` to list available LLM providers
- [ ] Show provider name and model name in each option
- [ ] Dispatch `setSelectedModel` on change
- [ ] Place it in the chat header area
- [ ] Use translations for the label

### Step 21 — Build the TypingIndicator component (loading animation)
- [ ] Create `src/pages/AiChat/components/TypingIndicator.tsx`
- [ ] Animated three-dot indicator shown while the assistant is generating a response
- [ ] Use `framer-motion` or CSS keyframes for the animation
- [ ] Consistent with the project's `LoadingSpinner` style but smaller and inline

---

## Phase 5: UX Enhancements (Steps 22–25)

### Step 22 — Implement word-by-word (typewriter) rendering of assistant responses
- [ ] In `ChatMessageBubble`, when a message is still streaming (`isStreaming` flag), render the content with a blinking cursor at the end
- [ ] Update the message content in Redux character-by-character or chunk-by-chunk as the stream arrives
- [ ] Ensure smooth scrolling follows the text as it grows
- [ ] Add a subtle fade-in animation for each new chunk

### Step 23 — Add copy-to-clipboard and retry functionality
- [ ] Implement the copy button using `navigator.clipboard.writeText`
- [ ] Show a "Copied!" tooltip/toast using `react-toastify` (already in the project)
- [ ] Add a retry button on the last assistant message if there was an error
- [ ] Add a retry button on failed messages

### Step 24 — Add the confirmation dialog for deleting conversations
- [ ] Use the project's existing `GenericDialog` component
- [ ] Show a confirmation dialog before deleting a single conversation
- [ ] Show a confirmation dialog before deleting all conversations
- [ ] Use translated strings for all dialog text (confirm, cancel, etc.)

### Step 25 — Make the chat page fully responsive
- [ ] On mobile/tablet (`md` breakpoint down): hide sidebar and show a hamburger/drawer toggle
- [ ] Use MUI `Drawer` for the sidebar on small screens (same pattern as `CustomDrawer`)
- [ ] Ensure the chat input sticks to the bottom of the viewport
- [ ] Ensure message bubbles resize gracefully on small screens
- [ ] Test RTL layout for Arabic language

---

## Phase 6: Polish & Advanced Features (Steps 26–29)

### Step 26 — Add error handling and edge-case UX
- [ ] Show an inline error banner when an API call fails (with translated error message)
- [ ] Handle network offline state gracefully
- [ ] Handle empty messages (prevent sending blank prompts)
- [ ] Handle very long messages (add scroll inside message bubble)
- [ ] Add rate-limiting feedback if the free API returns 429

### Step 27 — Add animations and transitions
- [ ] Add `framer-motion` page enter animation for the chat page (consistent with other pages)
- [ ] Add smooth sidebar open/close transitions
- [ ] Add message bubble entrance animations (slide in from bottom)
- [ ] Add hover effects on sidebar conversation items
- [ ] Add smooth loading state transitions

### Step 28 — Add keyboard shortcuts and accessibility
- [ ] `Ctrl+Shift+N` / `Cmd+Shift+N` to start a new chat
- [ ] `Escape` to stop generation
- [ ] Proper ARIA labels on all interactive elements
- [ ] Focus management: auto-focus the input after sending a message
- [ ] Screen reader support for loading states and new messages

### Step 29 — Dark/Light theme support and final styling polish
- [ ] Ensure all chat components respect the project's theme (dark/light via `ThemeSwitch`)
- [ ] Fine-tune colors, shadows, border-radius for message bubbles in both themes
- [ ] Add subtle gradient or accent colors to the chat header
- [ ] Polish the welcome/empty state with an attractive illustration or icon
- [ ] Ensure consistent spacing and typography with the rest of the project

---

## Phase 7: Final Step (Step 30)

### Step 30 — Final integration testing and cleanup
- [ ] Verify the full flow: navigate to AI Chat → select model → send message → see streaming response → copy response → start new chat → switch chats → delete chat
- [ ] Verify localStorage persistence: refresh the page and confirm chats are restored
- [ ] Verify all translations render correctly in EN, AR, and DE
- [ ] Verify responsive layout on mobile, tablet, and desktop
- [ ] Verify dark/light theme switching works correctly on the chat page
- [ ] Remove any console.log statements or debug code
- [ ] Ensure no TypeScript errors or warnings
- [ ] Final code cleanup and review

---

## Progress Tracker

| Step | Status | Date Completed |
|------|--------|----------------|
| 1  | ✅ Done | 2026-03-24 |
| 2  | ✅ Done | 2026-03-29 |
| 3  | ✅ Done | 2026-03-28 |
| 4  | ✅ Done | 2026-03-28 |
| 5  | ✅ Done | 2026-03-28 |
| 6  | ✅ Done | 2026-03-28 |
| 7  | ✅ Done | 2026-03-29 |
| 8  | ✅ Done | 2026-03-30 |
| 9  | ✅ Done | 2026-03-30 |
| 10 | ✅ Done | 2026-04-04 |
| 11 | ✅ Done | 2026-04-05 |
| 12 | ✅ Done | 2026-04-06 |
| 13 | ✅ Done | 2026-04-08 |
| 14 | ✅ Done | 2026-04-09 |
| 15 | ✅ Done | 2026-04-10 |
| 16 | ✅ Done | 2026-04-11 |
| 17 | ✅ Done | 2026-04-12 |
| 18 | ⬜ Not Started | — |
| 19 | ⬜ Not Started | — |
| 20 | ⬜ Not Started | — |
| 21 | ⬜ Not Started | — |
| 22 | ⬜ Not Started | — |
| 23 | ⬜ Not Started | — |
| 24 | ⬜ Not Started | — |
| 25 | ⬜ Not Started | — |
| 26 | ⬜ Not Started | — |
| 27 | ⬜ Not Started | — |
| 28 | ⬜ Not Started | — |
| 29 | ⬜ Not Started | — |
| 30 | ⬜ Not Started | — |
