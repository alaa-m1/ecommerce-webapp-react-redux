import React from "react";
import { Grid } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export const CategoriesListSkeleton = () => {
  return (
    <div>
      <Skeleton style={{ height: "50px", margin: "10px 0px 20px" }} />
      <Skeleton style={{ height: "25px" }} />
      <Grid container sx={{ m: "0px 0px 10px" }}>
        <Grid
          item
          xs={6}
          sm={3}
          sx={{ width: "300px", height: "350px", p: "5px" }}
        >
          <Skeleton style={{ width: "100%", height: "100%" }} />
        </Grid>
        <Grid
          item
          xs={6}
          sm={3}
          sx={{ width: "300px", height: "350px", p: "5px" }}
        >
          <Skeleton style={{ width: "100%", height: "100%" }} />
        </Grid>
        <Grid
          item
          xs={6}
          sm={3}
          sx={{ width: "300px", height: "350px", p: "5px" }}
        >
          <Skeleton style={{ width: "100%", height: "100%" }} />
        </Grid>
        <Grid
          item
          xs={6}
          sm={3}
          sx={{ width: "300px", height: "350px", p: "5px" }}
        >
          <Skeleton style={{ width: "100%", height: "100%" }} />
        </Grid>
      </Grid>
      <Skeleton style={{ height: "25px" }} />
      <Grid container sx={{ m: "0px 0px 10px" }}>
        <Grid
          item
          xs={6}
          sm={3}
          sx={{ width: "300px", height: "350px", p: "5px" }}
        >
          <Skeleton style={{ width: "100%", height: "100%" }} />
        </Grid>
        <Grid
          item
          xs={6}
          sm={3}
          sx={{ width: "300px", height: "350px", p: "5px" }}
        >
          <Skeleton style={{ width: "100%", height: "100%" }} />
        </Grid>
        <Grid
          item
          xs={6}
          sm={3}
          sx={{ width: "300px", height: "350px", p: "5px" }}
        >
          <Skeleton style={{ width: "100%", height: "100%" }} />
        </Grid>
        <Grid
          item
          xs={6}
          sm={3}
          sx={{ width: "300px", height: "350px", p: "5px" }}
        >
          <Skeleton style={{ width: "100%", height: "100%" }} />
        </Grid>
      </Grid>
    </div>
  );
};
