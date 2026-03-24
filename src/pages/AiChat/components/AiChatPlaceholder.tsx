import React from "react";
import { Box, Typography } from "@mui/material";

type AiChatPlaceholderProps = {
  title: string;
};

export const AiChatPlaceholder = ({ title }: AiChatPlaceholderProps) => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" color="secondary.main">
        {title}
      </Typography>
    </Box>
  );
};
