import { Button, ButtonProps, Typography, styled } from "@mui/material";
import React from "react";
import { RiseLoader } from "react-spinners";

type SubmitButtonProps = ButtonProps & {
  isLoading?: boolean;
  loadingIndicator?: React.ReactNode;
  label?: string;
};

export const SubmitButton = ({
  label = "",
  isLoading = false,
  loadingIndicator,
  disabled,
  ...props
}: SubmitButtonProps) => {
  return (
    <StyledButton
      variant="contained"
      {...props}
      aria-disabled={isLoading || disabled}
      disabled={isLoading || disabled}
      type="submit"
      startIcon={
        isLoading &&
        (loadingIndicator ?? <RiseLoader size="8" color="#36d7b7" />)
      }
    >
      <Typography sx={{ fontWeight: "bold" }}>{label || "Submit"}</Typography>
    </StyledButton>
  );
};

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  width: "150px",
  maxWidth: "300px",
  height: "40px",
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "0px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  borderColor: "#0063cc",
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.primary.light,
  },
  "&:active": {
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.primary.light,
  },
}));
