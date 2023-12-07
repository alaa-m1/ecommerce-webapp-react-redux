import React from "react";
import { Box, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

export const NoItemsFound=()=>{
    const { t }=useTranslation();
return (
    <Box className="no-items-panel" data-testid="NoItemsFound-div">
    <Typography color="primary.light">{t("search.no_items")}</Typography>
  </Box>
)
}