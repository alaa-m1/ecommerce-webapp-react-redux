import React from "react";
import { useTranslation } from "react-i18next";
import { AiChatPlaceholder } from "./components";

export const AiChatPage = () => {
  const { t } = useTranslation();

  return (
    <AiChatPlaceholder title={t("ai_chat_page.title")} />
  );
};

export default AiChatPage;
