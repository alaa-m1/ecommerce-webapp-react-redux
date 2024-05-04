import React from "react";
import { TabPanelProps } from "../types";
import { Box, Typography } from "@mui/material";
import { PhotosPage } from "../../CloudinaryPhotosList/PhotoPage";
import { PDFViewer } from "../../PDFViewer/PDFViewer";
import { PDFViewer2 } from "../../PDFViewer2/PDFViewer2";

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
            General User settings... under construction
          </Typography>
          <br />
          <PhotosPage/>
          <br />
          <PDFViewer2/>
        </Box>
      )}
    </div>
  );
};
