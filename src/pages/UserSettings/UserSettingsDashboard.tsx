import { Box, Grid, Typography } from "@mui/material";
import { UserInfo } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "store/user/userActions";
import { UserDetails } from "types";
import { getUserDocFromAuth } from "utils/firebase";
import { mapUserDetails } from "utils/mappingFunctions/mapUserDetails";
import { useAppSelector } from "utils/redux/hooks";

const UserSettingsDashboard = () => {
  const [userInfo, setUserInfo] = useState<UserDetails | null>(null);
  const currentUser = useAppSelector((state) => state.user.currentUser);
  useEffect(() => {
    getUserDocFromAuth(currentUser)
      .then((res) => {
        setUserInfo(mapUserDetails(res));
      })
      .catch((error: any) => console.log(error.message));
  }, [currentUser]);
  return (
    <>
      <h2
        style={{
          textAlign: "center",
          textTransform: "capitalize",
          color: "#00f",
        }}
      >
        User Dashboard
      </h2>

      <Grid container>
        <Grid item xs={12} md={4}>
          <Typography>Name:</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography>{userInfo?.displayName}</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography>Mobile:</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography>{userInfo?.phoneNumber}</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography>Address:</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography>{userInfo?.address}</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography>Email:</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography>{userInfo?.email}</Typography>
        </Grid>
      </Grid>
    </>
  );
};
export default UserSettingsDashboard;
