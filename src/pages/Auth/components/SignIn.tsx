import { Box, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";
import { TextField, LinkButton } from "shared/components";
import { signInAuthenticatedUserWithEmailAndPassword } from "utils/firebase";

const UserSchema = z.object({
  email: z.string().email("You must enter a valid Email"),

  password: z.string(),
});

type UserSchemaType = z.infer<typeof UserSchema>;

const SignIn = () => {
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
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/network-request-failed":
            toast.error("Error in connection, try again");
            break;
          case "auth/wrong-password":
            toast.error("The password is not correct");
            break;
          case "auth/user-not-found":
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
      <Typography variant="h4" color="primary">
        Sign In
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
          variant="contained"
          color="primary"
          type="submit"
          sx={{ width: "50%", margin: "0px auto" }}
        >
          Sign In
        </LoadingButton>
      </form>
      <Box
        sx={{
          a: { textDecoration: "none" },
        }}
      >
        <LinkButton query="forgetpassword" label="Forget your password" />
      </Box>
    </Box>
  );
};

export default SignIn;
