import { Box, Grid, Typography, useTheme, Button, styled } from "@mui/material";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { useSearchParams } from "react-router-dom";
import { ColoredDevider, LinkButton } from "shared";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import {
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  auth,
  signInWithFacebookPopup,
} from "utils/firebase";
import React, { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import { useTranslation } from "react-i18next";

const AuthPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("p");
  const theme = useTheme();
  useEffect(() => {
    const signInAfterRedirect = async () => {
      await getRedirectResult(auth);
    };
    signInAfterRedirect();
  }, []);
  const signIn = async (provider: string) => {
    if (provider === "google") {
      await signInWithGooglePopup();
    } else if (provider === "facebook") {
      await signInWithFacebookPopup();
    }
  };
  return (
    <Box className="central-box" sx={{ color: "secondary.dark", width:"100%" }}>
      <Box>{searchQuery === "signup" ? <SignUp /> : <SignIn />}</Box>

      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "0px 10px",
            marginBottom: "10px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              backgroundColor: "#ccc",
              height: "2px",
              margin: "7px 5px",
            }}
          />
          <Box
            component="span"
            sx={{ minWidth: "120px", color: "#ccc", fontWeight: "bold" }}
          >
            Or continue with
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              backgroundColor: "#ccc",
              height: "2px",
              margin: "7px 5px",
            }}
          />
        </Box>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          columnSpacing={2}
          rowSpacing={0.5}
        >
          <Grid
            item
            xs={12}
            md={4}
            sx={{ button: { textTransform: "unset !important" } }}
          >
            <AccountsButton
              startIcon={<GoogleIcon />}
              onClick={() => signIn("google")}
            >
              Google
            </AccountsButton>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ button: { textTransform: "unset !important" } }}
          >
            <AccountsButton
              startIcon={<GoogleIcon />}
              onClick={signInWithGoogleRedirect}
            >
              Google redirect
            </AccountsButton>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ button: { textTransform: "unset !important" } }}
          >
            <AccountsButton
              startIcon={<FacebookIcon />}
              onClick={() => signIn("facebook")}
            >
              Facebook
            </AccountsButton>
          </Grid>
        </Grid>
      </>

      <ColoredDevider />
      {searchQuery === "signup" || searchQuery === "forgetpassword" ? (
        <Box sx={{ "button:hover": { backgroundColor: "transparent" } }}>
          <Typography
            variant="caption"
            color={theme.palette.text.secondary}
            fontSize={18}
          >
            If you already have an account &nbsp;
          </Typography>
          <LinkButton
            label={t("auth.signin")}
            sx={{ color: "primary.light", fontSize: "15px" }}
            data-testid="Auth-btn-signin"
          />
        </Box>
      ) : (
        <Box sx={{ "button:hover": { backgroundColor: "transparent" } }}>
          <Typography variant="caption" color={theme.palette.text.secondary}>
            If you do not have an account &nbsp;
          </Typography>
          <LinkButton
            query="signup"
            label={t("auth.signup")}
            sx={{ color: "primary.light", fontSize: "15px" }}
            data-testid="Auth-btn-signup"
          />
        </Box>
      )}
    </Box>
  );
};

const AccountsButton = styled(Button)(({ theme }) => ({
  minWidth: "140px",
  "& svg path": {
    color: theme.palette.primary.light,
  },
}));
export default AuthPage;
