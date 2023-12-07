import React from "react";
import { Box } from "@mui/material";
import { GridLoader } from "react-spinners";

const LoadingSpinner = ({ floatingOver, size=20 }: { floatingOver?: boolean, size?: number }) => {
  const floatingOverStyle: React.CSSProperties = floatingOver
    ? {
        position: "fixed",
        left: "50vw",
        top: "50vh",
        transform: "translate(-50%,-50%)",
      }
    : {};
  return (
    <Box
      sx={{
        ...floatingOverStyle,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <GridLoader color="rgba(54, 126, 214, 1)" size={size} />
    </Box>
  );
};

export { LoadingSpinner };
