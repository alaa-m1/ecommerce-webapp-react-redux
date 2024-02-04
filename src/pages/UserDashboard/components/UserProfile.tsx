import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { LoadingSpinner } from "shared";
import { UserDetails } from "types";

type UserProfileProps = { userInfo: UserDetails | null };

export const UserProfile = ({ userInfo }: UserProfileProps) => {
  return !userInfo ? (
    <LoadingSpinner floatingOver />
  ) : (
    <Box sx={{ width: "100%", padding: "10px" }}>
      <Typography
        sx={{
          textAlign: "center",
          textTransform: "capitalize",
          color: "primary.light",
          fontSize: "larger",
          marginBottom: "20px",
        }}
      >
        User Profile
      </Typography>

      <Grid container>
        <Grid item xs={12} md={3}>
          <Typography sx={{ color: "primary.light" }}>Name:</Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography sx={{ color: "secondary.main" }}>
            {userInfo?.displayName}
          </Typography>
        </Grid>
        <br />
        <Grid item xs={12} md={3}>
          <Typography sx={{ color: "primary.light" }}>Mobile:</Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography sx={{ color: "secondary.main" }}>
            {userInfo?.phoneNumber}
          </Typography>
        </Grid>
        <br />
        <Grid item xs={12} md={3}>
          <Typography sx={{ color: "primary.light" }}>Address:</Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography sx={{ color: "secondary.main" }}>
            {userInfo?.address}
          </Typography>
        </Grid>
        <br />
        <Grid item xs={12} md={3}>
          <Typography sx={{ color: "primary.light" }}>Email:</Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography sx={{ color: "secondary.main" }}>
            {userInfo?.email}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
