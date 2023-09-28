import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
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
      <Typography
        sx={{
          textAlign: "center",
          textTransform: "capitalize",
          color:"primary.light",
          fontSize:"larger",
          marginBottom: "20px"
        }}
      >
        User Dashboard
      </Typography>

      <Grid container>
        <Grid item xs={12} md={3}>
          <Typography sx={{color:"primary.light"}}>Name:</Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography sx={{color:"secondary.main"}}>{userInfo?.displayName}</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography sx={{color:"primary.light"}}>Mobile:</Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography sx={{color:"secondary.main"}}>{userInfo?.phoneNumber}</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography sx={{color:"primary.light"}}>Address:</Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography sx={{color:"secondary.main"}}>{userInfo?.address}</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography sx={{color:"primary.light"}}>Email:</Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography sx={{color:"secondary.main"}}>{userInfo?.email}</Typography>
        </Grid>
      </Grid>
    </>
  );
};
export default UserSettingsDashboard;
