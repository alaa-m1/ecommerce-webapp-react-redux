import { Box, Grid, Typography, useTheme, Button } from "@mui/material";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { useSearchParams } from "react-router-dom";
import { ColoredDevider, LinkButton } from "shared";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import {
  signInWithGooglePopup,
  createUserDocFromAuth,
  signInWithGoogleRedirect,
  auth,
  signInWithFacebookPopup,
} from "utils/firebase";
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import { useTranslation } from "react-i18next";

const AuthDashboard = () => {
  const {t}=useTranslation();
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
    <Box className="central-box">
      <Box>{searchQuery === "signup" ? <SignUp /> : <SignIn />}</Box>

      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "0px 10px",
            marginBottom: "10px",
          }}
        >
          <Box
            sx={{
              width: "30%",
              backgroundColor: "#ccc",
              height: "2px",
              margin: "7px 5px",
            }}
          />
          <Box
            component="span"
            sx={{ width: "30%", color: "#ccc", fontWeight: "bold" }}
          >
            Or continue with
          </Box>
          <Box
            sx={{
              width: "30%",
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
            xs={6}
            md={3}
            sx={{ button: { textTransform: "unset !important" } }}
          >
            <Button
              startIcon={<GoogleIcon sx={{ color: "#4285f4" }} />}
              sx={{ color: "#4285f4" }}
              onClick={() => signIn("google")}
            >
              Google
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            md={3}
            sx={{ button: { textTransform: "unset !important" } }}
          >
            <Button
              startIcon={<GoogleIcon sx={{ color: "#4285f4" }} />}
              sx={{ color: "#4285f4" }}
              onClick={signInWithGoogleRedirect}
            >
              Google redirect
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            md={3}
            sx={{ button: { textTransform: "unset !important" } }}
          >
            <Button
              startIcon={<FacebookIcon sx={{ color: "#4285f4" }} />}
              sx={{ color: "#1877f2" }}
              onClick={() => signIn("facebook")}
            >
              Facebook
            </Button>
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
          <LinkButton label={t('auth.signin')}/>
        </Box>
      ) : (
        <Box sx={{ "button:hover": { backgroundColor: "transparent" } }}>
          <Typography
            variant="caption"
            color={theme.palette.text.secondary}
            fontSize={18}
          >
            If you do not have an account &nbsp;
          </Typography>
          <LinkButton query="signup" label={t('auth.signup')}/>
        </Box>
      )}
    </Box>
  );
};

export default AuthDashboard;
