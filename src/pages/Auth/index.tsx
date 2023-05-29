import { Box, Grid, Typography, useTheme, Button } from "@mui/material";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { useSearchParams } from "react-router-dom";
import { ColoredDevider, LinkButton } from "shared/components";
import GoogleIcon from "@mui/icons-material/Google";
import {
  signInWithGooglePopup,
  createUserDocFromAuth,
  signInWithGoogleRedirect,
  auth,
} from "utils/firebase";
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("p");
  const theme = useTheme();
  useEffect(() => {
    const signInAfterRedirect = async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        const userDataRef=createUserDocFromAuth(response.user);
      }
    };
    signInAfterRedirect();
  }, []);
  const signIn = async (provider: string) => {
    if (provider === "google") {
      const response = await signInWithGooglePopup();
      const userDataRef=createUserDocFromAuth(response.user);
    }
  };
  return (
    <Box className="central-box">
      <Box>{searchQuery === "signup" ? <SignUp /> : <SignIn />}</Box>
      {searchQuery !== "forgetpassword" && (
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
            {/* {(providers || []).map((provider, index) => {
          if (provider.id !== "credentials")
            return (
              <SocialButton
                key={provider.id}
                provider={provider}
                page={p}
                csrfToken={csrfToken}
                index={index}
              ></SocialButton>
            );
          else return;
        })} */}
          </Grid>
        </>
      )}
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
          <LinkButton label="SIGN In" />
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
          <LinkButton query="signup" label="SIGN UP" />
        </Box>
      )}
    </Box>
  );
};

export default Auth;
