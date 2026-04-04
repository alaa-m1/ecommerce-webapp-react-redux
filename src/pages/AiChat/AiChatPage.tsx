import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store/store";
import { initializeChatFromStorage } from "store/aiChat/aiChatThunks";
import { AiChatPlaceholder } from "./components";

export const AiChatPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initializeChatFromStorage());
  }, [dispatch]);

  return (
    <AiChatPlaceholder title={t("ai_chat_page.title")} />
  );
};

export default AiChatPage;
