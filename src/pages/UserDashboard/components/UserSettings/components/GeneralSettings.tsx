import React from "react";
import { TabPanelProps } from "../types";
import { Box, Typography } from "@mui/material";

export const GeneralSettings = ({ value, index, ...props }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`general-settings-tabpanel-${index}`}
      aria-labelledby={`general-settings-tab-${index}`}
      {...props}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>
            General
            <div>User settings... under construction</div>
          </Typography>
        </Box>
      )}
    </div>
  );
};
