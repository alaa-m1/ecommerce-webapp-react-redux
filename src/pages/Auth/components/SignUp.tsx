import { Alert, Box, Grid, Typography, Link } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import LockIcon from "@mui/icons-material/Lock";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import validator from "validator";
import zxcvbn from "zxcvbn";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import { ScaleLoader } from "react-spinners";
import { TextField } from "shared";
import {
  createAuthenticatedUserWithEmailAndPassword,
  createUserDocFromAuth,
} from "utils/firebase";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import { useTranslation } from "react-i18next";

const UserSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "The first name must be at least 2 characters")
      .max(32, "The first name must be less than 32 characters")
      .regex(
        new RegExp("^[a-zA-Z]+$"),
        "The first name must not contains any special characters"
      ),
    lastName: z
      .string()
      .min(2, "The last name must be at least 2 characters")
      .max(32, "The last name must be less than 32 characters")
      .regex(
        new RegExp("^[a-zA-Z]+$"),
        "The last name must not contains any special characters"
      ),
    address: z
      .string()
      .min(8, "The address must be at least 8 characters")
      .max(100, "The address must be less than 100 characters"),
    email: z.string().email("You must enter a valid Email"),
    mobile: z.string().refine(validator.isMobilePhone, {
      message: "Please enter a valid phone number",
    }),
    password: z
      .string()
      .min(8, "The password must be at least 8 characters")
      .max(60, "The password must be less than 60 characters"),
    confirmPassword: z.string(),
    accept: z.literal(true, {
      errorMap: () => ({
        message: "You should accept terms and conditions before continuing",
      }),
    }),
  })
  .refine((formData) => formData.password === formData.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type UserSchemaType = z.infer<typeof UserSchema>;

const SignUp = () => {
  const { t }=useTranslation();
  const [passwordScore, setPasswordScore] = useState(0);
  const {
    register,
    getValues,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserSchemaType>({ resolver: zodResolver(UserSchema) });
  const onSubmit: SubmitHandler<UserSchemaType> = async (formData) => {
    try {
      const { email, password, firstName, lastName, address, mobile } =
        formData;
      await createAuthenticatedUserWithEmailAndPassword(email, password)
        .then((response) => {
          const { user } = response;
          const userDatatRef = createUserDocFromAuth(user, {
            name: `${firstName} ${lastName}`,
            mobile,
            address,
          });
          reset();
        })
        .catch((error) => {
          if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
            //"auth/email-already-in-use"
            toast.error("This email is already existed");
          }
        });
    } catch (error: any) {
      toast.error("Error in connection, please try again");
    }
  };

  const { password } = watch();
  useEffect(() => {
    const calculatePasswordStrengthScore = () => {
      return zxcvbn(password ? password : "").score;
    };
    setPasswordScore(calculatePasswordStrengthScore());
  }, [password]);
  return (
    <Box>
      <Typography variant="h4" color="primary">
      {t('auth.signup')}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "5px 10px" }}>
        <TextField
          name="firstName"
          label="First Name"
          // placeholder="First name"
          icon={<PersonIcon />}
          register={register}
          getValues={getValues}
          errors={errors.firstName?.message}
          disabled={isSubmitting}
        ></TextField>
        <TextField
          name="lastName"
          label="Last Name"
          // placeholder="Last name"
          icon={<PersonIcon />}
          register={register}
          getValues={getValues}
          errors={errors.lastName?.message}
          disabled={isSubmitting}
        ></TextField>
        <TextField
          name="address"
          label="Address"
          // placeholder="Address"
          icon={<BusinessIcon />}
          register={register}
          getValues={getValues}
          errors={errors.address?.message}
          disabled={isSubmitting}
        ></TextField>
        <TextField
          name="email"
          label="Email"
          // placeholder="Email"
          icon={<EmailIcon />}
          register={register}
          getValues={getValues}
          errors={errors.email?.message}
          disabled={isSubmitting}
        ></TextField>
        <TextField
          name="mobile"
          label="Mobile number"
          // placeholder="Mobile number"
          icon={<SmartphoneIcon />}
          register={register}
          getValues={getValues}
          errors={errors.mobile?.message}
          disabled={isSubmitting}
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
          autoComplete="off"
        ></TextField>
        {watch().password && watch().password.length > 0 && (
          <Grid container sx={{ margin: "0px 0px 15px 10px" }}>
            {Array.from(Array(5).keys()).map((item, index) => (
              <Grid
                key={index}
                item
                xs={2}
                sx={{
                  backgroundColor:
                    passwordScore <= 2
                      ? "#f00"
                      : passwordScore < 4
                      ? "#ff0"
                      : "#0f0",
                  height: "8px",
                  borderRadius: "5px",
                  margin: "0px 5px",
                  boxSizing: "border-box",
                }}
              ></Grid>
            ))}
          </Grid>
        )}
        <TextField
          name="confirmPassword"
          label="Confirm Password"
          placeholder=""
          icon={<LockIcon />}
          type="password"
          register={register}
          getValues={getValues}
          errors={errors.confirmPassword?.message}
          disabled={isSubmitting}
          autoComplete="off"
        ></TextField>
        <br />
        <Box sx={{ textAlign: "left", marginBottom: "20px" }}>
          <input type="checkbox" id="accept" {...register("accept")} />
          <label htmlFor="id">
            I accept &nbsp;
            <Link href="/terms" sx={{ textDecoration: "none" }}>
              terms and conditions
            </Link>
          </label>
          {errors.accept && (
            <Alert severity="error" sx={{ marginTop: "2px" }}>
              {errors.accept?.message}
            </Alert>
          )}
        </Box>
        <LoadingButton
          loading={isSubmitting}
          loadingIndicator={<ScaleLoader color="#36d7b7" />}
          variant="contained"
          color="primary"
          type="submit"
          sx={{ width: "50%", margin: "0px auto" }}
        >
          {t('auth.signup')}
        </LoadingButton>
      </form>
    </Box>
  );
};

export default SignUp;
