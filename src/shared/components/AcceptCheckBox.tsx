import { Alert, Box, Link, Typography } from "@mui/material";
import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type AcceptCheckBoxType = {
  label: string;
  register: UseFormRegisterReturn<"accept">;
  errors?: FieldError;
  link?: { label: string; to: string } | null;
};
export const AcceptCheckBox = ({
  label,
  register,
  errors = undefined,
  link = null,
}: AcceptCheckBoxType) => {
  return (
    <Box sx={{ textAlign: "left", marginBottom: "20px" }}>
      <input type="checkbox" id="accept" {...register} />
      <label htmlFor="accept" style={{ color: "primary.light" }}>
        <Typography
          component="span"
          sx={{ color: errors ? "#d32f2f" : "primary.light" }}
        >
          {label} &nbsp;
        </Typography>
      </label>
      {link && (
        <Link href={link.to} sx={{ textDecoration: "none" }}>
          <Typography
            component="span"
            sx={{
              color: errors ? "#d32f2f" : "primary.light",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            {link.label}
          </Typography>
        </Link>
      )}

      {errors && (
        <Alert
          severity="error"
          sx={{ marginTop: "2px", backgroundColor: "#FDEDED" }}
        >
          {errors?.message}
        </Alert>
      )}
    </Box>
  );
};
