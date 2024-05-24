import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
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
import { toast } from "react-toastify";
import { ScaleLoader } from "react-spinners";
import { AcceptCheckBox, GenderSelect, MUITextField } from "shared";
import {
  createAuthenticatedUserWithEmailAndPassword,
  createUserDocFromAuth,
} from "utils/firebase";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { UserSignUpForm } from "types";
import { schemaForType } from "types/new-types.d";
import { SubmitButton } from "shared/components/SubmitButton";

const UserSchema = schemaForType<UserSignUpForm>()(
  z
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
      gender: z.optional(z.string()),
      password: z
        .string()
        .min(8, "The password must be at least 8 characters")
        .max(60, "The password must be less than 60 characters"),
      confirmPassword: z.string(),
      accept: z.literal<boolean>(true, {
        errorMap: () => ({
          message: "You should accept terms and conditions before continuing",
        }),
      }),
    })
    .refine((formData) => formData.password === formData.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    })
);

type UserSchemaType = z.infer<typeof UserSchema>;

const SignUp = () => {
  const { t } = useTranslation();
  const [passwordScore, setPasswordScore] = useState(0);
  const {
    register,
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
          createUserDocFromAuth(user, {
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
      <Typography fontSize="16px" color="primary.light">
        {t("auth.signup")}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "5px 10px" }}>
        <MUITextField
          name="firstName"
          label="First Name"
          required={
            !(UserSchema._def.schema.shape.firstName instanceof z.ZodOptional)
          }
          // placeholder="First name"
          icon={<PersonIcon />}
          register={register}
          watch={watch}
          errors={errors.firstName?.message}
          disabled={isSubmitting}
        ></MUITextField>
        <MUITextField
          name="lastName"
          label="Last Name"
          required={
            !(UserSchema._def.schema.shape.lastName instanceof z.ZodOptional)
          }
          // placeholder="Last name"
          icon={<PersonIcon />}
          register={register}
          watch={watch}
          errors={errors.lastName?.message}
          disabled={isSubmitting}
        ></MUITextField>
        <MUITextField
          name="address"
          label="Address"
          required={
            !(UserSchema._def.schema.shape.address instanceof z.ZodOptional)
          }
          // placeholder="Address"
          icon={<BusinessIcon />}
          register={register}
          watch={watch}
          errors={errors.address?.message}
          disabled={isSubmitting}
        ></MUITextField>
        <MUITextField
          name="email"
          label="Email"
          required={
            !(UserSchema._def.schema.shape.email instanceof z.ZodOptional)
          }
          // placeholder="Email"
          icon={<EmailIcon />}
          register={register}
          watch={watch}
          errors={errors.email?.message}
          disabled={isSubmitting}
        ></MUITextField>
        <MUITextField
          name="mobile"
          label="Mobile number"
          required={
            !(UserSchema._def.schema.shape.mobile instanceof z.ZodOptional)
          }
          // placeholder="Mobile number"
          icon={<SmartphoneIcon />}
          register={register}
          watch={watch}
          errors={errors.mobile?.message}
          disabled={isSubmitting}
        ></MUITextField>
        <GenderSelect
          name="gender"
          required={
            !(UserSchema._def.schema.shape.password instanceof z.ZodOptional)
          }
          label="Gender"
          register={register}
          watch={watch}
          errors={errors.password?.message}
          // disabled={isSubmitting}
        />
        <MUITextField
          name="password"
          label="Password"
          required={
            !(UserSchema._def.schema.shape.password instanceof z.ZodOptional)
          }
          placeholder=""
          icon={<LockIcon />}
          type="password"
          register={register}
          watch={watch}
          errors={errors.password?.message}
          disabled={isSubmitting}
          autoComplete="current-password"
        ></MUITextField>
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

        <MUITextField
          name="confirmPassword"
          label="Confirm Password"
          required={
            !(
              UserSchema._def.schema.shape.confirmPassword instanceof
              z.ZodOptional
            )
          }
          placeholder=""
          icon={<LockIcon />}
          type="password"
          register={register}
          watch={watch}
          errors={errors.confirmPassword?.message}
          disabled={isSubmitting}
          autoComplete="off"
        ></MUITextField>
        <br />
        <AcceptCheckBox
          label="I accept"
          register={register("accept")}
          errors={errors.accept}
          link={{ to: "/terms", label: "terms and conditions" }}
        />
        <SubmitButton
          isLoading={isSubmitting}
          loadingIndicator={<ScaleLoader color="#36d7b7" height="20" />}
          sx={{ width: "50%", margin: "0px auto" }}
          data-testid="Auth-SignUp-btn-signup"
        >
          {t("auth.signup")}
        </SubmitButton>
      </form>
    </Box>
  );
};

export default SignUp;
