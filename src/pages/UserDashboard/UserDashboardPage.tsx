import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { UserDetails } from "types";
import { getUserDocFromAuth } from "utils/firebase";
import { mapUserDetails } from "utils/mappingFunctions/mapUserDetails";
import { useAppSelector } from "utils/redux/hooks";
import { Sidebar, UserProfile, UserSettings } from "./components";
import { useSearchParams } from "react-router-dom";

const UserDashboardPage = () => {
  const [userInfo, setUserInfo] = useState<UserDetails | null>(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(true);
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    getUserDocFromAuth(currentUser)
      .then((res) => {
        setUserInfo(mapUserDetails(res));
      })
      .catch((error: any) => console.log(error.message));
  }, [currentUser]);
  return (
    <Box
      sx={{
        flexGrow: "1",
        display: "flex",
        height: "100%",
        flexDirection: isSmallScreen ? "row" : "column",
      }}
    >
      <Sidebar
        isSmallScreen={isSmallScreen}
        fullWidth={open}
        onCloseSideBar={(v) => setOpen(v)}
        userInfo={userInfo}
      />
      <Box
        sx={{
          overflow: "auto",
          display: "flex",
          minHeight: "300px",
          width: "100%",
          height: "100%",
          borderRadius: "5px",
          background: "#eee",
        }}
      >
        {(!searchParams.get("p") ||
          searchParams.get("p")?.toLocaleLowerCase() === "profile") && (
          <UserProfile userInfo={userInfo} />
        )}
        {searchParams.get("p")?.toLocaleLowerCase() === "settings" && (
          <UserSettings />
        )}
      </Box>
    </Box>
  );
};
export default UserDashboardPage;
