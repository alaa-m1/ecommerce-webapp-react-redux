import React from "react";
import { TabPanelProps } from "../types";
import { Box, Typography } from "@mui/material";
import { PDFUploader } from "../../PDFUploader/PDFUploader";
import { UserPhotosManager } from "../../PhotosUploader/UserPhotosManager";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

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
          <PDFUploader/>
          <br />
          <UserPhotosManager />
          < CustomGoogleMap/>
        </Box>
      )}
    </div>
  );
};


const CustomGoogleMap = () => {
  const position = { lat: 50.363226, lng: 7.603016 };

  return (
    <APIProvider apiKey={"AIzaSyARdttg1CmCBdTPymQoml2rquYOcXJ0otY"}>
      <Map
        style={{ width: "90vw", height: "600px" }}
        defaultCenter={position}
        defaultZoom={14}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        <Marker position={position} />
      </Map>
    </APIProvider>
  );
};
