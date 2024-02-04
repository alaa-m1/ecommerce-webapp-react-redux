import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";


const UserDashboardPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        flexGrow: "1",
        display: "flex",
        height:"100%",
        flexDirection: isSmallScreen ? "column" : "row",
      }}
    >
    </Box>
  );
};
export default UserDashboardPage;
