import { Box } from "@mui/material";
import { GridLoader } from "react-spinners";

const FullScreenSpinner = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(90, 90, 90, 0.5)",
        zIndex: "9999",
      }}
    >
      <Box
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
        }}
      >
        <GridLoader color="rgba(54, 126, 214, 1)" size={20} />
      </Box>
    </Box>
  );
};

export { FullScreenSpinner };
