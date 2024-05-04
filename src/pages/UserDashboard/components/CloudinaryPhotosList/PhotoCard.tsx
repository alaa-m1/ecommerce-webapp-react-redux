import { Box } from "@mui/material";
import React, { useTransition } from "react";

export const PhotoCard = ({
  secure_url,
  onDeletePhoto,
}: {
  secure_url: string;
  onDeletePhoto: any;
}) => {
  console.log("secure_ur=", secure_url);
  const [isPending, startTransition]=useTransition()
  return (
    <Box>
      <img src={secure_url} style={{height:"200px", aspectRatio:"auto"}} />
      <button onClick={() => startTransition(onDeletePhoto)} disabled={isPending}>{isPending?"loading":"delete"}</button>
    </Box>
  );
};
