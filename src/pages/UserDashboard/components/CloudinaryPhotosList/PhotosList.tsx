import React from "react";
import { PhotoCard } from "./PhotoCard";
// import { deletePhoto } from "./actions/cloudinaryActions";
import { isArray } from "lodash";
import { Box } from "@mui/material";

export const PhotosList = ({ photos }: { photos: any }) => {
  console.log("photos=", photos);
  const handleDeletePhoto = async (publicId: string) => {
    // await deletePhoto(publicId);
  };
  return (
    <Box sx={{display:"flex", flexWrap:"wrap", gap:1}}>
      {(isArray(photos) ? photos : []).map((photo: any) => (
        <PhotoCard
          key={photo?.public_id}
          secure_url={photo?.secure_url ?? ""}
          onDeletePhoto={() => handleDeletePhoto(photo?.public_id ?? "")}
        />
      ))}
    </Box>
  );
};
