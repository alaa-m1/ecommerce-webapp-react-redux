import React from "react";
import { Box, Typography } from "@mui/material";
import { ColoredDevider, ExternalLink } from "shared";
import { ProfilePhoto } from "./components";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";

export const AboutPage = () => {
  const { t } = useTranslation();
  return (
    <Box m={2} style={{ direction: "ltr" }}>
      <Box mb={3}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <ProfilePhoto />
        </Box>
        <Typography
          fontSize="18px"
          color="primary.light"
          mb="10px"
          sx={{ "& strong": { color: "primary.light" } }}
        >
          {parse(t("about_information"))}
        </Typography>
        <Typography
          color="secondary.main"
          fontSize="16px"
          fontWeight="bold"
          style={{ textAlign: "center" }}
        >
          Senior Frontend Developer | React - JavaScript - TypeScript - Next.js
          - Test Automation | Software Developer
        </Typography>
      </Box>
      <ColoredDevider />
      <Typography
        fontSize="18px"
        fontWeight="bold"
        color="primary.light"
        style={{ textAlign: "center", marginBottom: "10px" }}
      >
        {t("contact_me")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        <ExternalLink
          url="https://www.linkedin.com/in/alaa-mohammad-767622199/"
          title="LinkedIn"
        />
        <ExternalLink
          url="https://www.xing.com/profile/alaa_mohammad8/cv"
          title="Xing"
        />
        <ExternalLink url="https://github.com/alaa-m1" title="GitHub" />
        <ExternalLink url="https://dev.to/alaa-m1" title="Dev.to" />
      </Box>
    </Box>
  );
};

export default AboutPage;
