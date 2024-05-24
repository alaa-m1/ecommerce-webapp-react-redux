import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";

export const Footer = () => {
  const date = new Date();
  const copyrights = `©${date.getFullYear()} Phoenix E-commerce`;
  return (
    <Grid
      container
      className="footer-section"
      sx={{ backgroundColor: "secondary.light" }}
      alignItems="center"
      style={{ direction: "ltr" }}
    >
      <Grid item sm={6} xs={12} textAlign="center">
        <Link to={"/"}>
          <Typography color="primary.main">{copyrights}</Typography>
        </Link>
      </Grid>
      <Grid
        item
        sm={6}
        xs={12}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box sx={{ display: "flex" }}>
          <EmailIcon sx={{ "& path": { color: "primary.main" } }} />

          <a href="mailto:alaa85a@gmail.com">
            <Typography
              color="primary.main"
              style={{ textOverflow: "ellipsis" }}
            >
              alaa85a@gmail.com
            </Typography>
          </a>
        </Box>
      </Grid>
    </Grid>
  );
};
