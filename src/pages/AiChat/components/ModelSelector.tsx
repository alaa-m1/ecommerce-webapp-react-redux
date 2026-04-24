import React from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "utils/redux/hooks";
import { Box, Select, MenuItem, FormControl, InputLabel, useTheme } from "@mui/material";
import { setSelectedModel } from "store/aiChat/aiChatSlice";
import { selectSelectedModel } from "store/aiChat/aiChatSelectors";
import { LLM_PROVIDERS } from "../constants";

export const ModelSelector: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const selectedModel = useAppSelector(selectSelectedModel);

  const handleChange = (event: any) => {
    dispatch(setSelectedModel(event.target.value));
  };

  return (
    <FormControl
      size="small"
      sx={{
        minWidth: 200,
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.05)"
              : "rgba(0,0,0,0.02)",
          "& fieldset": {
            borderColor:
              theme.palette.mode === "dark" ? "#444" : "#e0e0e0",
          },
          "&:hover fieldset": {
            borderColor:
              theme.palette.mode === "dark" ? "#666" : "#bbb",
          },
          "&.Mui-focused fieldset": {
            borderColor: theme.palette.primary.main,
          },
        },
      }}
    >
      <InputLabel id="model-select-label">
        {t("ai_chat_page.select_model")}
      </InputLabel>
      <Select
        labelId="model-select-label"
        value={selectedModel}
        onChange={handleChange}
        label={t("ai_chat_page.select_model")}
      >
        {LLM_PROVIDERS.map((provider) => (
          <MenuItem key={provider.id} value={provider.id}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ fontWeight: 500 }}>{provider.name}</Box>
              <Box sx={{ fontSize: "0.8rem", opacity: 0.7 }}>
                {provider.modelName}
              </Box>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
