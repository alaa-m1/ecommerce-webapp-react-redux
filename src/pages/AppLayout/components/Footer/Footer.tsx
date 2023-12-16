import React from "react";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";

export const Footer = () => {
  return (
    <Grid
      container
      className="footer-section"
      sx={{ backgroundColor: "secondary.light" }}
    >
      <Grid item sm={6} xs={12}>
        <Link to={"/"}>
          <Typography color="primary.main">E-commerce</Typography>
        </Link>
      </Grid>
      <Grid item sm={6} xs={12} sx={{ display: "flex" }}>
        <EmailIcon sx={{ "& path": { color: "primary.main" } }} />

        <a href="mailto:alaa85a@gmail.com">
          <Typography color="primary.main" style={{ textOverflow: "ellipsis" }}>
            alaa85a@gmail.com
          </Typography>
        </a>
      </Grid>
    </Grid>
  );
};
