import React from "react";
import { TabPanelProps } from "../types";
import { Box, Typography } from "@mui/material";

export const PrivilegesSettings = ({
  value,
  index,
  ...props
}: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`privileges-settings-tabpanel-${index}`}
      aria-labelledby={`privileges-settings-tab-${index}`}
      {...props}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>
            Privileges
            <div>User settings... under construction</div>
          </Typography>
        </Box>
      )}
    </div>
  );
};
