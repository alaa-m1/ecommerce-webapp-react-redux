import React from "react";
import { Box, Link, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ColoredDevider } from "shared";
import { Link as RouterDomLink } from "react-router-dom";

const TermsPage = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        margin: "40px auto auto",
        maxWidth: "600px",
        boxShadow: "5px 5px 10px",
        ":hover": { boxShadow: "10px 10px 20px" },
        textAlign: "center",
        paddingBottom: "10px",
        color: "secondary.dark",
      }}
      data-testid="NotFound-div"
    >
      <Typography fontSize="16px" color="primary.light">
        {t("terms")}
      </Typography>
      <Typography color="primary.light">......</Typography>
      <ColoredDevider />
      <Link
        component={RouterDomLink}
        to="/auth?p=signup"
        sx={{ textDecoration: "none", color: "secondary.main" }}
      >
        {t("auth.signup")}
      </Link>
    </Box>
  );
};
export default TermsPage;
