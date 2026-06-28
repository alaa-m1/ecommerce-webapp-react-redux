import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography, Button, useTheme, Grid } from "@mui/material";
import { motion } from "framer-motion";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import CodeIcon from "@mui/icons-material/Code";
import TranslateIcon from "@mui/icons-material/Translate";
import SummarizeIcon from "@mui/icons-material/Summarize";

type AiChatPlaceholderProps = {
  title: string;
  onPromptClick?: (prompt: string) => void;
};

export const AiChatPlaceholder = ({ title, onPromptClick }: AiChatPlaceholderProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const prompts = [
    {
      key: "prompt_explain",
      icon: <LightbulbIcon />,
      text: t("ai_chat_page.prompt_explain"),
    },
    {
      key: "prompt_code",
      icon: <CodeIcon />,
      text: t("ai_chat_page.prompt_code"),
    },
    {
      key: "prompt_translate",
      icon: <TranslateIcon />,
      text: t("ai_chat_page.prompt_translate"),
    },
    {
      key: "prompt_summarize",
      icon: <SummarizeIcon />,
      text: t("ai_chat_page.prompt_summarize"),
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        p: 3,
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h4"
          color="secondary.main"
          sx={{ mb: 1, fontWeight: 600 }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          {t("ai_chat_page.welcome_subtitle")}
        </Typography>
      </motion.div>

      <Box sx={{ maxWidth: 600, width: "100%" }}>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ mb: 2, fontWeight: 500 }}
        >
          {t("ai_chat_page.suggested_prompts")}
        </Typography>
        <Grid container spacing={2}>
          {prompts.map((prompt, index) => (
            <Grid item xs={12} sm={6} key={prompt.key}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => onPromptClick?.(prompt.text)}
                  startIcon={prompt.icon}
                  sx={{
                    textTransform: "none",
                    py: 1.5,
                    justifyContent: "flex-start",
                    borderColor:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.2)"
                        : "rgba(0,0,0,0.1)",
                    color: theme.palette.text.primary,
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(144,202,249,0.08)"
                          : "rgba(25,118,210,0.04)",
                    },
                  }}
                >
                  {prompt.text}
                </Button>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
