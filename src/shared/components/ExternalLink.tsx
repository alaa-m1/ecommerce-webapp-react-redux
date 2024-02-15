import React from "react";
import { Box, Typography } from "@mui/material";
import _ from "lodash";
import LinkIcon from "@mui/icons-material/Link";

export const ExternalLink = ({
  url,
  title = "",
}: {
  url: string;
  title?: string;
}) => {
  return (
    <Box
      component={"a"}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: "flex",
        textDecoration: "none",
        fontWeight: "bold",
        color: "secondary.main",
        "& span": { color: "secondary.main" },
        "& path": { color: "secondary.main" },
      }}
    >
      <LinkIcon />
      <Typography component="span">
        &nbsp;{_.isEmpty(title) ? url : title}
      </Typography>
      <br />
    </Box>
  );
};
