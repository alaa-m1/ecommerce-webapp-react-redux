import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "shared";

type AdminLogoProps = {
  imgSrc: string | undefined;
  name: string | undefined;
  verticalAlignment?: boolean;
  isLoading: boolean;
};
export const AdminLogo = ({
  imgSrc,
  name,
  verticalAlignment = false,
  isLoading,
}: AdminLogoProps) => {
  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "4px",
        flexDirection: verticalAlignment ? "column" : "row",
        width: "100%",
        justifyContent: verticalAlignment ? "center" : "end",
        overflow: "hidden",
      }}
    >
      <Box sx={{ placeSelf: "center", overflow: "hidden", maxWidth: "200px" }}>
        <Typography
          sx={{ textWrap: "nowrap", placeSelf: "center" }}
        >
          <Link style={{color: "#00a"}} to={`/user-dashboard`}>
            {name}
          </Link>
        </Typography>
      </Box>
      <img
        style={{
          borderRadius: "50%",
          width: verticalAlignment ? "50px" : "40px",
          height: verticalAlignment ? "50px" : "40px",
          placeSelf: "center",
        }}
        src={imgSrc || "/images/user-icon.png"}
        alt={`${name || "user"}`}
      />
    </Box>
  );
};
