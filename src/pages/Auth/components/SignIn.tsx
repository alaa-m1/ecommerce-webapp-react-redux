import { Box, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";
import { TextField } from "shared";
import { signInAuthenticatedUserWithEmailAndPassword } from "utils/firebase";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const UserSchema = z.object({
  email: z.string().email("You must enter a valid Email"),

  password: z.string(),
});

type UserSchemaType = z.infer<typeof UserSchema>;

const SignIn = () => {
  const { t }=useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    getValues,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserSchemaType>({ resolver: zodResolver(UserSchema) });
  const onSubmit: SubmitHandler<UserSchemaType> = async (formData) => {
    const { email, password } = formData;

    await signInAuthenticatedUserWithEmailAndPassword(email, password)
      .then((response) => {
        reset();
        const redirectTo = location.state?.from;
        navigate(redirectTo);
      })
      .catch((error) => {
        switch ((error as AuthError).code) {
          case AuthErrorCodes.NETWORK_REQUEST_FAILED: //"auth/network-request-failed"
            toast.error("Error in connection, try again");
            break;
          case AuthErrorCodes.INVALID_PASSWORD: //"auth/wrong-password"
            toast.error("The password is not correct");
            break;
          case AuthErrorCodes.USER_MISMATCH: //"auth/user-not-found"
            toast.error("This user (email) doesn't exist");
            break;
          default:
            toast.error(error.code);
            break;
        }
      });
  };
  const { password } = watch();
  return (
    <Box>
      <Typography fontSize="16px" color="primary.light">
        {t('auth.signin')}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "5px 10px" }}>
        <TextField
          name="email"
          label="Email"
          // placeholder="Email"
          icon={<EmailIcon />}
          register={register}
          getValues={getValues}
          errors={errors.email?.message}
          disabled={isSubmitting}
        // autoComplete="off"
        ></TextField>
        <TextField
          name="password"
          label="Password"
          placeholder=""
          icon={<LockIcon />}
          type="password"
          register={register}
          getValues={getValues}
          errors={errors.password?.message}
          disabled={isSubmitting}
          // autoComplete="off"
          defaultValue=""
        ></TextField>
        <LoadingButton
          loading={isSubmitting}
          loadingIndicator={<ScaleLoader color="#36d7b7" />}
          variant="outlined"
          type="submit"
          sx={{ width: "50%", margin: "0px auto" }}
        >
          {t('auth.signin')}
        </LoadingButton>
      </form>
    </Box>
  );
};

export default SignIn;
